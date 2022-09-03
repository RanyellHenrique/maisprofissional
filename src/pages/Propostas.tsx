import React, { useState, useEffect, useContext, useCallback } from 'react';
import { PropostasList } from '../components';
import { ActivityIndicator } from 'react-native';
import { colors } from '../styles';
import { UserContext } from '../context';
import { Oferta } from './Ofertas';
import { makePrivateRequest } from '../services';


export interface Proposta {
    id: number;
    estado: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    analise_descricao: string;
    trabalhador: Usuario;
    oferta: Oferta;
}

interface PropostasPage {
    content?: Proposta[];
    totalPages: Number; 
}

interface Usuario {
    nome: string;
}

const Propostas: React.FC = () => {

    const [propostas, setPropostas] = useState<PropostasPage>();
    const [loading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const { state } = useContext(UserContext);

    const getTrabalhadores = useCallback(() => {
        const propostasData = propostas?.content ?? [];
        const params = {
            size: 8,
            page: activePage,
        };
        makePrivateRequest({ url: getPropostasUrl(), params })
            .then(res => {
                setPropostas({
                    totalPages: res.data.totalPages,
                    content: [...propostasData, ...res.data.content]
                });
            })
            .catch(err => console.warn(err))
            .finally(() => setLoading(false));
    }, [activePage]);


    const categoriaChange = () => {
        setPropostas({
            content: [],
            totalPages: propostas?.totalPages ?? 0
        });
    };

    useEffect(() => {
        getTrabalhadores();
    }, [getTrabalhadores]);


    const loadingPage = () => {
        if (propostas?.totalPages !== null && activePage < getTotalPage()) {
            setActivePage(activePage + 1);
        }
    }

    const getTotalPage = (): Number => {
        return propostas?.totalPages || 0;
    }

    const getPropostasUrl = () => {
        if (state.perfil == "TRABALHADOR") {
            return 'propostas/trabalhadores';
        }
        return 'propostas/clientes';
    }

    return (
        <>
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                <PropostasList
                    propostas={propostas?.content || []}
                    loadingPage={loadingPage}
                />
            }
        </>
    )
}

export default Propostas;