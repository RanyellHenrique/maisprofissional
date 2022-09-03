import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tag, text, theme } from '../styles';
import { CategoriaTag } from '../components';
import { Categoria, Endereco } from '../pages/Ofertas';


const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

interface TrabalhadorProps {
    id: Number;
    nome: string;
    imgUrl?: string;
    categorias: Categoria[];
    descricao: string;
    telefone: string;
    endereco: Endereco;
}


const TrabalhadorCard: React.FC<TrabalhadorProps> = ({ id, nome, imgUrl = imagem, categorias, descricao, endereco }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={theme.ofertaCard}
            onPress={() => navigation.navigate('OfertaDetails', { id })}
        >
            <Image source={{ uri: imgUrl }} style={theme.ofertaImg} />
            <View style={theme.ofertaDescription}>
                <Text style={text.ofertaName}>{nome}</Text>
                <Text style={text.ofertaSubTitulo}>{endereco.localidade} - {endereco.uf}</Text>
                <Text style={text.ofertaDescription} numberOfLines={2}>{descricao}</Text>
                <View style={tag.container}>
                    {categorias.map(categoria => <CategoriaTag {...categoria} key={categoria.id}></CategoriaTag>)}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TrabalhadorCard;