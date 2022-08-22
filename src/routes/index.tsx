import React, { useState, useEffect } from 'react';
import { HeaderText, NavBar } from '../components';
import { Home, Ofertas, Login, OfertaDetails } from '../pages';
import { colors } from '../styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isAuthenticated } from '../services/auth';

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {

    const [isAuth, setAuth] = useState(false);

    const authenticated = async () => {
        const auth = await isAuthenticated() || false;
        setAuth(auth)
    }

    useEffect(() => {
        authenticated();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitle: "",
                headerStyle: {
                    backgroundColor: colors.primary
                },
                headerLeft: () => <HeaderText />,
                headerRight: () => <NavBar />,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    if (route.name === 'Ofertas') {
                        iconName = focused
                            ? 'md-briefcase' : 'md-briefcase'
                    } else if (route.name === 'Propostas') {
                        iconName = focused ? 'md-people' : 'md-people';
                    } else if (route.name === 'Trabalhadores') {
                        iconName = focused ? 'md-construct' : 'md-construct';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'ios-person' : 'ios-person';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Ofertas" component={OfertasScreen} />
            <Tab.Screen name="Trabalhadores" component={TrabalhadoresScreen} />
            <Tab.Screen name="Propostas" component={PropostasScreen} />
            <Tab.Screen name="Perfil" component={UsuariosScreen} />
        </Tab.Navigator>
    )
}

const OfertasStack = createNativeStackNavigator();

const OfertasScreen: React.FC = () => {
    return (
        <OfertasStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <OfertasStack.Screen name="Ofertas" component={Ofertas} />
            <OfertasStack.Screen name="OfertaDetails" component={OfertaDetails} />
            <OfertasStack.Screen name="Home" component={Home} />
            <OfertasStack.Screen name="Login" component={Login} />
        </OfertasStack.Navigator>
    );
}

const PropostasStack = createNativeStackNavigator();

const PropostasScreen: React.FC = () => {
    return (
        <PropostasStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <PropostasStack.Screen name="Ofertas" component={Ofertas} />
            <PropostasStack.Screen name="OfertaDetails" component={OfertaDetails} />
            <PropostasStack.Screen name="Home" component={Home} />
            <PropostasStack.Screen name="Login" component={Login} />
        </PropostasStack.Navigator>
    );
}

const TrabalhadoresStack = createNativeStackNavigator();

const TrabalhadoresScreen: React.FC = () => {
    return (
        <TrabalhadoresStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <TrabalhadoresStack.Screen name="Ofertas" component={Ofertas} />
            <TrabalhadoresStack.Screen name="OfertaDetails" component={OfertaDetails} />
            <TrabalhadoresStack.Screen name="Home" component={Home} />
            <TrabalhadoresStack.Screen name="Login" component={Login} />
        </TrabalhadoresStack.Navigator>
    );
}

const UsuarioStack = createNativeStackNavigator();

type Auth = {
    authenticated: boolean
}

const UsuariosScreen: React.FC<Auth> = ({ authenticated }) => {
    return (
        <UsuarioStack.Navigator screenOptions={{
            headerShown: false
        }}>
            {authenticated ?
                <UsuarioStack.Screen name="Home" component={Home} />:
                <UsuarioStack.Screen name="Login" component={Login} />
            }
        </UsuarioStack.Navigator>
    );
}

export default Routes;

