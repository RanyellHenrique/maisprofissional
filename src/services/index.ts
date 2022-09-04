import axios, { Method } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSessionData } from './auth';

const BASE_URL = 'http://10.0.0.108:8080/';

type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

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

export const createCategoria = async (data: object) => {
    const authToken = await userToken();
    const res = api.post('/categorias', data, {
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

export const getPropostaById = async (id: number) => {
    const authToken = await userToken();
    const res = api.get(`/propostas/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}

export const updateProposta = async (data: object, id: number) => {
    const authToken = await userToken();
    const res = api.put(`/propostas/${id}`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}

export const updateAvaliacaoTrabalhador = async (data: object, id: number) => {
    const authToken = await userToken();
    const res = api.put(`/propostas/${id}/avaliacoes`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    })
    return res;
}

export const createTrabalhador = async (data: object) => {
    return api.post('/trabalhadores', data);
}

export const createCliente = async (data: object) => {
    return api.post('/clientes', data);
}

export const makePrivateRequest = async ({ method = 'GET', url, data, params,  }: RequestParams) => {
    const authToken = await userToken();
    const headers = {
        'Authorization': `Bearer ${authToken}`
    }
    return makeRequest({method, url, data, params}, headers);
}

export const makeRequest = ({ method = 'GET', url, data, params }: RequestParams, headers?: any) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params, 
        headers
     });
}