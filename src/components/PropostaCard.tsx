import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { text, theme } from '../styles';
import { TextInputMask } from 'react-native-masked-text';
import { Avatar } from 'react-native-paper';


const imagem = 'https://www.monitoratec.com.br/blog/wp-content/uploads/2020/08/AdobeStock_310133736-740x416.jpeg';

interface PropostaProps {
    id: number;
    estado: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    analise_descricao: string;
    trabalhador: UsuarioProps;
    oferta: OfertaProps;

}

interface UsuarioProps {
    nome: string;
}

interface OfertaProps {
    titulo: string;
    imgUrl?: string;
    preco: string;
}


const OfertaCard: React.FC<PropostaProps> = ({ id, estado, data_fim, data_inicio, trabalhador, oferta }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={theme.ofertaCard}
            onPress={() => navigation.navigate('OfertaDetails', { id })}
        >
            <View style={theme.ofertaDescription}>
                <View style={theme.propostaDescriptionContainer}>
                        <Avatar.Image size={50} source={{uri: imagem}} />
                    <View style={theme.propostaDescription}>
                        <Text style={text.ofertaName}>{oferta.titulo}</Text>
                        <Text style={text.ofertaSubTitulo}>Estado: {estado}</Text>
                        <Text style={text.ofertaSubTitulo}>Trabalhador: {trabalhador.nome}</Text>
                    </View>
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
                        value={oferta.preco}
                        editable={false}
                        style={text.ofertaPrice}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OfertaCard;