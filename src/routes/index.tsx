import React, { useContext } from 'react';
import { HeaderText, NavBar } from '../components';
import {
    Ofertas,
    Login,
    OfertaDetails,
    Trabalhadores,
    OfertaForm,
    PropostaForm, Propostas,
    PropostaDetails, UsuarioForm,
    TrabalhadoresDetails,
    PerfilDetails,
    Categorias,
    CategoriaForm
} from '../pages';
import { colors } from '../styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../context';

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {

    const { state } = useContext(UserContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerTitle: "",
                tabBarHideOnKeyboard: true,
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
                    } else if (route.name === 'Admin') {
                        iconName = focused ? 'ios-person' : 'ios-person';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Perfil" component={UsuariosScreen} />
            <Tab.Screen name="Ofertas" component={OfertasScreen} />
            <Tab.Screen name="Trabalhadores" component={TrabalhadoresScreen} />
            {state.isLogado &&
                <>
                    {
                        state.perfil == "ADMIN" ?
                        <Tab.Screen name="Admin" component={CategoriaScreen}/> : 
                        <Tab.Screen name="Propostas" component={PropostasScreen} />
                    }
                </>
            }
        </Tab.Navigator>
    )
}

const OfertasStack = createNativeStackNavigator();

const OfertasScreen: React.FC = () => {
    return (
        <OfertasStack.Navigator screenOptions={{ headerShown: false }}>
            <OfertasStack.Screen name="OfertasList" component={Ofertas} />
            <OfertasStack.Screen name="OfertaDetails" component={OfertaDetails} />
            <OfertasStack.Screen name="OfertaForm" component={OfertaForm} />
        </OfertasStack.Navigator>
    );
}

const PropostasStack = createNativeStackNavigator();

const PropostasScreen: React.FC = () => {
    return (
        <PropostasStack.Navigator screenOptions={{ headerShown: false }}>
            <PropostasStack.Screen name="PropostasList" component={Propostas} />
            <PropostasStack.Screen name="PropostaForm" component={PropostaForm} />
            <PropostasStack.Screen name="PropostaDetails" component={PropostaDetails} />
        </PropostasStack.Navigator>
    );
}

const TrabalhadoresStack = createNativeStackNavigator();

const TrabalhadoresScreen: React.FC = () => {
    return (
        <TrabalhadoresStack.Navigator screenOptions={{ headerShown: false }}>
            <TrabalhadoresStack.Screen name="TrabalhadoresList" component={Trabalhadores} />
            <TrabalhadoresStack.Screen name="OfertaDetails" component={OfertaDetails} />
            <TrabalhadoresStack.Screen name="TrabalhadoresDetails" component={TrabalhadoresDetails} />
        </TrabalhadoresStack.Navigator>
    );
}

const UsuarioStack = createNativeStackNavigator();

const UsuariosScreen: React.FC = () => {
    const { state } = useContext(UserContext);

    return (
        <UsuarioStack.Navigator screenOptions={{ headerShown: false }}>
            {state.isLogado ?
                <UsuarioStack.Screen name="PerfilDetails" component={PerfilDetails} /> :
                <>
                    <UsuarioStack.Screen name="Login" component={Login} />
                    <UsuarioStack.Screen name="UsuarioForm" component={UsuarioForm} />
                </>

            }
        </UsuarioStack.Navigator>
    );
}


const CategoriaScreen: React.FC = () => {
    return (
        <PropostasStack.Navigator screenOptions={{ headerShown: false }}>
            <PropostasStack.Screen name="CategoriasList" component={Categorias} />
            <PropostasStack.Screen name="CategoriaForm" component={CategoriaForm} />
        </PropostasStack.Navigator>
    );
}

export default Routes;

