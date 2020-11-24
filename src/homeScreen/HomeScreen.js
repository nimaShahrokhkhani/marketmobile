import {View, Button, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {i18n} from '../utils/i18n/I18n'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import BaseScreen from "../baseScreen/BaseScreen";
import Carousel from 'react-native-snap-carousel';

class HomeScreen extends React.Component {

    componentDidMount() {
        this.props.navigation.setParams({
            locale :this.props.locale
        });
    }

    changeLocale() {
        let {locale, actions} = this.props;
        actions.changeLocale(locale === 'en_us' ? 'fa_ir' : 'en_us');
    }

    render() {
        const {locale} = this.props;
        return (
            <BaseScreen navigation={this.props.navigation}>
                <View style={styles.container}>

                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topBar: {
        height: 50,
        backgroundColor: 'red'
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
