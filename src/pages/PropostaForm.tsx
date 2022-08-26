import React, { useState, } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { colors, text, theme } from '../styles';
import arrow from '../assets/leftArrow.png';
import { createProposta } from '../services';
import Toast from 'react-native-tiny-toast';
import { useNavigation } from '@react-navigation/native';

type Props = {
    route: {
        params: {
            id: number,
            titulo: string
        }
    }
}

const FormProposta: React.FC<Props> = ({ route: { params: { id, titulo } } }) => {

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    const [proposta, setProposta] = useState({
        id_oferta: id,
        descricao: "",
        data_inicio: "",
        data_fim: ""
    });
    const navigation = useNavigation();

    const handleSave = () => {
        !edit && newProposta();
    }

    const newProposta = async () => {
        setLoading(true);
        const data = { ...proposta }
        try {
            await createProposta(data);
            Toast.showSuccess("Proposta criada com sucesso!");
            setBlankOferta();
        } catch (res) {
            Toast.show("Erro ao salvar");
        }
        setLoading(false);
    }

    const setBlankOferta = () => {
        setProposta({
            id_oferta: id,
            descricao: "",
            data_inicio: "",
            data_fim: ""
        });
    }

    return (
        <KeyboardAwareScrollView style={theme.formContainer}>
            {loading ?
                (<ActivityIndicator size="large" color={colors.primary} />)
                : (
                    <View style={theme.formCard}>
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('PropostasList', { screen: 'Propostas' })} style={theme.goBackContainer}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <Text style={text.ofertaDetailsName}>{titulo}</Text>
                            <TextInput
                                multiline
                                placeholder="Descrição"
                                style={theme.textArea}
                                value={proposta.descricao}
                                onChangeText={(e) => setProposta({ ...proposta, descricao: e })}
                            />
                            <TextInputMask
                                type={"datetime"}
                                options={{
                                    format: "yyyy-mm-dd"
                                }}
                                placeholder="Data Inicio"
                                style={theme.formInput}
                                value={proposta.data_inicio}
                                onChangeText={(e) => setProposta({ ...proposta, data_inicio: e })}
                            />
                            <TextInputMask
                                type={"datetime"}
                                options={{
                                    format: "yyyy-mm-dd"
                                }}
                                placeholder="Data Fim"
                                style={theme.formInput}
                                value={proposta.data_fim}
                                onChangeText={(e) => setProposta({ ...proposta, data_fim: e })}
                            />
                            <View style={theme.buttonContainer}>
                                <TouchableOpacity
                                    style={theme.deleteBtn}
                                    onPress={() => {
                                        Alert.alert(
                                            "Deseja Cancelar?",
                                            "Os dados inseridos não serão salvos",
                                            [
                                                {
                                                    text: "Voltar",
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "Confirmar",
                                                    onPress: () => navigation.navigate('Ofertas', { screen: 'Ofertas' }),
                                                    style: "default"
                                                }
                                            ]
                                        )
                                    }}
                                >
                                    <Text style={text.deleteText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={theme.saveBtn}
                                    onPress={() => handleSave()}
                                >
                                    <Text style={text.saveText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        </KeyboardAwareScrollView>
    )
}


export default FormProposta;