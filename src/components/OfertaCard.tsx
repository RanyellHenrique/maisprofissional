import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tag, text, theme } from '../styles';
import { TextInputMask } from 'react-native-masked-text';
import { CategoriaTag } from '../components';
import { Endereco } from '../pages/Ofertas';

const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

interface OfertaProps {
    id: Number;
    titulo: string;
    imgUrl?: string;
    preco: string;
    sub_titulo: string
    categorias: Categoria[],
    endereco: Endereco;
}

interface Categoria {
    id: Number;
    nome?: string;
    descricao?: string;
}
const OfertaCard: React.FC<OfertaProps> = ({ id, titulo, imgUrl = imagem, preco, sub_titulo, categorias, endereco }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={theme.ofertaCard}
            onPress={() => navigation.navigate('OfertaDetails', { id })}
        >
            <Image source={{ uri: imgUrl }} style={theme.ofertaImg} />
            <View style={theme.ofertaDescription}>
                <Text style={text.ofertaName}>{titulo}</Text>
                <Text style={text.ofertaSubTitulo}>{sub_titulo}</Text>
                <Text style={text.ofertaDescription}>{endereco.localidade} - {endereco.uf}</Text>
                <View style={tag.container}>
                    {categorias.map(categoria => <CategoriaTag {...categoria} key={categoria.id}></CategoriaTag>)}
                </View>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <TextInputMask
                        type={"money"}
                        options={{
                            precision: 2,
                            separator: ",",
                            delimiter: ".",
                            unit: " ",
                            suffixUnit: "",
                        }}
                        value={preco}
                        editable={false}
                        style={text.ofertaPrice}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OfertaCard;