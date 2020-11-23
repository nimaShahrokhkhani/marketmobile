import * as React from 'react';
import {View, Text, SafeAreaView, Button, Image, StyleSheet} from 'react-native';


export class ProductScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Products',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../images/notif-icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
