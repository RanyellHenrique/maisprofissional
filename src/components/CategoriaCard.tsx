import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { text, theme } from '../styles';
import { Categoria } from '../pages/Ofertas';


const CategoriaCard: React.FC<Categoria> = ({ id, nome, descricao }) => {
    return (
        <TouchableOpacity
            style={theme.ofertaCard}
        >
            <View style={theme.ofertaDescription}>
                <View style={theme.propostaDescriptionContainer}>
                    <View style={theme.propostaDescription}>
                        <Text style={text.ofertaDescription}>{id}</Text>
                        <Text style={text.ofertaName}>{nome}</Text>
                        <Text numberOfLines={2} style={text.ofertaSubTitulo}>{descricao}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CategoriaCard;