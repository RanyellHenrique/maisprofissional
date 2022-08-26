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

export const createOferta = async (data: object) => {
    const authToken = await userToken();
    const res = api.post('/ofertas', data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}


export const createProposta = async (data: object) => {
    const authToken = await userToken();
    const res = api.post('/propostas', data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}

export const getPropostaByCliente = async () => {
    const authToken = await userToken();
    const res = api.get('/propostas/clientes', {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}

export const getPropostaByTrabalhador = async () => {
    const authToken = await userToken();
    const res = api.get('/propostas/trabalhadores', {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}