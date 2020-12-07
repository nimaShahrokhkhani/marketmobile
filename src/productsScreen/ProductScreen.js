import * as React from 'react';
import {View, Text, TouchableOpacity, Button, Image, StyleSheet, FlatList, Dimensions} from 'react-native';
import {i18n} from "../utils/i18n/I18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import BaseScreen from "../baseScreen/BaseScreen";
import Services from "../utils/services/Services";


class ProductScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            productList: []
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            locale: this.props.locale
        });
        this.props.navigation.addListener('didFocus', () => {
            this.getProductList(0, 50)
        });
    }

    getProductList(offset, length) {
        let {category, name} = this.props.navigation.state.params;
        let query = {offset: offset, length: length};
        if (category) {
            if (category.subTypes && category.subTypes !== '') {
                query["type"] = category.type;
                query["subType"] = category.subTypes.split(',')[this.state.activeTab];
            } else {
                query["type"] = category.type;
            }
        }
        if (name) {
            query["name"] = name;
        }
        Services.searchProductsList(query).then((response) => {
            this.setState({
                productList: response.data.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });
    }

    navigateToProductDetailScreen = (item) => {
        this.props.navigation.navigate('ProductDetailsScreen', {product: item})
    };

    onCategoryPress = (item, index) => {
        if (index !== this.state.activeTab) {
            this.setState({
                activeTab: index,
                productList: []
            }, () => {
                this.getProductList(0, 50);
            })
        }
    };

    renderCategoryItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.onCategoryPress(item, index)}
                              style={[styles.categoryItemContainer, (this.state.activeTab === index && {
                                  borderBottomWidth: 4,
                                  borderBottomColor: '#ff5d07'
                              })]}>
                <Text style={{color: '#fff', fontFamily: 'IRANSansMobileFaNum-Light'}}>{item}</Text>
            </TouchableOpacity>
        )
    };

    renderProductItem = ({item}) => {
        const {locale} = this.props;
        return (
            <TouchableOpacity onPress={() => this.navigateToProductDetailScreen(item)}
                              style={styles.productItemContainer}>
                <Image style={{
                    width: (Dimensions.get('window').width / 3) - 20,
                    height: 150,
                    resizeMode: 'stretch',
                    margin: 5
                }} source={{uri: Services.getProductImageDownloadUrl(item.image)}}/>
                <Text style={{fontSize: 11, fontFamily: 'IRANSansMobileFaNum-Light'}}>{item.name}</Text>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderTopColor: '#f0f0f0',
                    borderTopWidth: 1
                }}>
                    <Text style={{
                        fontSize: 11,
                        fontFamily: 'IRANSansMobileFaNum-Light',
                        marginEnd: 3,
                        color: '#ff5d07'
                    }}>{i18n('General.currency', locale)}</Text>
                    <Text style={{
                        fontSize: 11,
                        fontFamily: 'IRANSansMobileFaNum-Light',
                        color: '#ff5d07'
                    }}>{item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        let {category} = this.props.navigation.state.params;
        let {productList} = this.state;
        return (
            <BaseScreen navigation={this.props.navigation}>
                {category && category.subTypes && category.subTypes !== '' &&
                <View style={styles.categoryListContainer}>
                    <FlatList
                        ref="categoryTypeFlatList"
                        onContentSizeChange={() => this.refs.categoryTypeFlatList.scrollToEnd()}
                        data={category.subTypes.split(',')}
                        horizontal={true}
                        renderItem={this.renderCategoryItem}
                        inverted={true}/>
                </View>
                }
                <View style={{alignItems: 'flex-end', marginHorizontal: 10}}>
                    <FlatList
                        ref="productFlatList"
                        data={productList}
                        numColumns={2}
                        renderItem={this.renderProductItem}
                    />
                </View>
            </BaseScreen>

        );
    }

}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    categoryListContainer: {
        backgroundColor: '#13213c',
        alignItems: 'flex-end',
        width: '100%'
    },
    categoryItemContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    productItemContainer: {
        backgroundColor: '#fff',
        borderRadius: 2,
        borderColor: '#f0f0f0',
        borderWidth: 1,
        width: (Dimensions.get('window').width / 2) - 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
