import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tag, text, theme } from '../styles';
import { CategoriaTag } from '../components';

const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

interface TrabalhadorProps {
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

const OfertaCard: React.FC<TrabalhadorProps> = ({ id, nome, imgUrl = imagem, categorias, telefone }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={theme.ofertaCard}
            onPress={() => navigation.navigate('OfertaDetails', { id })}
        >
            <Image source={{ uri: imgUrl }} style={theme.ofertaImg} />
            <View style={theme.ofertaDescription}>
                <Text style={text.ofertaName}>{nome}</Text>
                <Text style={text.ofertaSubTitulo}>{telefone}</Text>
                <View style={tag.container}>
                    {categorias.map(categoria => <CategoriaTag {...categoria} key={categoria.id}></CategoriaTag>)}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OfertaCard;