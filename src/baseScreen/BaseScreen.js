import {View, TouchableOpacity, Text, StatusBar, StyleSheet, SafeAreaView, Image} from 'react-native';
import {i18n} from '../utils/i18n/I18n'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import * as userActions from '../utils/redux/actions/userLogin';
import * as shoppingCartActions from '../utils/redux/actions/addToShoppingCart';
import {DrawerActions} from 'react-navigation-drawer';

class BaseScreen extends React.Component {

    changeLocale = () => {
        let {locale, actions} = this.props;
        actions.changeLocale(locale === 'en_us' ? 'fa_ir' : 'en_us');
    };

    render() {
        let totalShoppingCartProductsCount = 0;
        const {locale, products, children, navigation} = this.props;
        products && products.length > 0 && products.map(product => {
            totalShoppingCartProductsCount += product.count;
        });
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.container}>
                        <View style={styles.topBar}>
                            <View style={styles.topBarStart}>
                                <TouchableOpacity onPress={() => navigation.navigate('ShoppingCartScreen')}
                                                  style={styles.shoppingCartContainer}>
                                    <Image
                                        source={require('../images/shopping-cart.png')}
                                        style={styles.icon}
                                    />
                                    <View style={{
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 16,
                                        height: 16,
                                        borderRadius: 8,
                                        backgroundColor: '#fff',
                                        right: -2,
                                        top: -12
                                    }}>
                                        <Text style={{
                                            fontSize: 11,
                                            color: '#13213c',
                                            fontFamily: 'IRANSansMobileFaNum-Light'
                                        }}>{products ? products.length : 0}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.localizationContainer} onPress={this.changeLocale}>
                                    <Image
                                        source={require('../images/localization.png')}
                                        style={styles.iconSecondary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.searchContainer} onPress={() => navigation.navigate('SearchScreen')}>
                                    <Image
                                        source={require('../images/search.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBarEnd}>
                                <TouchableOpacity style={styles.hamburgerContainer}
                                                  onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                                    <Image
                                        source={require('../images/hamburger_icon.png')}
                                        style={styles.iconSecondary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.container}>
                            {children}
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomView}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    childrenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#13213c'
    },
    bottomView: {
        backgroundColor: '#13213c',
        flex: 0
    },
    topView: {
        backgroundColor: '#13213c',
        flex: 0
    },
    icon: {
        tintColor: '#fff',
        width: 20,
        height: 20
    },
    iconSecondary: {
        tintColor: '#fff',
        width: 25,
        height: 25
    },
    topBarStart: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    topBarEnd: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    localizationContainer: {
        marginHorizontal: 10,
    },
    shoppingCartContainer: {
        marginHorizontal: 10,
    },
    searchContainer: {
        marginHorizontal: 10,
    },
    hamburgerContainer: {
        marginHorizontal: 10,
    }
});

const mapStateToProps = state => ({
    user: state.user.user,
    locale: state.locale.locale,
    products: state.products.products,
});

const ActionCreators = Object.assign(
    {},
    localeActions,
    userActions,
    shoppingCartActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseScreen)
