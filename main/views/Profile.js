import React from 'react';
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Avatar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../RootNavigation';

class Profile extends React.Component {
  state = {
    myUser: null,
    data_user: []
  }

  componentDidMount() {
    auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({myUser : user})
        }
      })

      database() //mengambil data dari realtime database berdasarkan referensi uid user yang sedang login
      .ref(`/users/${auth().currentUser.uid}`)
      .once('value')
      .then(snapshot => {
        //console.log('User data: ', snapshot.val())
        this.setState({data_user : snapshot.val()})
      })
  }

  LogOut() {
    auth()
      .signOut()
      .then(() => ToastAndroid.show('You have successfully signed out!', ToastAndroid.SHORT))
  }
  
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Image 
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                size={100}
                />
            </View>
            <View style={styles.profilHeaderInformation}>
              <Text style={styles.profilHeaderName}>{this.state.data_user.name}</Text>
              <Text style={styles.profilHeaderInfoText}>{this.state.data_user.email}</Text>
              <Text style={styles.profilHeaderInfoText}>{this.state.data_user.phonenumber}</Text>
            </View>
          </View>
        </View>
        <View style={styles.profileContent}>
        <TouchableOpacity style={styles.profileContentMenu}>
            <Text style={{fontSize: 18}}>Settings</Text>
          </TouchableOpacity>
          {/* <View
              style={{
                borderBottomColor: '#487db4',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10
              }}
            /> */}
          <TouchableOpacity style={styles.profileContentMenu} onPress={this.LogOut.bind(this)}>
            <Text style={{fontSize: 18}}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 22,
    marginHorizontal: 10,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#487db4'
  },
  profileHeaderContent:{
    flexDirection: 'row',
    marginHorizontal: 5
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profilHeaderName: {
    fontSize: 18, 
    color: '#487db4', 
    fontWeight: 'bold',
    marginBottom: 4
  },
  profilHeaderInformation: {
    marginLeft: 14,
    justifyContent: 'center',
  },
  profilHeaderInfoText: {
    fontSize: 14, 
    marginTop: 2
  },
  profileContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding: 20
  },
  profileContentMenu: {
    padding: 14,
    marginVertical: 6,
    backgroundColor: 'lightgrey',
    borderRadius: 10
  }
})

export default Profile;
