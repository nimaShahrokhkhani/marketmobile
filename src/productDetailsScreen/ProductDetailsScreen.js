import * as React from 'react';
import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import BaseScreen from "../baseScreen/BaseScreen";
import Services from "../utils/services/Services";
import {i18n} from '../utils/i18n/I18n'
import * as localeActions from "../utils/redux/actions/changeLocale";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';

class ProductDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        let {product} = this.props.navigation.state.params;
        let myRate = 0;
        let rate = 0;
        let rateArray = (product.rate && product.rate !== '') ? (this.isArray(JSON.stringify(product.rate)) ? JSON.stringify(product.rate) : []) : [];
        if (rateArray !== []) {
            for (let i in rateArray) {
                rate = rate + rateArray[i].rateValue;
            }
            rate = rate / (rateArray.length);
        }
        this.state = {
            activeColor: '',
            starCount: rate,
            myRate: 0
        }
    }

    isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    componentDidMount() {
    }

    renderButtonsView = () => {
        let {product} = this.props.navigation.state.params;
        const {locale} = this.props;
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    padding: 10,
                    marginEnd: 5
                }}>
                    <Text
                        style={{fontFamily: 'IRANSansMobileFaNum-Light'}}>{i18n('ProductDetail.comments', locale)}</Text>
                    <Image style={{width: 15, height: 15, resizeMode: 'stretch', marginStart: 5, tintColor: '#797979'}}
                           source={require('../images/comments.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    padding: 10,
                    marginStart: 5
                }}>
                    <Text
                        style={{fontFamily: 'IRANSansMobileFaNum-Light'}}>{i18n('ProductDetail.properties', locale)}</Text>
                    <Image style={{width: 15, height: 15, resizeMode: 'stretch', marginStart: 5, tintColor: '#797979'}}
                           source={require('../images/properties.png')}/>
                </TouchableOpacity>
            </View>
        )
    };

    renderMainInfoView = () => {
        let {product} = this.props.navigation.state.params;
        const {activeColor} = this.state;
        const {locale} = this.props;
        return (
            <View style={{backgroundColor: '#fff', marginTop: 20, padding: 20}}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                            <Text
                                style={{
                                    fontFamily: 'IRANSansMobileFaNum-Light',
                                    color: '#8c8c8c'
                                }}>{product.colors.split(',').length + ' ' + i18n('ProductDetail.color', locale)}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text
                                style={{fontFamily: 'IRANSansMobileFaNum-Bold'}}>{i18n('ProductDetail.color', locale)}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingVertical: 15, justifyContent: 'center'}}>
                        {product.colors.split(',').map((color) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        activeColor: color
                                    })
                                }} style={{
                                    paddingHorizontal: 5,
                                    paddingVertical: 10,
                                    borderWidth: activeColor === color ? 1 : 0,
                                    borderColor: activeColor === color ? '#000' : '#fff'
                                }}>
                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: color,
                                        marginHorizontal: 5
                                    }}/>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
        )
    };

    renderPriceView = () => {
        let {product} = this.props.navigation.state.params;
        const {locale} = this.props;
        return (
            <View style={{backgroundColor: '#fff', marginTop: 20, padding: 20}}>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={{color: '#ff5d07', fontSize: 20, fontFamily: 'IRANSansMobileFaNum-Bold'}}>
                        {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + i18n('General.currency', locale)}</Text>
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor: '#00ff99'
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 17,
                        fontFamily: 'IRANSansMobileFaNum-Bold'
                    }}>{i18n('ProductDetail.addToShoppingCart', locale)}</Text>
                    <Image style={{width: 25, height: 25, marginStart: 5, tintColor: '#fff'}}
                           source={require('../images/addToBasket.png')}/>
                </TouchableOpacity>
            </View>
        )
    };

    renderDescriptionView = () => {
        let {product} = this.props.navigation.state.params;
        if (product.description && product.description !== '') {
            return (
                <View style={{backgroundColor: '#fff', marginTop: 20, padding: 20}}>
                    <Text style={{fontFamily: 'IRANSansMobileFaNum-Light'}}>
                        {product.description}
                    </Text>
                </View>
            )
        }
    };

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        let {product} = this.props.navigation.state.params;
        return (
            <BaseScreen navigation={this.props.navigation}>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <View style={{alignItems: 'flex-start', width: '100%', padding: 20}}>
                            <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'#FFD700'}
                                starSize={20}
                            />
                        </View>
                        <Image style={{
                            width: 300,
                            height: 300,
                            resizeMode: 'stretch',
                            margin: 5
                        }} source={{uri: Services.getProductImageDownloadUrl(product.image)}}/>
                    </View>
                    <View style={styles.nameContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                            <Image style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'stretch',
                                marginEnd: 25,
                                tintColor: '#797979'
                            }} source={require('../images/share.png')}/>
                            <Image style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'stretch',
                                marginEnd: 25,
                                tintColor: '#797979'
                            }} source={require('../images/alert.png')}/>
                            <Image style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'stretch',
                                marginEnd: 25,
                                tintColor: '#797979'
                            }} source={require('../images/favorite.png')}/>
                        </View>
                        <View style={{padding: 10, alignItems: 'flex-end'}}>
                            <Text style={{fontFamily: 'IRANSansMobileFaNum-Bold', fontSize: 17}}>{product.name}</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#d3d3d3', padding: 20, marginBottom: 50}}>
                        {this.renderButtonsView()}
                        {this.renderMainInfoView()}
                        <View style={{borderBottomColor: '#919191', borderBottomWidth: 1}}/>
                        {this.renderPriceView()}
                        {this.renderDescriptionView()}
                    </View>
                </ScrollView>
            </BaseScreen>

        );
    }

}

const styles = StyleSheet.create({
    nameContainer: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
        paddingVertical: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen)
