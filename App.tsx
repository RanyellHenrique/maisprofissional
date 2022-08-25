import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import UserContextProvider from './src/context';

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
