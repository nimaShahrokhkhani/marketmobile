import * as React from 'react';
import {View, Text, SafeAreaView, Button, Image, StyleSheet} from 'react-native';
import {i18n} from "../utils/i18n/I18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';


class ProductScreen extends React.Component {

    componentDidMount() {
        this.props.navigation.setParams({
            locale :this.props.locale
        });
    }

    navigateToProductDetailScreen = () => {
        this.props.navigation.navigate('ProductDetailsScreen')
    };

    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>products</Text>
                    <Button
                        title="productDetail"
                        onPress={this.navigateToProductDetailScreen}
                    />
                </View>
            </SafeAreaView>

        );
    }

}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
