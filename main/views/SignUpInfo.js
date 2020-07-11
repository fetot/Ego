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
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import * as RootNavigation from '../RootNavigation';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

class SignUpInfo extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          userid: auth().currentUser.uid,
          firstname: '',
          lastname: '',
          phonenumber: ''
        }
      }
    
      SignUpAuthFinal() {
        if (this.state.firstname != '' && this.state.lastname != '' && this.state.phonenumber != ''){
        database()
          .ref(`/users/${auth().currentUser.uid}`)
          .set({
            uid: this.state.userid,
            name: this.state.firstname + ' ' + this.state.lastname,
            email: auth().currentUser.email,
            phonenumber: this.state.phonenumber
          })
          .then(() => {
            RootNavigation.navigate('Home')
          })
        }else{ToastAndroid.show('Information cannot be empty!', ToastAndroid.SHORT)}
      }

  render() {
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#487db4' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Almost there!</Text>
            <Text style={styles.text_header2}>Fill your information below</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>First Name</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Your First Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#000'
                    }]}
                    ref={(input) => this.inputFirstName = input}
                    autoCapitalize="words"
                    returnKeyType='next'
                    onSubmitEditing={() => this.inputLastName.focus()}
                    onChangeText={(value) => this.setState({firstname : value})}
                />
            </View>

            <Text style={styles.text_footer}>Last Name</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Your Last Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#000'
                    }]}
                    ref={(input) => this.inputLastName = input}
                    autoCapitalize="words"
                    returnKeyType='next'
                    onSubmitEditing={() => this.inputPhone.focus()}
                    onChangeText={(value) => this.setState({lastname : value})}
                />
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Phone Number</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Your Phone Number"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#000'
                    }]}
                    ref={(input) => this.inputPhone = input}
                    keyboardType='number-pad'
                    defaultValue='+62'
                    maxLength={13}
                    onSubmitEditing={this.SignUpAuthFinal.bind(this)}
                    onChangeText={(value) => this.setState({phonenumber : value})}
                />
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={this.SignUpAuthFinal.bind(this)}
                >
                <LinearGradient
                    colors={['#487db4', '#6c9bcc']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Finish</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

export default SignUpInfo;

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
      fontSize: 26
  },
  text_header2: {
    color: '#fff',
    fontSize: 20,
    marginTop: 4
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

