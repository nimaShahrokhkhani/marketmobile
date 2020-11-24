import {View, Button, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {i18n} from '../utils/i18n/I18n'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';

class HomeScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../images/notif-icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    changeLocale() {
        let {locale, actions} = this.props;
        actions.changeLocale(locale === 'en_us' ? 'fa_ir' : 'en_us');
    }

    render() {
        const {locale} = this.props;
        return (
            <SafeAreaView>
                <View styles={styles.container}>
                    <Text>{i18n('HomeScreen.text', locale)}</Text>
                    <Text>{locale}</Text>
                    <Button
                        title="Change Locale"
                        onPress={() => this.changeLocale()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 24,
        height: 24,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
