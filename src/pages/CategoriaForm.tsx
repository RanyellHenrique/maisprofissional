import React, { useState, } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, text, theme } from '../styles';
import arrow from '../assets/leftArrow.png';
import { createCategoria } from '../services';
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

const CategoriaForm: React.FC<Props> = () => {

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const navigation = useNavigation();
    const [categoria, setCategoria] = useState({
        nome: "",
        descricao: ""
    });

    const handleSave = () => {
        !edit && newCategoria();
    }

    const newCategoria = async () => {
        setLoading(true);
        const data = { ...categoria }
        try {
            await createCategoria(data);
            Toast.showSuccess("Categoria criada com sucesso!");
            setBlankCategoria();
        } catch (res) {
            Toast.show("Erro ao salvar");
        }
        setLoading(false);
    }

    const setBlankCategoria = () => {
        setCategoria({
            nome: "",
            descricao: ""
        });
    }

    return (
        <KeyboardAwareScrollView style={theme.formContainer}>
            {loading ?
                (<ActivityIndicator size="large" color={colors.primary} />)
                : (
                    <View style={theme.formCard}>
                        <View style={{ width: "100%" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('CategoriasList', { screen: 'Admin' })} style={theme.goBackContainer}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="nome"
                                style={theme.textInput}
                                value={categoria.nome}
                                onChangeText={(e) => setCategoria({ ...categoria, nome: e })}
                            />
                            <TextInput
                                multiline
                                placeholder="Descrição"
                                style={theme.textArea}
                                value={categoria.descricao}
                                onChangeText={(e) => setCategoria({ ...categoria, descricao: e })}
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


export default CategoriaForm;