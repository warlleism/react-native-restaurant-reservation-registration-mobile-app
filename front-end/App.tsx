/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import Login from './src/screens/login/login';

function App(): JSX.Element {
  return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        translucent
      />
      <Login />
    </View>
  )
}

export default App;
