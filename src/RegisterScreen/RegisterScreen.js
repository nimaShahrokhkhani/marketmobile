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
    KeyboardAvoidingView
} from 'react-native';
import {i18n} from "../utils/i18n/I18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as localeActions from '../utils/redux/actions/changeLocale';
import Services from "../utils/services/Services";
import CheckBox from '@react-native-community/checkbox';
import * as userActions from "../utils/redux/actions/userLogin";
import {showMessage} from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            birthday: '',
            isUsernameFocused: false,
            isPasswordFocused: false,
            isEmailFocused: false,
            isPhoneNumberFocused: false,
            isBirthdayFocused: false,
            spinner: false
        }
    }

    componentDidMount() {

    }

    hideLoading = () => {
        this.setState({spinner: false})
    };

    signUp = () => {
        let {user, actions, locale} = this.props;
        let {username, password, email, phoneNumber, birthday} = this.state;
        this.setState({spinner: true}, () => {
            const data = new FormData();
            data.append('username', username);
            data.append('password', password);
            data.append('email', email);
            data.append('phoneNumber', phoneNumber);
            data.append('birthday', birthday);
            Services.insertUser(data).then((response) => {
                this.hideLoading();
                showMessage({
                    message: i18n('Register.userRegisterSuccessAlertTitle', locale),
                    description: i18n('Register.userRegisterSuccessAlertMessage', locale),
                    type: "success",
                    style: {textAlign: 'right',  width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: { icon: "success", position: "right" }
                });
                actions.userLogin({
                    username,
                    password,
                    email,
                    phoneNumber,
                    birthday
                });
                this.props.navigation.goBack(null)
            }).catch((error) => {
                console.log(error);
                this.hideLoading();
                showMessage({
                    message: i18n('Register.userRegisterSuccessAlertTitle', locale),
                    description: i18n('Register.userRegisterErrorAlertMessage', locale),
                    type: "success",
                    style: {textAlign: 'right',  width: '100%', justifyContent: 'flex-end'},
                    titleStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Bold'},
                    textStyle: {textAlign: 'right', fontFamily: 'IRANSansMobileFaNum-Light',},
                    icon: { icon: "success", position: "right" }
                });
            });
        })
    };

    onUsernameTextChange = (text) => {
        this.setState({
            username: text
        })
    };

    onPasswordTextChange = (text) => {
        this.setState({
            password: text
        })
    };

    onEmailTextChange = (text) => {
        this.setState({
            email: text
        })
    };

    onPhoneNumberTextChange = (text) => {
        this.setState({
            phoneNumber: text
        })
    };

    onBirthdayTextChange = (text) => {
        this.setState({
            birthday: text
        })
    };

    onUsernameFocus = () => {
        this.setState({
            isUsernameFocused: true
        })
    };

    onPasswordFocus = () => {
        this.setState({
            isPasswordFocused: true
        })
    };

    onEmailFocus = () => {
        this.setState({
            isEmailFocused: true
        })
    };

    onPhoneNumberFocus = () => {
        this.setState({
            isPhoneNumberFocused: true
        })
    };

    onBirthdayFocus = () => {
        this.setState({
            isBirthdayFocused: true
        })
    };

    onUsernameBlur = () => {
        this.setState({
            isUsernameFocused: false
        })
    };

    onPasswordBlur = () => {
        this.setState({
            isPasswordFocused: false
        })
    };

    onEmailBlur = () => {
        this.setState({
            isEmailFocused: false
        })
    };

    onPhoneNumberBlur = () => {
        this.setState({
            isPhoneNumberFocused: false
        })
    };

    onBirthdayBlur = () => {
        this.setState({
            isBirthdayFocused: false
        })
    };

    render() {
        const {locale} = this.props;
        let {username, password, isUsernameFocused, isPasswordFocused, email, phoneNumber, birthday, isBirthdayFocused, isPhoneNumberFocused, isEmailFocused} = this.state;
        return (
            <View>
                <StatusBar backgroundColor="#13213c" barStyle="light-content"/>
                <SafeAreaView style={styles.topView}/>
                <SafeAreaView>
                    <View>

                        <Spinner
                            visible={this.state.spinner}
                            textContent={i18n('General.loading', locale)}
                            textStyle={{fontFamily: 'IRANSansMobileFaNum-Bold', color: '#fff'}}
                            overlayColor={'#000000dd'}
                        />
                        <View style={styles.topBar}>
                            <View style={styles.topBarStart}>
                            </View>
                            <View style={styles.topBarEnd}>
                                <Text style={styles.screenTitle}>{i18n('Register.register', locale)}</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}
                                                  style={styles.closeContainer}>
                                    <Image
                                        source={require('../images/close.png')}
                                        style={styles.iconSecondary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={70} enabled={true}
                                              style={{
                                                  height: '100%',
                                              }}>
                            <ScrollView style={styles.container}>

                                <View style={styles.inputContainer}>
                                    <View style={{
                                        borderBottomWidth: 2,
                                        borderBottomColor: isUsernameFocused ? '#0f0' : '#f0f0f0',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextInput onBlur={this.onUsernameBlur}
                                                   onFocus={this.onUsernameFocus}
                                                   style={styles.input} placeholder={i18n('Register.username', locale)}
                                                   value={username} onChangeText={this.onUsernameTextChange}/>
                                        <Image source={require('../images/contact.png')}/>
                                    </View>
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={{
                                        borderBottomWidth: 2,
                                        borderBottomColor: isPasswordFocused ? '#0f0' : '#f0f0f0',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextInput onBlur={this.onPasswordBlur}
                                                   onFocus={this.onPasswordFocus}
                                                   style={styles.input} placeholder={i18n('Register.password', locale)}
                                                   value={password} onChangeText={this.onPasswordTextChange}/>
                                        <Image source={require('../images/password.png')}/>
                                    </View>
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={{
                                        borderBottomWidth: 2,
                                        borderBottomColor: isEmailFocused ? '#0f0' : '#f0f0f0',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextInput onBlur={this.onEmailBlur}
                                                   onFocus={this.onEmailFocus}
                                                   style={styles.input} placeholder={i18n('Register.email', locale)}
                                                   value={email} onChangeText={this.onEmailTextChange}/>
                                        <Image source={require('../images/email.png')}/>
                                    </View>
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={{
                                        borderBottomWidth: 2,
                                        borderBottomColor: isPhoneNumberFocused ? '#0f0' : '#f0f0f0',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextInput onBlur={this.onPhoneNumberBlur}
                                                   onFocus={this.onPhoneNumberFocus}
                                                   style={styles.input} placeholder={i18n('Register.phoneNumber', locale)}
                                                   value={phoneNumber} onChangeText={this.onPhoneNumberTextChange}/>
                                        <Image source={require('../images/phoneNumber.png')}/>
                                    </View>
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={{
                                        borderBottomWidth: 2,
                                        borderBottomColor: isBirthdayFocused ? '#0f0' : '#f0f0f0',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextInput onBlur={this.onBirthdayBlur}
                                                   onFocus={this.onBirthdayFocus}
                                                   style={styles.input} placeholder={i18n('Register.birthday', locale)}
                                                   value={birthday} onChangeText={this.onBirthdayTextChange}/>
                                        <Image source={require('../images/calendar.png')}/>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={this.signUp}
                                    style={{
                                    alignSelf: 'center',
                                    backgroundColor: '#0f0',
                                    width: '80%',
                                    marginTop: 50,
                                    borderRadius: 20,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        fontFamily: 'IRANSansMobileFaNum-Bold'
                                    }}>{i18n('Register.register', locale)}</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </KeyboardAvoidingView>

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
    }
});

const mapStateToProps = state => ({
    locale: state.locale.locale,
    user: state.user.user,
});

const ActionCreators = Object.assign(
    {},
    localeActions,
    userActions
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
