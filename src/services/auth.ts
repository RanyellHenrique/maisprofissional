import { api, TOKEN } from './index';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
    username: string;
    password: string;
}

interface JTWToken {
    authorities: string[];
}

const trabalhador = "TRABALHADOR";
const cliente = "CLIENTE";
const admin = "ADMIN";

export const login = async (userInfo: AuthProps) => {
    const data = queryString.stringify({ ...userInfo, grant_type: "password" });
    const result = await api.post('/oauth/token', data, {
        headers: {
            Authorization: TOKEN,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    const { access_token } = result.data;
    await setAsysncKeys("@token", access_token);
    return result;
}

const setAsysncKeys = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.warn(e);
    }
}

export const isAuthenticated = async () => {
    try {
        const token = await AsyncStorage.getItem("@token");
        return token ? true : false;
    } catch (e) {
        console.warn(e);
    }
}

export const doLogout = async () => {
    try {
        await AsyncStorage.removeItem("@token");
    } catch (e) {
        console.warn(e);
    }
}

export const parseJwt = async () => {
    return jwtDecode<JTWToken>(await AsyncStorage.getItem("@token") || "");
}

export const isTrabalhador = async () => {
    return (await parseJwt())
        .authorities
        .includes(trabalhador);
}

export const isCliente = async () => {
    return (await parseJwt())
        .authorities
        .includes(cliente);
}

export const isAdmin = async () => {
    return (await parseJwt())
        .authorities
        .includes(admin);
}


