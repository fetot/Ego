import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';
//import styles from '../styles/Android.style';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../RootNavigation';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

class SignUp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  SignUpAuth() {
    if (this.state.email != ''){
        if (this.state.password != ''){
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        RootNavigation.navigate('SignUpInfo')
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('That email address is not valid!', ToastAndroid.SHORT)
        } 
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT)
        }
      })
    }else{ToastAndroid.show('Password cannot be empty!', ToastAndroid.SHORT)}
}else{ToastAndroid.show('Email cannot be empty!', ToastAndroid.SHORT)}
  }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#487db4' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Email</Text>
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
                    ref={(input) => this.inputEmail = input}
                    autoCapitalize="none"
                    returnKeyType='next'
                    onSubmitEditing={() => this.inputPassword.focus()}
                    keyboardType='email-address'
                    onChangeText={(value) => this.setState({email : value})}
                />
            </View>

            <Text style={[styles.text_footer, {
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
                    onSubmitEditing={this.SignUpAuth.bind(this)}
                    onChangeText={(value) => this.setState({password : value})}
                />
            </View>

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={this.SignUpAuth.bind(this)}
                >
                <LinearGradient
                    colors={['#487db4', '#6c9bcc']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => RootNavigation.navigate('Login')}
                    style={[styles.signIn, {
                        borderColor: '#487db4',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#487db4'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

export default SignUp;

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
      flex: Platform.OS === 'ios' ? 3 : 5,
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
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
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
  },
  textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
  },
  color_textPrivate: {
      color: 'grey'
  }
});

