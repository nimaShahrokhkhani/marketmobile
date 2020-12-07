import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    StyleSheet,
    FlatList,
    StatusBar,
    SafeAreaView,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';
import {i18n} from "../utils/i18n/I18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import * as userActions from '../utils/redux/actions/userLogin';
import * as shoppingCartActions from "../utils/redux/actions/addToShoppingCart";
import Services from "../utils/services/Services";
import NumericInput from "react-native-numeric-input";

class SearchScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    onSearchButtonClick = () => {
        this.props.navigation.navigate('ProductScreen', {name: this.state.search});
        this.setState({
            search: ''
        })
    };

    onSearchTextChange = (text) => {
        this.setState({
            search: text
        })
    };

    render() {
        const {locale, products} = this.props;
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView style={{flex: 1}}>
                    <View>
                        <View style={{
                            borderBottomWidth: 2,
                            borderBottomColor: '#f0f0f0',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingHorizontal: 20
                        }}>
                            <TextInput style={styles.input} placeholder={i18n('General.search', locale)}
                                       value={this.state.search}
                                       returnKeyType='search'
                                       onSubmitEditing={this.onSearchButtonClick}
                                       onChangeText={this.onSearchTextChange}/>
                            <Image source={require('../images/search.png')} style={{tintColor: '#a0a0a0'}}/>
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
        width: 20,
        height: 20
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
    closeContainer: {
        marginHorizontal: 15,
    },
    screenTitle: {
        fontFamily: 'IRANSansMobileFaNum-Bold',
        color: '#fff',
        fontSize: 18,
        marginEnd: 5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    input: {
        width: '100%',
        height: 70,
        fontFamily: 'IRANSansMobileFaNum-Light',
        textAlign: 'right',
        marginHorizontal: 10
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 25
    },
    checkbox: {
        alignSelf: "center",
        width: 20,
        height: 20,
        marginHorizontal: 10
    },
    label: {
        fontFamily: 'IRANSansMobileFaNum-Light'
    },
    totalAmount: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#fff',
        padding: 20
    }
});

const mapStateToProps = state => ({
    locale: state.locale.locale,
    user: state.user.user,
    products: state.products.products
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
