import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/homeScreen/HomeScreen'
import ProductScreen from "./src/productsScreen/ProductScreen";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {ProductDetailsScreen} from "./src/productDetailsScreen/ProductDetailsScreen";
import {i18n} from "./src/utils/i18n/I18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from './src/utils/redux/actions/changeLocale';

const MyDrawerNavigator = createDrawerNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => (
                    <Text style={{fontFamily: 'IRANSansMobileFaNum-Bold'}}>{i18n('Menu.Home', props.screenProps.locale)}</Text>
                ),
                drawerIcon: ({tintColor}) => (
                    <Image
                        source={require('./src/images/home.png')}
                        style={[styles.iconMenu, {tintColor: tintColor}]}
                    />
                ),
            })
        }
    },
    ProductScreen: {
        screen: ProductScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => (
                    <Text style={{fontFamily: 'IRANSansMobileFaNum-Bold'}}>{i18n('Menu.Products', props.screenProps.locale)}</Text>
                ),
                drawerIcon: ({tintColor}) => (
                    <Image
                        source={require('./src/images/list.png')}
                        style={[styles.iconMenu, {tintColor: tintColor}]}
                    />
                ),
            })
        }
    },
    ProductDetailsScreen: {
        screen: ProductDetailsScreen,
    },
}, {
    contentComponent: (props) => (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#13213c'}}>
                <View style={styles.drawerTopBar}>
                    <TouchableOpacity style={styles.contactContainer}>
                        <Text style={{
                            color: '#fff',
                            marginEnd: 10
                        }}>{i18n('DrawerMenu.loginOrSignIn', props.screenProps.locale)}</Text>
                        <Image source={require('./src/images/contact.png')}
                               style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1, backgroundColor: 'rgba(252,251,245,1)'}}>
                    <DrawerItems {...props} />
                </ScrollView>
            </SafeAreaView>
        </View>
    ),
    drawerPosition: "right",
    contentOptions: {
        activeTintColor: '#e91e63',
        itemsContainerStyle: {
            // opacity: 1
        },
        iconContainerStyle: {
            // opacity: 1
        },
        itemStyle: {
            flexDirection: 'row-reverse'
        },
        bottomView: {
            backgroundColor: '#13213c',
            flex: 0
        },
        topView: {
            backgroundColor: '#13213c',
            flex: 0
        },
    },
});

const MyApp = createAppContainer(MyDrawerNavigator);

class App extends React.Component {
    render() {
        let {locale} = this.props;
        return (
            <MyApp
                screenProps={{locale: locale}}/>
        );
    }
}

const styles = StyleSheet.create({
    drawerTopBar: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: '#13213c',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    icon: {
        tintColor: '#fff',
        width: 20,
        height: 20
    },
    iconMenu: {
        tintColor: '#fff',
        width: 20,
        height: 20,
        margin: 20
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 30,
    }
});
const mapStateToProps = state => ({
    locale: state.locale.locale,
});

const ActionCreators = Object.assign(
    {},
    localeActions,
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
