import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from './src/homeScreen/HomeScreen'
import {ProductScreen} from "./src/productsScreen/ProductScreen";
import {StyleSheet, Text, View, ScrollView, Dimensions, Image, Button} from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {ProductDetailsScreen} from "./src/productDetailsScreen/ProductDetailsScreen";

const MyDrawerNavigator = createDrawerNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },
    ProductScreen: {
        screen: ProductScreen,
    },
    ProductDetailsScreen: {
        screen: ProductDetailsScreen,
    },
},{
    contentComponent: (props) => (
        <SafeAreaView>
            <View style={{height: 100,alignItems: 'center', justifyContent: 'center'}}>

                <Text style={{fontSize: 32}}>LOGO</Text>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
    )
});

const MyApp = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {
    render() {
        return (
            <MyApp />
        );
    }
}
