import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList, Platform} from 'react-native';
import {i18n} from '../utils/i18n/I18n'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import BaseScreen from "../baseScreen/BaseScreen";
import Carousel from 'react-native-snap-carousel';
import Services from "../utils/services/Services";
import Spinner from "react-native-loading-spinner-overlay";

class ProductsCategoryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            categoryList: [],
            masterCategories: [],
            isLoading: false
        }
    }

    getMasterCategoryList() {
        let {masterCategory} = this.props.navigation.state.params;
        this.setState({isLoading: true}, () => {
            Services.getMasterCategoryList().then(response => {
                let activeTab = 0;
                if (masterCategory) {
                    activeTab = response.data.findIndex(category => category.name === masterCategory)
                }
                this.setState({
                    activeTab: activeTab,
                    masterCategories: response.data
                }, () => {
                    this.getCategoryList(this.state.masterCategories[0].name)
                })
            }).catch(error => {
                console.log(error);
                this.hideLoading();
            })
        })
    }

    getCategoryList(masterCategoryName) {
        Services.getProductCategoryList({masterCategory: masterCategoryName}).then(response => {
            this.setState({
                categoryList: response.data
            });
            this.hideLoading();
        }).catch(error => {
            console.log(error);
            this.hideLoading();
        })
    }

    onMasterCategoryPress = (item, index) => {
        if (index !== this.state.activeTab) {
            this.setState({
                activeTab: index,
                productList: [],
                isLoading: true
            }, () => {
                this.getCategoryList(item.name);
            })
        }
    };

    renderMasterCategoryItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => this.onMasterCategoryPress(item, index)}
                              style={[styles.masterCategoryItemContainer, (this.state.activeTab === index && {
                                  borderBottomWidth: 4,
                                  borderBottomColor: '#ff5d07'
                              })]}>
                <Text style={{color: '#fff', fontFamily: 'IRANSansMobileFaNum-Light'}}>{item.name}</Text>
            </TouchableOpacity>
        )
    };

    componentDidMount() {
        this.props.navigation.setParams({
            locale: this.props.locale
        });
        this.getMasterCategoryList();
    }

    navigateToProductsScreen = (item) => {
        this.props.navigation.navigate('ProductScreen', {category: item})
    };

    hideLoading = () => {
        this.setState({isLoading: false})
    };

    renderCategoryItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.categoryItemContainer} onPress={() => this.navigateToProductsScreen(item)}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <View style={{width: 50, height: 50, borderRadius: 25, overflow: 'hidden'}}>
                        <Image style={{resizeMode: 'stretch', width: 50, height: 50}}
                               source={{uri: Services.getProductCategoryImageDownloadUrl(item.image)}}/>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={{fontFamily: 'IRANSansMobileFaNum-Bold'}}>{item.type}</Text>
                </View>

            </TouchableOpacity>
        )
    };

    render() {
        const {locale} = this.props;
        const {categoryList, masterCategories} = this.state;
        return (
            <BaseScreen navigation={this.props.navigation}>
                {masterCategories &&
                <View style={styles.categoryListContainer}>
                    <FlatList
                        ref="masterCategoryFlatList"
                        onContentSizeChange={() => this.refs.masterCategoryFlatList.scrollToEnd()}
                        data={masterCategories}
                        horizontal={true}
                        renderItem={this.renderMasterCategoryItem}
                        inverted={true}/>
                </View>
                }
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.isLoading}
                        textContent={i18n('General.loading', locale)}
                        textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                        overlayColor={'#000000dd'}
                    />
                    <FlatList
                        ref="categoryFlatList"
                        onContentSizeChange={() => this.refs.categoryFlatList.scrollToEnd()}
                        data={categoryList}
                        renderItem={this.renderCategoryItem}/>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(252,251,245,1)'
    },
    masterCategoryItemContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    categoryItemContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    categoryListContainer: {
        backgroundColor: '#13213c',
        alignItems: 'flex-end',
        width: '100%'
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCategoryScreen)
