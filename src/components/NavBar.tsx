import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Image, TouchableOpacity, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import menu from '../assets/menu.png';
import { nav, text } from '../styles';
import { doLogout, isAuthenticated } from '../services/auth';
import { UserContext } from '../context';


const NavBar: React.FC = () => {

    const [show, setShow] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { setState, state } = useContext(UserContext);


    const navigate = (path: any) => {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    const logged = async () => {
        const result = await isAuthenticated();

        result ? setAuthenticated(true) : setAuthenticated(false);
    }

    const logout = () => {
        doLogout();
        navigation.navigate('Perfil', { screen: 'Login' });
        setState({ email: "", isLogado: false, perfil: "", id: 0 })
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
                    (
                        <TouchableOpacity activeOpacity={0.5} style={nav.drawer} onPress={() => setShow(!show)}>
                            <Image source={menu} />
                            {
                                show ? (
                                    <View style={nav.options}>
                                        <TouchableOpacity
                                            style={nav.option}
                                            onPress={() => navigate("Home")}
                                        >
                                            <Text
                                                style={[
                                                    nav.textOption,
                                                    route.name === "Home" ? nav.textActive : null
                                                ]}
                                            >
                                                Home
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={nav.option}
                                            onPress={() => navigate("Ofertas")}
                                        >
                                            <Text
                                                style={[
                                                    nav.textOption,
                                                    route.name === "Ofertas" ? nav.textActive : null
                                                ]}
                                            >
                                                Ofertas
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={nav.option}
                                            onPress={() => navigate("Login")}
                                        >
                                            <Text
                                                style={[
                                                    nav.textOption,
                                                    route.name === "Login" ? nav.textActive : null
                                                ]}>
                                                Login
                                            </Text>
                                        </TouchableOpacity>

                                    </View>) : null
                            }
                        </TouchableOpacity>
                    )
            }
        </>

    )
}

export default NavBar;