import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';


export class ProductDetailsScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: () => null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>product detail</Text>
                </View>
            </SafeAreaView>

        );
    }

}
