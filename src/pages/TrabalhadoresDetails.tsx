import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { api } from '../services';
import arrow from '../assets/leftArrow.png';
import { colors, text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

type Props = {
    route: {
        params: {
            id: number
        }
    }
}

const TrabalhadoresDetails: React.FC<Props> = ({ route: { params: { id } } }) => {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [trabalhador, setTrabalhador] = useState({
        id: null,
        nome: null,
        descricao: null,
        telefone: null,
        endereco: {
            cep: null,
            localidade: null,
            uf: null
        },
        sub_titulo: null,
        categorias: [
            {
                id: null,
                nome: null
            }
        ]
    })


    const loadingTrabalhadorData = async () => {
        setLoading(true);
        const res = await api.get(`/trabalhadores/${id}`);
        setTrabalhador(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadingTrabalhadorData()
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
                            <Text style={text.ofertaDetailsName}>{trabalhador.nome}</Text>
                            <Text style={text.ofertaSubTitulo}>{trabalhador.endereco.localidade} - {trabalhador.endereco.uf}</Text>
                            <Text style={text.ofertaSubTitulo}>{trabalhador.telefone}</Text>
                            <ScrollView style={theme.scrolltextContainer}>
                                <HTMLView value={trabalhador.descricao || ""} />
                            </ScrollView>
                        </ScrollView>
                    )
            }
        </View >
    );
}

export default TrabalhadoresDetails;