import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderText, NavBar } from '../components';
import { Home, Ofertas, Login, OfertaDetails } from '../pages';
import { colors } from '../styles';

const Stack = createStackNavigator();


const Routes: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: "",
                headerStyle: {
                    backgroundColor: colors.primary
                },
                headerLeft: () => <HeaderText />,
                headerRight: () => <NavBar />
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Ofertas" component={Ofertas} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="OfertaDetails" component={OfertaDetails} />
        </Stack.Navigator>
    )
}

export default Routes;
