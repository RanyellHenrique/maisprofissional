import React from 'react';
import { Text, View, TouchableOpacity, Image  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, text } from '../styles';
import arrow from '../assets/arrow.png';
import draw from '../assets/draw.png';



const Home: React.FC = () => {
    
    const navigation = useNavigation();

    return (
        <View style={theme.container}>
            <View style={theme.card}>
                <View style={theme.draw}>
                    <Image source={draw} />
                </View>
                <View style={theme.textContainer}>
                    <Text style={text.bold}>
                        Conheça as melhores ofertas de trabalho
                    </Text>
                    <Text style={text.regular}>
                        Ajudaremos você a encontrar as melhores ofertas de trabalho disponíveis no mercado.
                    </Text>
                </View>
                <TouchableOpacity
                    style={theme.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Ofertas")}
                >
                    <Text style={text.primaryText}>
                        INICIE AGORA A SUA BUSCA
                    </Text>
                    <View style={theme.arrowContainer}>
                        <Image source={arrow} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home;
