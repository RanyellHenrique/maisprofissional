import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CategoriasFilter, SearchInput, OfertasList } from '../components';
import { colors, theme, text } from '../styles';
import { makePrivateRequest, makeRequest } from '../services';
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

export interface OfertasPage {
    content?: Oferta[];
    totalPages: Number;
}

export interface Categoria {
    id: Number;
    nome?: string;
    descricao?: string;
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
    const [ofertas, setOfertas] = useState<OfertasPage>();
    const [loading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const navigation = useNavigation();
    const { state } = useContext(UserContext);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>();

    const getOfertas = useCallback(() => {
        const ofertasData = ofertas?.content ?? [];
        const params = {
            size: 8,
            categorias: categoria?.id || 0,
            page: activePage,
            titulo: search
        };
        makePrivateRequest({ url: 'ofertas', params })
            .then(res => {
                setOfertas({
                    totalPages: res.data.totalPages,
                    content: [...ofertasData, ...res.data.content]
                });
            })
            .catch(err => console.warn(err))
            .finally(() => setLoading(false));
    }, [activePage, categoria, search]);


    const categoriaChange = () => {
        setOfertas({
            content: [],
            totalPages: ofertas?.totalPages ?? 0
        });
    };

    useEffect(() => {
        getOfertas();
    }, [getOfertas]);

    useEffect(() => {
        makeRequest({ url: 'categorias', params: { linesPerPage: 2 } })
            .then(res => setCategorias([{ id: 0, nome: 'Todas' }, ...res.data]))
            .catch(err => console.warn(err));
    }, []);

    const loadingPage = () => {
        if (ofertas?.totalPages !== null && activePage < getTotalPage()) {
            setActivePage(activePage + 1);
        }
    }

    const getTotalPage = (): Number => {
        return ofertas?.totalPages || 0;
    }

    const setTitulo = (titulo: string) => {
        categoriaChange();
        setSearch(titulo);
    }


    return (
        <>
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
                <OfertasList
                    ofertas={ofertas?.content || []}
                    loadingPage={loadingPage}
                    listHeaderComponent={
                        <>
                            <Searchbar
                                placeholder="Titulo da oferta"
                                onChangeText={setTitulo}
                                value={search}
                                style={theme.inputContainer}
                            />
                            <CategoriasFilter
                                categorias={categorias}
                                setCategorias={setCategoria}
                                categoriaChange={categoriaChange}
                            />
                        </>

                    }
                />
            }
        </>
    )
}

export default Ofertas;