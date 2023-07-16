/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Detail from './src/screens/detail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home/'
import Login from './src/screens/login/login';
import Reserva from './src/screens/reserva';
import { AppProvider } from './src/context/Provider';
import Reservas from './src/screens/reservas';

function HomeScreen() {
  return <Home />
}

function ReservaScreen() {
  return <Reserva />
}

function LoginScreen() {
  return <Login />
}

function DetailScreen() {
  return <Detail />
}

function ReservasScreen() {
  return <Reservas />
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="/" component={LoginScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="reservar" component={ReservaScreen} />
          <Stack.Screen name="reservas" component={ReservasScreen} />
          <Stack.Screen name="detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>

  )
}

export default App;
