import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, ActivityIndicator, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OfertaCard, SearchInput } from '../components';
import { colors, theme, text } from '../styles';
import { api } from '../services';
import arrowRigth from '../assets/arrow.png';
import { UserContext } from '../context';


export interface Oferta {
    id?: Number;
    titulo: string;
    imgUrl?: string;
    preco: string;
    sub_titulo: string;
    descricao: string;
    categorias: Categoria[];
    endereco: Endereco;
}

export interface Categoria {
    id: Number;
    nome: string;
    descricao: string;
}

export interface Endereco {
    cep: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
}

const Ofertas: React.FC = () => {

    const [search, setSearch] = useState("");
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { setState, state } = useContext(UserContext);


    async function fillOfertas() {
        setLoading(true);
        const res = await api.get('/ofertas?page=0&linesPerPage=12&direction=ASC&orderBy=id');
        setOfertas(res.data.content);
        setLoading(false);
    }

    useEffect(() => {
        fillOfertas();
    }, []);

    const data = search.length > 0
        ? ofertas.filter(oferta => oferta.titulo.toLowerCase().includes(search.toLowerCase()))
        : ofertas;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput
                placeholder="Titulo da Oferta"
                search={search}
                setSearch={setSearch}
            />
            {state.perfil == "CLIENTE" &&
                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("OfertaForm", { screen: 'Ofertas' })}
                >
                    <Text style={text.primaryText}>
                        CRIAR NOVA OFERTA
                    </Text>
                    <View style={theme.arrowContainer}>
                        <Image source={arrowRigth} />
                    </View>
                </TouchableOpacity>
            }
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                (data.map(oferta => <OfertaCard {...oferta} key={oferta.id} />))}
        </ScrollView>
    )
}

export default Ofertas;