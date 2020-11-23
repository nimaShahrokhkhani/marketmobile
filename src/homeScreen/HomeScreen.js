import * as React from 'react';
import {View, Button, Text, Image, StyleSheet, SafeAreaView} from 'react-native';


export class HomeScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Home',
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

    navigateToProductScreen = () => {
        this.props.navigation.navigate('ProductScreen')
    };

    render() {
        return (
            <SafeAreaView>
                <View>

                    <Text>helo world</Text>
                    <Button
                        title="productsScreen"
                        onPress={this.navigateToProductScreen}
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
