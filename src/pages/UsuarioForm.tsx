import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, text, theme } from '../styles';
import arrow from '../assets/leftArrow.png';
import { getCategorias, createTrabalhador, createCliente } from '../services';
import Toast from 'react-native-tiny-toast';
import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from '../assets/eyes-closed.png';
import { TextInputMask } from 'react-native-masked-text';
import { Categoria } from './Ofertas';
import { useNavigation } from '@react-navigation/native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { estados, getEstadoByUf } from '../utils/estados';
import { usuarios } from '../utils/tipoDeUsuario';

interface Usuario {
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    data_de_nascimento: string,
    categorias: Categoria[],
    descricao: string,
    endereco: {
        bairro: string
        cep: string
        complemento: string
        localidade: string
        uf: string
    },
    documento: string
}


const FormUsuario: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [usuario, setUsuario] = useState<Usuario>({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        data_de_nascimento: "",
        categorias: [],
        descricao: "",
        endereco: {
            bairro: "",
            cep: "",
            complemento: "",
            localidade: "",
            uf: ""
        },
        documento: ""
    });
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriasSelected, setCategoriasSelected] = useState<Number[]>([]);
    const [estadosSelected, setEstadoSelected] = useState<string[]>([]);
    const [usuarioSelected, setUsuarioSelected] = useState<string[]>(["Trabalhador"]);
    const [hidePassword, setHidePassword] = useState(true);
    const navigation = useNavigation();

    const onSelectedCategoriasChange = (categorias: Number[]) => {
        setCategoriasSelected(categorias);
    };

    const onSelectedEstadosChange = (estados: string[]) => {
        setEstadoSelected(estados);
    };

    const onSelectedUsuarioChange = (usuario: string[]) => {
        setUsuarioSelected(usuario);
    };

    const loadCategorias = async () => {
        setLoading(true);
        const res = await getCategorias();
        setCategorias(res.data);
        setLoading(false);
    }


    const handleSave = () => {
        getTipoUsuario() == "Trabalhador" ?
            newTrabalhador() :
            newCliente();
    }

    const newCliente = async () => {
        setLoading(true);
        const data = {
            ...usuario,
            categorias: categoriasSelected.map(cat => { return { id: cat } }),
            cnpj: usuario.documento,
            endereco: {
                ...usuario.endereco,
                uf: getEstado(),
                localidade: getEstadoByUf(getEstado())?.nome
            }
        };
        try {
            console.log(data);
            await createCliente(data);
            Toast.showSuccess("Usuário criado com sucesso!");
            setBlankUsuario();
        } catch (res) {
            console.log(res);
            Toast.show("Erro ao salvar");
        }
        setLoading(false);
    }

    const newTrabalhador = async () => {
        setLoading(true);
        const data = {
            ...usuario,
            categorias: categoriasSelected.map(cat => { return { id: cat } }),
            cpf: usuario.documento,
            endereco: {
                ...usuario.endereco,
                uf: getEstado(),
                localidade: getEstadoByUf(getEstado())?.nome
            }
        };
        try {
            await createTrabalhador(data);
            Toast.showSuccess("Usuário criado com sucesso!");
            setBlankUsuario();
        } catch (res) {
            Toast.show("Erro ao salvar");
        }
        setLoading(false);
    }

    useEffect(() => {
        loadCategorias();
    }, []);

    const getEstado = (): string => {
        return estadosSelected.map(estado => { return { estado } }).shift()?.estado || "";
    }

    const getTipoUsuario = (): string => {
        return usuarioSelected.map(nome => { return { nome } }).shift()?.nome || "";
    }

    const setBlankUsuario = () => {
        setUsuario({
            nome: "",
            email: "",
            senha: "",
            telefone: "",
            data_de_nascimento: "",
            categorias: [],
            descricao: "",
            endereco: {
                bairro: "",
                cep: "",
                complemento: "",
                localidade: "",
                uf: ""
            },
            documento: ""
        });
        setEstadoSelected([]);
        setCategoriasSelected([]);
        setUsuarioSelected(["Trabalhador"])
    }

    return (
        <KeyboardAwareScrollView style={theme.formContainer}>
            {loading ?
                (<ActivityIndicator size="large" color={colors.primary} />)
                : (
                    <View style={theme.formCard}>
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login', { screen: 'Perfil' })} style={theme.goBackContainer}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <SectionedMultiSelect
                                items={usuarios}
                                IconRenderer={Icon}
                                uniqueKey="nome"
                                searchPlaceholderText="Buscar estado"
                                confirmText="Confirmar"
                                displayKey="nome"
                                selectText="Escolha o tipo de usuario"
                                showDropDowns={true}
                                onSelectedItemsChange={onSelectedUsuarioChange}
                                single
                                selectedItems={usuarioSelected}
                                styles={{
                                    selectedItemText: { color: colors.primary },
                                    selectToggleText: { color: colors.mediumGray },
                                    button: { backgroundColor: colors.primary },
                                    itemText: { color: colors.mediumGray }

                                }}
                            />
                            <TextInput
                                placeholder="Nome"
                                style={theme.formInput}
                                value={usuario.nome}
                                onChangeText={(e) => setUsuario({ ...usuario, nome: e })}
                            />
                            <TextInput
                                placeholder="Email"
                                style={theme.formInput}
                                value={usuario.email}
                                onChangeText={(e) => setUsuario({ ...usuario, email: e })}
                            />
                            <View style={theme.passwordGroupCreateAccount}>
                                <TextInput
                                    placeholder="Senha"
                                    autoCapitalize="none"
                                    style={theme.formInput}
                                    value={usuario.senha}
                                    secureTextEntry={hidePassword}
                                    onChangeText={(e) => setUsuario({ ...usuario, senha: e })}
                                />
                                <TouchableOpacity
                                    onPress={() => setHidePassword(!hidePassword)}
                                    style={theme.toggle}
                                >
                                    <Image
                                        source={hidePassword ? eyesOpened : eyesClosed}
                                        style={theme.eyes}
                                    />
                                </TouchableOpacity>
                            </View>
                            {getTipoUsuario() == "Trabalhador" &&
                                <SectionedMultiSelect
                                    items={categorias}
                                    IconRenderer={Icon}
                                    uniqueKey="id"
                                    searchPlaceholderText="Buscar categoria"
                                    confirmText="Confirmar"
                                    displayKey="nome"
                                    selectText="Escolha as categorias"
                                    showDropDowns={true}
                                    onSelectedItemsChange={onSelectedCategoriasChange}
                                    selectedItems={categoriasSelected}
                                    styles={{
                                        selectedItemText: { color: colors.primary },
                                        selectToggleText: { color: colors.mediumGray },
                                        button: { backgroundColor: colors.primary },
                                        itemText: { color: colors.mediumGray }

                                    }}
                                />
                            }
                            <TextInputMask
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                placeholder="Telefone"
                                style={theme.formInput}
                                value={usuario.telefone}
                                onChangeText={(e) => setUsuario({ ...usuario, telefone: e })}
                            />
                            <TextInputMask
                                type={getTipoUsuario() == "Trabalhador" ? "cpf" : "cnpj"}
                                placeholder={getTipoUsuario() == "Trabalhador" ? "cpf" : "cnpj"}
                                style={theme.formInput}
                                value={usuario.documento}
                                onChangeText={(e) => setUsuario({ ...usuario, documento: e })}
                            />
                            <TextInput
                                multiline
                                placeholder="Descrição"
                                style={theme.textArea}
                                value={usuario.descricao}
                                onChangeText={(e) => setUsuario({ ...usuario, descricao: e })}
                            />
                            <TextInput
                                placeholder="cep"
                                style={theme.formInput}
                                value={usuario.endereco.cep}
                                onChangeText={(e) => setUsuario({ ...usuario, endereco: { ...usuario.endereco, cep: e } })}
                            />
                            <SectionedMultiSelect
                                items={estados}
                                IconRenderer={Icon}
                                uniqueKey="sigla"
                                searchPlaceholderText="Buscar estado"
                                confirmText="Confirmar"
                                displayKey="nome"
                                selectText="Escolha seu estado"
                                showDropDowns={true}
                                onSelectedItemsChange={onSelectedEstadosChange}
                                single
                                selectedItems={estadosSelected}
                                styles={{
                                    selectedItemText: { color: colors.primary },
                                    selectToggleText: { color: colors.mediumGray },
                                    button: { backgroundColor: colors.primary },
                                    itemText: { color: colors.mediumGray }

                                }}
                            />
                            <TextInput
                                placeholder="bairro"
                                style={theme.formInput}
                                value={usuario.endereco.bairro}
                                onChangeText={(e) => setUsuario({ ...usuario, endereco: { ...usuario.endereco, bairro: e } })}
                            />
                            <TextInput
                                placeholder="complemento"
                                style={theme.formInput}
                                value={usuario.endereco.complemento}
                                onChangeText={(e) => setUsuario({ ...usuario, endereco: { ...usuario.endereco, complemento: e } })}
                            />
                            <View style={theme.buttonContainer}>
                                <TouchableOpacity
                                    style={theme.deleteBtn}
                                    onPress={() => {
                                        Alert.alert(
                                            "Deseja Cancelar?",
                                            "Os dados inseridos não serão salvos",
                                            [
                                                {
                                                    text: "Voltar",
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Confirmar",
                                                    onPress: () => navigation.navigate('Login', { screen: 'Perfil' }),
                                                    style: "default"
                                                }
                                            ]
                                        )
                                    }}
                                >
                                    <Text style={text.deleteText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={theme.saveBtn}
                                    onPress={() => handleSave()}
                                >
                                    <Text style={text.saveText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        </KeyboardAwareScrollView>
    )
}

export default FormUsuario;