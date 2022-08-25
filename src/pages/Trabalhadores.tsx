import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { SearchInput, TrabalhadorCard } from '../components';
import { colors, theme } from '../styles';
import { api } from '../services';

interface Trabalhador {
    id: Number;
    nome: string;
    imgUrl?: string;
    categorias: Categoria[];
    descricao: string;
    telefone: string;
}

interface Categoria {
    id: Number;
    nome: string;
    descricao: string;
}

const Trabalhadores: React.FC = () => {

    const [search, setSearch] = useState("");
    const [Trabalhadores, setTrabalhadores] = useState<Trabalhador[]>([]);
    const [loading, setLoading] = useState(false);

    async function fillOfertas() {
        setLoading(true);
        const res = await api.get('/trabalhadores?page=0&linesPerPage=12&direction=ASC&orderBy=id');
        setTrabalhadores(res.data.content);
        setLoading(false);
        console.log(res.data);
    }

    useEffect(() => {
        fillOfertas();
    }, []);

    const data = search.length > 0
        ? Trabalhadores.filter(trabalhador => trabalhador.nome.toLowerCase().includes(search.toLowerCase()))
        : Trabalhadores;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput
                placeholder="Titulo da Oferta"
                search={search}
                setSearch={setSearch}
            />
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                (data.map(trabalhador => <TrabalhadorCard {...trabalhador} key={trabalhador.id} />))}
        </ScrollView>
    )
}

export default Trabalhadores;