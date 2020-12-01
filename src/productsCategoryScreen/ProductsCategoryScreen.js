import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList, Platform} from 'react-native';
import {i18n} from '../utils/i18n/I18n'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import BaseScreen from "../baseScreen/BaseScreen";
import Carousel from 'react-native-snap-carousel';
import Services from "../utils/services/Services";

class ProductsCategoryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
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

    componentDidMount() {
        this.props.navigation.setParams({
            locale: this.props.locale
        });
        this.getCategoryList();
    }

    navigateToProductsScreen = (item) => {
        this.props.navigation.navigate('ProductScreen', {category: item})
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
        const {categoryList} = this.state;
        return (
            <BaseScreen navigation={this.props.navigation}>
                <View style={styles.container}>
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
