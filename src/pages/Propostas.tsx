import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PropostaCard, SearchInput } from '../components';
import { colors, theme } from '../styles';
import { getPropostaByCliente, getPropostaByTrabalhador } from '../services';
import { UserContext } from '../context';
import { Oferta } from './Ofertas';


interface Proposta {
    id: number;
    estado: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    analise_descricao: string;
    trabalhador: Usuario;
    oferta: Oferta;
}

interface Usuario {
    nome: string;
}

const Propostas: React.FC = () => {

    const [search, setSearch] = useState("");
    const [propostas, setPropostas] = useState<Proposta[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { state } = useContext(UserContext);


    async function fillOfertas() {
        setLoading(true);
        const res = await getPropostas();
        setPropostas(res.data.content);
        setLoading(false);
    }

    const getPropostas = async () => {
        if (state.perfil == "TRABALHADOR") {
            return await getPropostaByTrabalhador();
        }
        return await getPropostaByCliente();
    }

    useEffect(() => {
        fillOfertas();
    }, []);

    const data = search.length > 0
        ? propostas.filter(proposta => proposta.oferta.titulo.toLowerCase().includes(search.toLowerCase()))
        : propostas;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput
                placeholder="Titulo da Oferta"
                search={search}
                setSearch={setSearch}
            />
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                (data.map(proposta => <PropostaCard {...proposta} key={proposta.id} />))}
        </ScrollView>
    )
}

export default Propostas;