import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { api } from '../services';
import arrow from '../assets/leftArrow.png';
import { colors, text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { UserContext } from '../context';


const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

type Props = {
    route: {
        params: {
            id: number
        }
    }
}

const OfertaDetails: React.FC<Props> = ({ route: { params: { id } } }) => {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { state } = useContext(UserContext);
    const [oferta, setOferta] = useState({
        id: null,
        titulo: null,
        descricao: null,
        preco: null,
        imgUrl: null,
        sub_titulo: null,
        categorias: null
    })


    const loadingOfertaData = async () => {
        setLoading(true);
        const res = await api.get(`/ofertas/${id}`);
        setOferta(res.data);
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
                            <Text style={text.ofertaDetailsName}>{oferta.titulo}</Text>
                            <View style={theme.priceContainer}>
                                <Text style={text.currency}>R$</Text>
                                <Text style={text.ofertaPrice}>{oferta.preco}</Text>
                            </View>
                            <ScrollView style={theme.scrolltextContainer}>
                                <HTMLView value={oferta.descricao || ""} />
                            </ScrollView>
                            {state.perfil == "TRABALHADOR" &&
                                <View style={theme.buttonContainerOferta}>
                                    <TouchableOpacity
                                        style={theme.saveBtn}
                                        onPress={() => navigation.navigate("Propostas", { screen: 'PropostaForm', params: {route: {id: id, titulo: oferta.titulo} }})}
                                    >
                                        <Text style={text.saveText}>REALIZAR PROPOSTA</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </ScrollView>
    )
}
        </View >
    );
}

export default OfertaDetails;