import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { TrabalhadoresList, CategoriasFilter } from '../components';
import { Searchbar } from 'react-native-paper';
import { makePrivateRequest, makeRequest } from '../services';
import { Categoria, Endereco } from '../pages/Ofertas';
import { colors, theme } from '../styles';

export interface Trabalhador {
    id: Number;
    nome: string;
    imgUrl?: string;
    categorias: Categoria[];
    descricao: string;
    telefone: string;
    endereco: Endereco;
}

interface TrabalhadoresPage {
    content?: Trabalhador[];
    totalPages: Number;
}


const Trabalhadores: React.FC = () => {

    const [search, setSearch] = useState("");
    const [trabalhadores, setTrabalhadores] = useState<TrabalhadoresPage>();
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>();
    const [activePage, setActivePage] = useState(0);


    const getTrabalhadores = useCallback(() => {
        const trabalhadoresData = trabalhadores?.content ?? [];
        const params = {
            size: 8,
            categorias: categoria?.id || 0,
            page: activePage,
            nome: search
        };
        makePrivateRequest({ url: 'trabalhadores', params })
            .then(res => {
                setTrabalhadores({
                    totalPages: res.data.totalPages,
                    content: [...trabalhadoresData, ...res.data.content]
                });
            })
            .catch(err => console.warn(err))
            .finally(() => setLoading(false));
    }, [activePage, categoria, search]);


    const categoriaChange = () => {
        setTrabalhadores({
            content: [],
            totalPages: trabalhadores?.totalPages ?? 0
        });
    };

    useEffect(() => {
        getTrabalhadores();
    }, [getTrabalhadores]);

    useEffect(() => {
        makeRequest({ url: 'categorias', params: { linesPerPage: 2 } })
            .then(res => setCategorias([{ id: 0, nome: 'Todas' }, ...res.data]))
            .catch(err => console.warn(err));
    }, []);

    const loadingPage = () => {
        if (trabalhadores?.totalPages !== null && activePage < getTotalPage()) {
            setActivePage(activePage + 1);
        }
    }

    const getTotalPage = (): Number => {
        return trabalhadores?.totalPages || 0;
    }

    const setNome = (titulo: string) => {
        categoriaChange();
        setSearch(titulo);
    }

    return (
        <>
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                <TrabalhadoresList
                    trabalhadores={trabalhadores?.content || []}
                    loadingPage={loadingPage}
                    listHeaderComponent={
                        <>
                            <Searchbar
                                placeholder="Nome do Trabalhador"
                                onChangeText={setNome}
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

export default Trabalhadores;