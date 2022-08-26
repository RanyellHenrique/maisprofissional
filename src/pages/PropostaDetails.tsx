import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getPropostaById } from '../services';
import arrow from '../assets/leftArrow.png';
import { colors, text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { UserContext } from '../context';
import { Avatar } from 'react-native-paper';



const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

type Props = {
    route: {
        params: {
            id: number
        }
    }
}

const PropostaDetails: React.FC<Props> = ({ route: { params: { id } } }) => {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { state } = useContext(UserContext);
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
    })


    const loadingOfertaData = async () => {
        setLoading(true);
        const res = await getPropostaById(id);
        setProposta(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadingOfertaData()
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
                                <Text>Descricao: {proposta.descricao}</Text>
                            </View>
                        </ScrollView>
                    )
            }
        </View >
    );
}

export default PropostaDetails;