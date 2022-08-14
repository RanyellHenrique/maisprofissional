import React from 'react';
import { Text, View } from 'react-native';
import { tag } from '../styles';
import { getColor } from '../utils/ColorRandom';

interface CategoriaProps {
    id: Number;
    nome: string;
}


const CategoriaTag: React.FC<CategoriaProps> = ({ nome }) => {
    return (
        <View style={[tag.containerItem, { backgroundColor:getColor() }]}>
            <Text style={tag.containerText}>
                {nome}
            </Text>
        </View>
    )
}

export default CategoriaTag;