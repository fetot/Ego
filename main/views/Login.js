import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  StyleSheet,
  StatusBar
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../RootNavigation';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  LoginAuth() {
    if (this.state.email != ''){
        if (this.state.password != ''){
        auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        RootNavigation.navigate('Home')
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Invalid login credentials, try again!', ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('Invalid login credentials, try again!', ToastAndroid.SHORT)
        }
      })
        }else{ToastAndroid.show('Password cannot be empty!', ToastAndroid.SHORT)}
    }else{ToastAndroid.show('Email cannot be empty!', ToastAndroid.SHORT)}
  }

  render() {
    return(
<View style={styles.container}>
          <StatusBar backgroundColor='#487db4' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome to ego!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: '#fff'
            }]}
        >
            <Text style={[styles.text_footer, {
                color: '#000'
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="envelope-o"
                    color="#487db4"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#000'
                    }]}
                    autoCapitalize="none"
                    returnKeyType='next'
                    onSubmitEditing={() => this.inputPassword.focus()}
                    keyboardType='email-address'
                    onChangeText={(value) => this.setState({email : value})}
                />
            </View>

            <Text style={[styles.text_footer, {
                color: '#000',
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#487db4"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry
                    style={[styles.textInput, {
                        color: '#000'
                    }]}
                    autoCapitalize="none"
                    returnKeyType='go'
                    ref={(input) => this.inputPassword = input}
                    onSubmitEditing={this.LoginAuth.bind(this)}
                    onChangeText={(value) => this.setState({password : value})}
                />
            </View>

            <TouchableOpacity>
                <Text style={{color: '#487db4', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={this.LoginAuth.bind(this)}
                >
                <LinearGradient
                    colors={['#487db4', '#6c9bcc']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => RootNavigation.navigate('SignUp')}
                    style={[styles.signIn, {
                        borderColor: '#487db4',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#487db4'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#487db4'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

export default Login;
