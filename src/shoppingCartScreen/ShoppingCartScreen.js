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

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalCount: 0,
            totalPrice: 0
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.onTotalChange()
        });
    }

    onTotalChange = () => {
        this.state.totalCount = 0;
        this.state.totalPrice = 0;
        this.props.products.map((product, i) => {
            if (i === 0) {
                this.state.totalCount = 0;
                this.state.totalPrice = 0;
            }
            this.state.totalCount += product.count;
            this.state.totalPrice += product.value.price * product.count;
        });
        this.setState({
            totalCount: this.state.totalCount,
            totalPrice: this.state.totalPrice
        })
    };

    onDeleteBtnClick = (product) => {
        this.props.actions.deleteProduct(product.value);
        this.onTotalChange();
    };

    onMinusProductClick = (product) => {
        this.props.actions.decreaseProduct(product.value);
        this.onTotalChange();
    };

    onPlusProductClick = (product) => {
        this.props.actions.increaseProduct(product.value);
        this.onTotalChange();
    };

    renderProductItem = ({item, index}) => {
        const {locale} = this.props;
        return (
            <View style={{
                margin: 10, backgroundColor: '#fff', paddingVertical: 10, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
            }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'flex-end', margin: 20}}>
                        <Text style={{
                            fontFamily: 'IRANSansMobileFaNum-Bold',
                            fontSize: 16,
                            margin: 10
                        }}>{item.value.name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{
                                fontFamily: 'IRANSansMobileFaNum-Light',
                                fontSize: 16,
                                margin: 10
                            }}>
                                {item.value.brand}
                            </Text>
                            <Text style={{
                                fontFamily: 'IRANSansMobileFaNum-Bold',
                                fontSize: 16,
                                margin: 10
                            }}>{i18n('ShoppingCart.brand', locale) + ': '}</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{
                                fontFamily: 'IRANSansMobileFaNum-Light',
                                fontSize: 16,
                                margin: 10
                            }}>
                                {item.value.company}
                            </Text>
                            <Text style={{
                                fontFamily: 'IRANSansMobileFaNum-Bold',
                                fontSize: 16,
                                margin: 10
                            }}>{i18n('ShoppingCart.company', locale) + ': '}</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <NumericInput type='plus-minus'
                                          value={this.props.products.find((product) => product.value.serialNumber === item.value.serialNumber).count}
                                          onChange={value => value === 0 ? this.onDeleteBtnClick(item) : (value > this.props.products.find((product) => product.value.serialNumber === item.value.serialNumber).count ? this.onPlusProductClick(item) : this.onMinusProductClick(item))}
                                          totalWidth={100}
                                          totalHeight={30}
                                          iconSize={20}
                                          rounded
                                          rightButtonBackgroundColor='#00a500'
                                          leftButtonBackgroundColor='#ff5d07'/>
                            <Text style={{
                                fontFamily: 'IRANSansMobileFaNum-Bold',
                                fontSize: 16,
                                margin: 10
                            }}>{i18n('ShoppingCart.count', locale) + ': '}</Text>
                        </View>
                    </View>
                    <View>
                        <Image style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'stretch',
                            margin: 5
                        }} source={{uri: Services.getProductImageDownloadUrl(item.value.image)}}/>
                    </View>
                </View>

                <View style={{
                    backgroundColor: '#f0f0f0',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#e0e0e0',
                    padding: 5
                }}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={{
                            fontFamily: 'IRANSansMobileFaNum-Light',
                            fontSize: 16,
                            margin: 10
                        }}>
                            {item.value.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + i18n('General.currency', locale)}
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{
                            fontFamily: 'IRANSansMobileFaNum-Light',
                            fontSize: 16,
                            margin: 10
                        }}>{i18n('ShoppingCart.productPrice', locale)}</Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: '#f0f0f0',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#e0e0e0',
                    padding: 5
                }}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={{
                            fontFamily: 'IRANSansMobileFaNum-Light',
                            fontSize: 16,
                            margin: 10,
                            color: '#009e00'
                        }}>
                            {(parseInt(item.count) * parseInt(item.value.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + i18n('General.currency', locale)}
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{
                            fontFamily: 'IRANSansMobileFaNum-Light',
                            fontSize: 16,
                            margin: 10,
                            color: '#009e00'
                        }}>{i18n('ShoppingCart.totalPrice', locale)}</Text>
                    </View>
                </View>
                <View style={{paddingStart: 10, paddingTop: 10, alignItems: 'flex-start'}}>
                    <TouchableOpacity onPress={() => this.onDeleteBtnClick(item)}>
                        <Text style={{
                            fontFamily: 'IRANSansMobileFaNum-Light',
                            fontSize: 16,
                            margin: 10,
                            color: '#d30000'
                        }}>{i18n('ShoppingCart.delete', locale)}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    };

    render() {
        const {locale, products} = this.props;
        return (
            <View>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView>
                    <View>

                        <View style={styles.topBar}>
                            <View style={styles.topBarStart}>
                            </View>
                            <View style={styles.topBarEnd}>
                                <Text style={styles.screenTitle}>{i18n('ShoppingCart.shoppingCart', locale)}</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}
                                                  style={styles.closeContainer}>
                                    <Image
                                        source={require('../images/close.png')}
                                        style={styles.iconSecondary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.totalAmount}>

                            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: 'IRANSansMobileFaNum-Bold',
                                    marginEnd: 3,
                                    color: '#ff5d07'
                                }}>{i18n('General.currency', locale)}</Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: 'IRANSansMobileFaNum-Bold',
                                    color: '#ff5d07'
                                }}>{this.state.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text style={{
                                    fontFamily: 'IRANSansMobileFaNum-Bold',
                                    fontSize: 16
                                }}>{i18n('ShoppingCart.totalAmount', locale)}</Text>
                            </View>

                        </View>
                        <View style={{backgroundColor: '#f0f0f0', height: '100%'}}>
                            <View style={{flex: 1}}>
                                <FlatList
                                    ref="productFlatList"
                                    data={products}
                                    renderItem={this.renderProductItem}
                                />
                            </View>
                            <View style={{flex: 1}}>
                                <TouchableOpacity style={{
                                    width: Dimensions.get('window').width,
                                    height: 60,
                                    backgroundColor: '#00a500',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: 'IRANSansMobileFaNum-Light',
                                        color: '#fff',
                                        fontSize: 20
                                    }}>{i18n('ShoppingCart.continuePay', locale)}</Text>
                                </TouchableOpacity>
                            </View>
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
        width: 250,
        height: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
