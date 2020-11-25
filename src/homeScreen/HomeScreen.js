import {View, Text, Dimensions, Image, StyleSheet, ScrollView, FlatList, Platform} from 'react-native';
import {i18n} from '../utils/i18n/I18n'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import BaseScreen from "../baseScreen/BaseScreen";
import Carousel from 'react-native-snap-carousel';
import Services from "../utils/services/Services";

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bestProductList: [],
            categoryList: [],
            newCollectionList: [],
            topBrandList: [],
            bannerList: [
                require('../images/bannerImages/slide1.jpg'),
                require('../images/bannerImages/slide3.jpg'),
                require('../images/bannerImages/slide4.jpg'),
                require('../images/bannerImages/slide5.jpg'),
                require('../images/bannerImages/slide6.jpg')
            ]
        }
    }

    getNewCollectionList() {
        Services.getProductsNewCollectionList().then((response) => {
            this.setState({
                newCollectionList: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });

    }

    getCategoryList() {
        Services.getProductCategoryList().then(response => {
            this.setState({
                categoryList: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    getBestProductList() {
        Services.getProductsList({isBestSeller: 'true'}).then((response) => {
            this.setState({
                bestProductList: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });
    }

    getTopBrandList() {
        Services.getBrandList().then((response) => {
            this.setState({
                topBrandList: response.data,
            });
        }).catch((error) => {
            console.log('error', error)
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({
            locale: this.props.locale
        });
        this.getBestProductList();
        this.getCategoryList();
        this.getNewCollectionList();
        this.getTopBrandList();
    }

    changeLocale() {
        let {locale, actions} = this.props;
        actions.changeLocale(locale === 'en_us' ? 'fa_ir' : 'en_us');
    }

    renderBannerSliderItem = ({item, index}) => {
        return (
            <Image style={{
                width: '100%',
                height: undefined,
                aspectRatio: 2.5
            }} source={item}/>
        );
    };

    wp(percentage) {
        const value = (percentage * Dimensions.get('window').width) / 100;
        return Math.round(value);
    }

    renderCategoryItem = ({item}) => {
        return (
            <View style={styles.categoryItemContainer}>
                <Text style={{color: '#FFF', fontFamily: 'IRANSansMobileFaNum-Light'}}>{item.type}</Text>
            </View>
        )
    };

    renderBestProductItem = ({item}) => {
        const {locale} = this.props;
        return (
            <View style={styles.productItemContainer}>
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
            </View>
        )
    };

    renderNewCollectionItem = ({item}) => {
        const {locale} = this.props;
        return (
            <View style={styles.productItemContainer}>
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
            </View>
        )
    };

    renderTopBrandItem = ({item}) => {
        return (
            <View style={{alignItems: 'center'}}>
                <View style={styles.brandItemContainer}>
                    <Image style={{
                        width: (Dimensions.get('window').width / 3) - 30,
                        height: (Dimensions.get('window').width / 3) - 30,
                        resizeMode: 'stretch',
                        margin: 5,
                    }} source={{uri: Services.getBrandImageDownloadUrl(item.image)}}/>
                </View>
                <Text
                    style={{
                        fontSize: 11,
                        fontFamily: 'IRANSansMobileFaNum-Light',
                        color: '#ff5d07'
                    }}>{item.name}</Text>
            </View>
        )
    };

    render() {
        const {locale} = this.props;
        const {newCollectionList, categoryList, bestProductList, bannerList, topBrandList} = this.state;
        return (
            <BaseScreen navigation={this.props.navigation}>
                <ScrollView style={styles.container}>
                    <View>
                        <Carousel
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            data={bannerList}
                            renderItem={this.renderBannerSliderItem}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width + this.wp(2) * 2}
                            inverted
                        />
                    </View>
                    <View>
                        <FlatList
                            ref="categoryFlatList"
                            onContentSizeChange={() => this.refs.categoryFlatList.scrollToEnd()}
                            data={categoryList}
                            horizontal={true}
                            renderItem={this.renderCategoryItem}/>
                    </View>
                    <View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.listTitle}>{i18n('HomeScreen.top‌Brands', locale)}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <FlatList
                                ref="top‌BrandFlatList"
                                onContentSizeChange={() => this.refs.top‌BrandFlatList.scrollToEnd()}
                                data={topBrandList}
                                horizontal={true}
                                renderItem={this.renderTopBrandItem}/>
                        </View>
                    </View>
                    <View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.listTitle}>{i18n('HomeScreen.bestSeller', locale)}</Text>
                        </View>
                        <FlatList
                            ref="bestProductFlatList"
                            onContentSizeChange={() => this.refs.bestProductFlatList.scrollToEnd()}
                            data={bestProductList}
                            horizontal={true}
                            renderItem={this.renderBestProductItem}/>
                    </View>
                    <View style={{marginBottom: Platform.OS === 'ios' ? 200 : 100}}>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.listTitle}>{i18n('HomeScreen.newCollection', locale)}</Text>
                        </View>
                        <FlatList
                            ref="newCollectionFlatList"
                            onContentSizeChange={() => this.refs.newCollectionFlatList.scrollToEnd()}
                            data={newCollectionList}
                            horizontal={true}
                            renderItem={this.renderNewCollectionItem}/>
                    </View>
                </ScrollView>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(252,251,245,1)'
    },
    topBar: {
        height: 50,
        backgroundColor: 'red'
    },
    icon: {
        width: 24,
        height: 24,
    },
    categoryItemContainer: {
        backgroundColor: '#ff5d07',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
    },
    productItemContainer: {
        backgroundColor: '#fff',
        borderRadius: 2,
        borderColor: '#f0f0f0',
        borderWidth: 1,
        width: (Dimensions.get('window').width / 3) - 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    listTitle: {
        marginTop: 15,
        marginHorizontal: 10,
        marginBottom: 5,
        fontFamily: 'IRANSansMobileFaNum-Bold'
    },
    brandItemContainer: {
        width: (Dimensions.get('window').width / 3) - 20,
        height: (Dimensions.get('window').width / 3) - 20,
        borderRadius: ((Dimensions.get('window').width / 3) - 20) / 2,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff'
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
