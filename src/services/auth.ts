import { api, TOKEN } from './index';
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
    username: string;
    password: string;
}

interface JTWToken {
    authorities: string[];
    user_name: string;
}

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

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
    const payload = await parseJwt();

    return {
        email: payload.user_name,
        isLogado: true,
        perfil: payload.authorities[0],
        id: result.data.userId
    };
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

export const getSessionData = async () => {
    const sessionData =  await AsyncStorage.getItem('authData') ?? '{}';
    const parseSessionData = JSON.parse(sessionData);
    return parseSessionData as LoginResponse;
}

