import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, text, theme } from '../styles';
import arrow from '../assets/leftArrow.png';
import { createOferta, getCategorias } from '../services';
import Toast from 'react-native-tiny-toast';
import { TextInputMask } from 'react-native-masked-text';
import { Categoria, Oferta } from './Ofertas';
import { useNavigation } from '@react-navigation/native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { estados, getEstadoByUf } from '../utils/estados';


const FormOferta: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [oferta, setOferta] = useState<Oferta>({
        titulo: "",
        sub_titulo: "",
        imgUrl: "",
        descricao: "",
        preco: "",
        categorias: [],
        endereco: { 
            bairro: "", 
            cep: "", 
            complemento: "", 
            localidade: "", 
            uf: "" 
        }
    });
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriasSelected, setCategoriasSelected] = useState<Number[]>([]);
    const [estadosSelected, setEstadoSelected] = useState<string[]>([]);
    const navigation = useNavigation();

    const onSelectedCategoriasChange = (categorias: Number[]) => {
        setCategoriasSelected(categorias);
    };

    const onSelectedEstadosChange = (estados: string[]) => {
        setEstadoSelected(estados);
    };

    const loadCategorias = async () => {
        setLoading(true);
        const res = await getCategorias();
        setCategorias(res.data);
        setLoading(false);
    }

    const handleSave = () => {
        !edit && newOferta();
    }

    const newOferta = async () => {
        setLoading(true);
        const data = {
            ...oferta,
            preco: getRaw(),
            categorias: categoriasSelected.map(cat => { return { id: cat } }),
            endereco: {
                ...oferta.endereco,
                uf: getEstado(),
                localidade: getEstadoByUf(getEstado())?.nome
            }
        };
        try {
            await createOferta(data);
            Toast.showSuccess("Oferta criada com sucesso!");
            setBlankOferta();
        } catch (res) {
            Toast.show("Erro ao salvar");
        }
        setLoading(false);
    }

    const getRaw = () => {
        const srt = oferta.preco;
        const res = srt.slice(2).replace(/\./g, "").replace(/,/g, ".");
        return res;
    }

    useEffect(() => {
        loadCategorias();
    }, []);

    const getEstado = () : string => {
        return estadosSelected.map(estado => { return { estado } }).shift()?.estado || "";
    }

    const setBlankOferta = () => {
        setOferta({
            titulo: "",
            sub_titulo: "",
            imgUrl: "",
            descricao: "",
            preco: "",
            categorias: [],
            endereco: { 
                bairro: "", 
                cep: "", 
                complemento: "", 
                localidade: "", 
                uf: "" 
            }
        });
        setEstadoSelected([]);
        setCategoriasSelected([]);
    }

    return (
        <KeyboardAwareScrollView style={theme.formContainer}>
            {loading ?
                (<ActivityIndicator size="large" color={colors.primary} />)
                : (
                    <View style={theme.formCard}>
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Ofertas', { screen: 'Ofertas' })} style={theme.goBackContainer}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="titulo da  oferta"
                                style={theme.formInput}
                                value={oferta.titulo}
                                onChangeText={(e) => setOferta({ ...oferta, titulo: e })}
                            />
                            <TextInput
                                placeholder="sub titulo da  oferta"
                                style={theme.formInput}
                                value={oferta.sub_titulo}
                                onChangeText={(e) => setOferta({ ...oferta, sub_titulo: e })}
                            />
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
                            <TextInputMask
                                type={"money"}
                                placeholder="Preço"
                                style={theme.formInput}
                                value={oferta.preco}
                                onChangeText={(e) => setOferta({ ...oferta, preco: e })}
                            />
                            <TextInput
                                multiline
                                placeholder="Descrição"
                                style={theme.textArea}
                                value={oferta.descricao}
                                onChangeText={(e) => setOferta({ ...oferta, descricao: e })}
                            />
                            <TextInput
                                placeholder="cep"
                                style={theme.formInput}
                                value={oferta.endereco.cep}
                                onChangeText={(e) => setOferta({ ...oferta, endereco: { ...oferta.endereco, cep: e } })}
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
                                value={oferta.endereco.bairro}
                                onChangeText={(e) => setOferta({ ...oferta, endereco: { ...oferta.endereco, bairro: e } })}
                            />
                            <TextInput
                                placeholder="complemento"
                                style={theme.formInput}
                                value={oferta.endereco.complemento}
                                onChangeText={(e) => setOferta({ ...oferta, endereco: { ...oferta.endereco, complemento: e } })}
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
                                                    onPress: () => navigation.navigate('Ofertas', { screen: 'Ofertas' }),
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

export default FormOferta;