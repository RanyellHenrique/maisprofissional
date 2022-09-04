import React, { useEffect, useState, useContext } from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { nav, text } from '../styles';
import { doLogout, isAuthenticated } from '../services/auth';
import { UserContext } from '../context';


const NavBar: React.FC = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const navigation = useNavigation();
    const { setState, state } = useContext(UserContext);


    const logged = async () => {
        const result = await isAuthenticated();

        result ? setAuthenticated(true) : setAuthenticated(false);
    }

    const logout = () => {
        doLogout();
        navigation.navigate('Perfil', { screen: 'Login' });
        setState({ email: "", isLogado: false, perfil: "", id: 0 })
    }

    const login = () => {
        navigation.navigate('Perfil', { screen: 'Login' });
    }

    useEffect(() => {
        logged();
    }, [state]);

    return (
        <>
            {
                authenticated ? (
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={nav.logoutBtn}
                    >
                        <Text style={text.logoutText}>Sair</Text>
                    </TouchableOpacity>
                ) :
                    <TouchableOpacity
                        onPress={() => login()}
                        style={nav.logoutBtn}
                    >
                        <Text style={text.logoutText}>Entrar</Text>
                    </TouchableOpacity>
            }
        </>

    )
}

export default NavBar;