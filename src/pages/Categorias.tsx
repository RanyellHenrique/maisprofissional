import React, { useState, useEffect, useContext, useCallback } from 'react';
import { CategoriasList } from '../components';
import { ActivityIndicator } from 'react-native';
import { colors, theme } from '../styles';
import { UserContext } from '../context';
import { Categoria } from './Ofertas';
import { makeRequest } from '../services';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";


interface CategoriasPage {
    content?: Categoria[];
    totalPages: Number; 
}

const Categorias: React.FC = () => {

    const [categorias, setCategorias] = useState<CategoriasPage>();
    const [loading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const { state } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const navigation = useNavigation();

    const getCategorias = useCallback(() => {
        const CategoriasData = categorias?.content ?? [];
        const params = {
            size: 8,
            page: activePage,
            nome: search
        };
        makeRequest({ url: 'categorias/pages', params })
            .then(res => {
                setCategorias({
                    totalPages: res.data.totalPages,
                    content: [...CategoriasData, ...res.data.content]
                });
            })
            .catch(err => console.warn(err))
            .finally(() => setLoading(false));
    }, [activePage, search]);


    useEffect(() => {
        getCategorias();
    }, [getCategorias]);


    const setSearchAndPage = (search: string) => {
        setCategorias({
            content: [],
            totalPages: categorias?.totalPages ?? 0
        });
        setSearch(search);
    }

    const loadingPage = () => {
        if (categorias?.totalPages !== null && activePage < getTotalPage()) {
            setActivePage(activePage + 1);
        }
    }

    const getTotalPage = (): Number => {
        return categorias?.totalPages || 0;
    }
    return (
        <>
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                <CategoriasList
                    categorias={categorias?.content || []}
                    loadingPage={loadingPage}
                    listHeaderComponent={
                        <Searchbar
                                placeholder="Nome da categoria"
                                onChangeText={setSearchAndPage}
                                value={search}
                                style={theme.inputContainer}
                            />
                    }
                />
            }
            <FloatingAction
                    color={colors.primary}
                    showBackground={false}
                    animated={false}
                    onPressMain={() => navigation.navigate("CategoriaForm", { screen: 'Admin' })}
                />
        </>
    )
}

export default Categorias;