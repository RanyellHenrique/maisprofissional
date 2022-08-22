import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { OfertaCard, SearchInput } from '../components';
import { colors, theme } from '../styles';
import { api } from '../services';

interface Oferta {
    id: Number;
    titulo: string;
    imgUrl?: string;
    preco: string;
    sub_titulo: string
    categorias: Categoria[] 
}

interface Categoria {
    id: Number;
    nome: string;
    descricao: string;
}

const Ofertas: React.FC = () => {

    const [search, setSearch] = useState("");
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [loading, setLoading] = useState(false);

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
            { loading ? ( <ActivityIndicator size="large" color={colors.primary}/>) :
                (data.map(oferta => <OfertaCard {...oferta} key={oferta.id} /> ))}
        </ScrollView>
    )
}

export default Ofertas;