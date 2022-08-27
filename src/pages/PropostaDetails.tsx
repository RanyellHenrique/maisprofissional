import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import Toast from 'react-native-tiny-toast';
import { getPropostaById, updateProposta, updateAvaliacaoTrabalhador } from '../services';
import arrow from '../assets/leftArrow.png';
import { colors, text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { UserContext } from '../context';
import { Avatar } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';



const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

type Props = {
    route: {
        params: {
            id: number
        }
    }
};

const enumEstados = [{ "nome": "Recusada" }, { "nome": "Aprovada" }]
const enumEstadosfinalizadas = [{ "nome": "Cancelada" }, { "nome": "Concluida" }]

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
        id: id,
        analise_descricao: null,
        avaliacao: {
            id: null,
            descricao: null,
            nota: null
        }
    });
    const [avaliacaoProposta, setAvaliacaoProposta] = useState({
        analise_descricao: "",
        estado: ""
    });
    const [avaliacaoTrabalhador, setAvaliacaoTrabalhador] = useState({
        descricao: "",
        nota: 0
    });

    const onSelectedEstadosChange = (estados: string[]) => {
        setEstadoSelected(estados);
    };

    const loadingPropostaData = async () => {
        setLoading(true);
        const res = await getPropostaById(id);
        setProposta(res.data);
        setLoading(false);
    }

    const handleSave = () => {
        updateNewProposta();
        loadingPropostaData();
    }

    const handleSaveAvaliacao = () => {
        createAvaliacao();
        loadingPropostaData();
    }

    const onChangeAvaliacao = (nota: number) => {
        setAvaliacaoTrabalhador({ ...avaliacaoTrabalhador, nota });
    };

    const createAvaliacao = async () => {
        setLoading(true);
        const data = {
            descricao: avaliacaoTrabalhador.descricao,
            nota: avaliacaoTrabalhador.nota,
            id_oferta: proposta.oferta.id,
        }
        try {
            await updateAvaliacaoTrabalhador(data, id);
            Toast.showSuccess("Avaliação realizada com sucesso!");
            setBlankOferta();
        } catch (res) {
            Toast.show("Erro ao avaliar");
        }
        setLoading(false);
    }

    const updateNewProposta = async () => {
        setLoading(true);
        const data = {
            analise_descricao: getDescricaoAvaliacao(),
            estado: getEstado(),
            id_oferta: proposta.oferta.id,
            id_trabalhador: proposta.trabalhador.id
        }
        try {
            await updateProposta(data, id);
            Toast.showSuccess("Proposta avaliada com sucesso!");
            setBlankOferta();
        } catch (res) {
            Toast.show("Erro ao avaliar");
        }
        setLoading(false);
    }

    const getEstado = () => {
        return estadosSelected.map(nome => { return { nome } }).shift()?.nome.toUpperCase();
    }

    const getDescricaoAvaliacao = () => {
        return proposta.estado == "ABERTA" ?
            avaliacaoProposta.analise_descricao :
            proposta.analise_descricao;
    }

    const setBlankOferta = () => {
        setAvaliacaoProposta({
            analise_descricao: "",
            estado: ""
        });
    }

    const isClienteAndNotContainsEstados = () => {
        return state.perfil == "CLIENTE" && proposta.estado != "CONCLUIDA" && proposta.estado != "CANCELADA";
    }

    const presentFormAvaliacaoProposta = () => {
        return state.perfil == "CLIENTE" && proposta.estado == "CONCLUIDA" && proposta.avaliacao === null;
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
                                        <Text>Empresa: {proposta.oferta.cliente.nome}</Text>
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
                                <Text style={text.ofertaDescription}>Data Fim: {proposta.data_fim}</Text>
                                <Text style={text.ofertaDescription}>Data Inicio: {proposta.data_inicio}</Text>
                                <Text style={text.ofertaDescription}>Estado: {proposta.estado}</Text>
                                <Text style={text.ofertaDescription}>Descrição: {proposta.descricao}</Text>
                                {proposta.analise_descricao &&
                                    <Text style={text.ofertaDescription}>Descrição da analise: {proposta.analise_descricao}</Text>
                                }
                                {
                                    proposta.avaliacao &&
                                    <>
                                        <Text style={text.ofertaDetailsName}>Avalição</Text>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={proposta.avaliacao.nota || 0}
                                        />
                                        <Text style={text.ofertaDescription}>Descrição: {proposta.avaliacao.descricao}</Text>

                                    </>
                                }
                            </View>
                            {isClienteAndNotContainsEstados() &&
                                <>
                                    <SectionedMultiSelect
                                        items={proposta.estado == "ABERTA" ? enumEstados : enumEstadosfinalizadas}
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
                                    {proposta.estado == "ABERTA" &&
                                        <TextInput
                                            multiline
                                            placeholder="Analise Proposta"
                                            style={theme.textArea}
                                            value={avaliacaoProposta.analise_descricao}
                                            onChangeText={(e) => setAvaliacaoProposta({ ...avaliacaoProposta, analise_descricao: e })}
                                        />
                                    }
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
                                                            onPress: () => navigation.navigate('PropostasList', { screen: 'Propostas' }),
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
                                </>
                            }
                            {presentFormAvaliacaoProposta() &&
                                <>
                                    <Text style={[text.ofertaDetailsName, { marginBottom: "5%" }]}>Avalie o Trabalhador</Text>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={avaliacaoTrabalhador.nota}
                                        selectedStar={(rating) => onChangeAvaliacao(rating)}
                                    />
                                    <TextInput
                                        multiline
                                        placeholder="Avaliação do Trabalhador"
                                        style={[theme.textArea]}
                                        value={avaliacaoTrabalhador.descricao}
                                        onChangeText={(e) => setAvaliacaoTrabalhador({ ...avaliacaoTrabalhador, descricao: e })}
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
                                                            onPress: () => navigation.navigate('PropostasList', { screen: 'Propostas' }),
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
                                            onPress={() => handleSaveAvaliacao()}
                                        >
                                            <Text style={text.saveText}>Salvar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        </ScrollView>
                    )
            }
        </View >
    );
}

export default PropostaDetails;