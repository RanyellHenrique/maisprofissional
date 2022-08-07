import React from 'react';
import { Text, View } from 'react-native';
import { nav } from '../styles';

const HeaderText: React.FC = () => {
    return (
        <View style={nav.containerNav}>
            <Text style={nav.leftTextPlus}>
                +
            </Text>
            <Text style={nav.leftText}>
                Profissional
            </Text>
        </View>
    )
}

export default HeaderText;
