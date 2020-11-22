import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from './src/homeScreen/HomeScreen'
import {ProductScreen} from "./src/productsScreen/ProductScreen";


const Stack = createStackNavigator();
export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />



        </Stack.Navigator>
      </NavigationContainer>
  );
}


