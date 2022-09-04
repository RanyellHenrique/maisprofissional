import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { makePrivateRequest } from '../services';
import arrow from '../assets/leftArrow.png';
import { colors, text, theme } from '../styles';
import { useNavigation } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { UserContext } from '../context';

const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';



const PerfilDetails: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { state } = useContext(UserContext);
    const [perfil, setPerfil] = useState({
        id: null,
        nome: null,
        descricao: null,
        telefone: null,
        cpf: null,
        cnpj: null,
        endereco: {
            cep: null,
            localidade: null,
            uf: null, 
            bairro: null,
            complemento: null
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
        const res = await loadingUsuario();
        setPerfil(res.data);
        setLoading(false);
    }

    const loadingUsuario = async () => {
        if (state.perfil == "CLIENTE") {
            return await makePrivateRequest({ url: `clientes/${state.id}` });
        } else if (state.perfil == "TRABALHADOR") {
            return await makePrivateRequest({ url: `trabalhadores/${state.id}` });
        }
        return await makePrivateRequest({ url: `usuarios/${state.id}` });
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
                            <TouchableOpacity style={theme.goBackContainer} onPress={() => navigation.navigate('OfertasList', { screen: 'Ofertas' })}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <View style={theme.ofertaImageContainer}>
                                <Image source={{ uri: imagem }} style={theme.ofertaImage} />
                            </View>
                            <Text style={text.ofertaDetailsName}>{perfil.nome}</Text>
                            <Text style={text.ofertaSubTitulo}>{perfil.endereco.localidade} - {perfil.endereco.uf}</Text>
                            <Text style={text.ofertaSubTitulo}>{perfil.endereco.bairro}, {perfil.endereco.complemento}</Text>
                            <Text style={text.ofertaSubTitulo}>Fone: {perfil.telefone}</Text>
                            <Text style={text.ofertaSubTitulo}>Documento: {perfil.cpf || perfil.cnpj}</Text>
                            <ScrollView style={theme.scrolltextContainer}>
                                <HTMLView value={perfil.descricao || ""} />
                            </ScrollView>
                            {
                                perfil.categorias &&
                                <>
                                <Text style={text.ofertaDetailsName}>Categorias</Text>
                                    {perfil.categorias.map(cat =>
                                        <Text style={text.ofertaSubTitulo} key={cat.id}>{cat.nome}</Text>
                                    )}
                                </>
                            }
                        </ScrollView>
                    )
            }
        </View >
    );
}

export default PerfilDetails;