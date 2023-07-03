/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View } from 'react-native';
import Detail from './src/screens/detail';


function App(): JSX.Element {
  return (
    <View style={{ padding: 15, backgroundColor: "#FFFFFF" }}>
      <Detail />
    </View>
  )
}

export default App;
