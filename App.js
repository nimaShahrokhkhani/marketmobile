import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/homeScreen/HomeScreen'
import ProductScreen from "./src/productsScreen/ProductScreen";
import ProductDetailsScreen from "./src/productDetailsScreen/ProductDetailsScreen";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button} from 'react-native';
import {createAppContainer, SafeAreaView} from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {i18n} from "./src/utils/i18n/I18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from './src/utils/redux/actions/changeLocale';
import ProductsCategoryScreen from "./src/productsCategoryScreen/ProductsCategoryScreen";
import LoginScreen from "./src/loginScreen/LoginScreen";
import RegisterScreen from "./src/registerScreen/RegisterScreen";
import ShoppingCartScreen from "./src/shoppingCartScreen/ShoppingCartScreen";
import * as userActions from "./src/utils/redux/actions/userLogin";
import FlashMessage from "react-native-flash-message";
import { DrawerActions } from 'react-navigation-drawer';
import SearchScreen from "./src/searchScreen/SearchScreen";

const MyDrawerNavigator = createDrawerNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => (
                    <Text
                        style={{fontFamily: 'IRANSansMobileFaNum-Bold'}}>{i18n('Menu.Home', props.screenProps.locale)}</Text>
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
    ProductsCategoryScreen: {
        screen: ProductsCategoryScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => (
                    <Text
                        style={{fontFamily: 'IRANSansMobileFaNum-Bold'}}>{i18n('Menu.Products', props.screenProps.locale)}</Text>
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
    ProductScreen: {
        screen: ProductScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => null
            })
        }
    },
    ProductDetailsScreen: {
        screen: ProductDetailsScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => null
            })
        }
    },
    ShoppingCartScreen: {
        screen: ShoppingCartScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => null
            })
        },
        mode: 'modal'
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => null,
                drawerLockMode: 'locked-closed'
            })
        },
        mode: 'modal'
    },
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => null,
                drawerLockMode: 'locked-closed'
            })
        },
        mode: 'modal'
    },
    SearchScreen: {
        screen: SearchScreen,
        navigationOptions: (props) => {
            return ({
                drawerLabel: () => null,
                drawerLockMode: 'locked-closed'
            })
        },
        mode: 'modal'
    },
}, {
    contentComponent: (props) => (
        <View style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#13213c'}}>
                <View style={styles.drawerTopBar}>
                    {(props.screenProps.user && !(Object.keys(props.screenProps.user).length === 0 && props.screenProps.user.constructor === Object)) ?
                        <View style={styles.userLoginContainer}>
                            <Image source={require('./src/images/user-128.png')}
                                   style={styles.userIcon}/>
                            <Text style={styles.username}>{props.screenProps.user.username}</Text>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={() => {
                                    props.screenProps.actions.userLogin({});
                                    props.navigation.dispatch(DrawerActions.toggleDrawer())
                                }} style={styles.accountBtn}>
                                    <Text
                                        style={styles.accountBtnText}>{i18n('DrawerMenu.signOut', props.screenProps.locale)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.accountBtn}>
                                    <Text
                                        style={styles.accountBtnText}>{i18n('DrawerMenu.manageAccount', props.screenProps.locale)}</Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}
                                          style={styles.contactContainer}>
                            <Text style={{
                                color: '#fff',
                                marginEnd: 10
                            }}>{i18n('DrawerMenu.loginOrSignIn', props.screenProps.locale)}</Text>
                            <Image source={require('./src/images/contact.png')}
                                   style={styles.icon}/>
                        </TouchableOpacity>
                    }
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
        }
    },
});

const MyApp = createAppContainer(MyDrawerNavigator);

class App extends React.Component {
    render() {
        let {locale, user, actions} = this.props;
        return (
            <View style={{flex: 1}}>
                <FlashMessage position="top" /><MyApp
                screenProps={
                    {
                        locale: locale,
                        user: user,
                        actions: actions
                    }
                }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerTopBar: {
        flexDirection: 'row',
        backgroundColor: '#13213c',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 10
    },
    icon: {
        tintColor: '#fff',
        width: 20,
        height: 20
    },
    userIcon: {
        tintColor: '#fff',
        width: 60,
        height: 60
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
    },
    userLoginContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 10
    },
    username: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        color: '#fff',
        marginTop: 10
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    accountBtnText: {
        fontFamily: 'IRANSansMobileFaNum-Light',
        fontSize: 12,
    },
    accountBtn: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 2
    }
});
const mapStateToProps = state => ({
    locale: state.locale.locale,
    user: state.user.user,
});

const ActionCreators = Object.assign(
    {},
    localeActions,
    userActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
