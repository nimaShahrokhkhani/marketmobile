import {View, TouchableOpacity, Text, StatusBar, StyleSheet, SafeAreaView, Image} from 'react-native';
import {i18n} from '../utils/i18n/I18n'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import { DrawerActions } from 'react-navigation-drawer';

class BaseScreen extends React.Component {

    changeLocale = () => {
        let {locale, actions} = this.props;
        actions.changeLocale(locale === 'en_us' ? 'fa_ir' : 'en_us');
    };

    render() {
        const {locale, children} = this.props;
        return (
            <View>
                <StatusBar backgroundColor="#13213c" barStyle="light-content" />
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView>
                    <View style={styles.container}>
                        <View style={styles.topBar}>
                            <View style={styles.topBarStart}>
                                <TouchableOpacity style={styles.shoppingCartContainer}>
                                    <Image
                                        source={require('../images/shopping-cart.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.localizationContainer} onPress={this.changeLocale}>
                                    <Image
                                        source={require('../images/localization.png')}
                                        style={styles.iconSecondary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.searchContainer}>
                                    <Image
                                        source={require('../images/search.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topBarEnd}>
                                <TouchableOpacity style={styles.hamburgerContainer} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
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
        height: '100%'
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
    locale: state.locale.locale,
});

const ActionCreators = Object.assign(
    {},
    localeActions,
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseScreen)
