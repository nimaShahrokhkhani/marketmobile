import * as React from 'react';
import {View , Button, Text} from 'react-native';


export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    navigateToProductScreen = () => {
        this.props.navigation.navigate('ProductScreen')
    }

    render() {
        return (
            <View>

                <Text>helo world</Text>
                <Button
                    title="helloman"
                    onPress={this.navigateToProductScreen}
                />

            </View>
        );
    }

}