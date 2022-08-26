import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import Toast from 'react-native-tiny-toast';
import { getPropostaById, updateProposta } from '../services';
import arrow from '../assets/leftArrow.png';
import { colors, text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { UserContext } from '../context';
import { Avatar } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';


const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

type Props = {
    route: {
        params: {
            id: number
        }
    }
};

const enumEstados = [{ "nome": "Recusada" }, { "nome": "Aprovada" }]

const PropostaDetails: React.FC<Props> = ({ route: { params: { id } } }) => {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { state } = useContext(UserContext);
    const [estadosSelected, setEstadoSelected] = useState<string[]>([]);
    const [proposta, setProposta] = useState({
        trabalhador: {
            id: null,
            nome: null,
            descricao: null,
            telefone: null,
            endereco: {
                localidade: null,
                uf: null
            }
        },
        oferta: {
            id: null,
            titulo: null,
            descricao: null,
            preco: null,
            imgUrl: null,
            sub_titulo: null,
            categorias: [],
            cliente: {
                id: null,
                nome: null,
                descricao: null,
                telefone: null,
                endereco: {
                    localidade: null,
                    uf: null
                }
            },
        },
        estado: null,
        descricao: null,
        data_inicio: null,
        data_fim: null,
        id: id
    });

    const [avaliacaoProposta, setAvaliacaoProposta] = useState({
        analise_descricao: "",
        estado: ""
    });

    const onSelectedEstadosChange = (estados: string[]) => {
        setEstadoSelected(estados);
        console.log(estadosSelected.map(nome => { return { nome } }).shift()?.nome.toUpperCase());
    };

    const loadingPropostaData = async () => {
        setLoading(true);
        const res = await getPropostaById(id);
        setProposta(res.data);
        setLoading(false);
    }

    const handleSave = () => {
        updateNewProposta();
    }

    const updateNewProposta = async () => {
        setLoading(true);
        const data = {
            ...avaliacaoProposta,
            estado: estadosSelected.map(nome => { return { nome } }).shift()?.nome.toUpperCase(),
            id_oferta: proposta.oferta.id,
            id_trabalhador: proposta.trabalhador.id
        }
        console.log(data);
        try {
            await updateProposta(data, id);
            Toast.showSuccess("Proposta avaliada com sucesso!");
            setBlankOferta();
        } catch (res) {
            Toast.show("Erro ao avaliar");
            console.log(res);
        }
        setLoading(false);
    }

    const setBlankOferta = () => {
        setAvaliacaoProposta({
            analise_descricao: "",
            estado: ""
        });
    }

    useEffect(() => {
        loadingPropostaData()
    }, []);

    return (
        <View style={theme.detailsContainer}>
            {
                loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                    (
                        <ScrollView style={theme.detailsCard}>
                            <TouchableOpacity style={theme.goBackContainer} onPress={() => navigation.goBack()}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <View style={theme.ofertaImageContainer}>
                                <Image source={{ uri: imagem }} style={theme.ofertaImage} />
                            </View>
                            <Text style={text.ofertaDetailsName}>{proposta.oferta.titulo}</Text>
                            <View style={theme.priceContainer}>
                                <Text style={text.currency}>R$</Text>
                                <Text style={text.ofertaPrice}>{proposta.oferta.preco}</Text>
                            </View>
                            <View style={[theme.scrolltextContainer]}>
                                <View style={[theme.propostaDescriptionContainer, { marginBottom: "2%" }]}>
                                    <Avatar.Image size={50} source={{ uri: imagem }} />
                                    <View style={theme.propostaDescription}>
                                        <Text>Nome: {proposta.oferta.cliente.nome}</Text>
                                        <Text>Telefone: {proposta.oferta.cliente.telefone}</Text>
                                        <Text>{proposta.oferta.cliente.endereco.localidade} - {proposta.oferta.cliente.endereco.uf}</Text>
                                    </View>
                                </View>
                            </View>
                            <ScrollView style={theme.scrolltextContainer}>
                                <HTMLView value={proposta.oferta.descricao || ""} />
                            </ScrollView>
                            <Text style={text.ofertaDetailsName}>Proposta</Text>
                            <View style={[theme.scrolltextContainer, { marginBottom: "10%" }]}>
                                <View style={[theme.propostaDescriptionContainer, { marginBottom: "2%" }]}>
                                    <Avatar.Image size={50} source={{ uri: imagem }} />
                                    <View style={theme.propostaDescription}>
                                        <Text>Nome: {proposta.trabalhador.nome}</Text>
                                        <Text>Telefone: {proposta.trabalhador.telefone}</Text>
                                        <Text>{proposta.trabalhador.endereco.localidade} - {proposta.trabalhador.endereco.uf}</Text>
                                    </View>
                                </View>
                                <Text>Data Fim: {proposta.data_fim}</Text>
                                <Text>Data Inicio: {proposta.data_inicio}</Text>
                                <Text>Estado: {proposta.estado}</Text>
                                <Text>Descrição: {proposta.descricao}</Text>
                            </View>
                            <SectionedMultiSelect
                                items={enumEstados}
                                IconRenderer={Icon}
                                uniqueKey="nome"
                                searchPlaceholderText="Buscar estado"
                                confirmText="Confirmar"
                                displayKey="nome"
                                selectText="Avalie a proposta"
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
                                multiline
                                placeholder="Analise Proposta"
                                style={theme.textArea}
                                value={avaliacaoProposta.analise_descricao}
                                onChangeText={(e) => setAvaliacaoProposta({ ...avaliacaoProposta, analise_descricao: e })}
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
                        </ScrollView>
                    )
            }
        </View >
    );
}

export default PropostaDetails;