import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: 'http://10.0.0.108:8080/'
});

export const TOKEN = 'Basic dGNjY2xpZW50aWQ6dGNjY2xpZW50c2VjcmV0';

export const getCategorias = () => {
    const res = api.get('/categorias?direction=ASC&orderBy=id');
    return res;
}

export const userToken = async () => {
    const token = await AsyncStorage.getItem("@token");
    return token;
}