import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from '../styles/Android.style';
import Icon from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';

class MyOffers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      image : null
    }
  }

  retrieveImages = async () => {
    const url = await storage()
      .ref('offers/tesla.jpg')
      .getDownloadURL();
    this.setState({image : url})
  }

  componentDidMount() {
    this.retrieveImages()
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <View style={styles.myCatalogCont}>
          <View>
            <Image source={{uri: this.state.image}} style={styles.myCatalogImg} />
          </View>
          <View style={styles.myCatalogDesc}>
            <Text style={styles.myCatalogTitle}>BARTER</Text>
            <Text style={styles.myCatalogTDesc}>2019 Tesla Model S</Text>
            <Text style={styles.myCatalogTime}>29 Days left</Text>
          </View>
          <View style={styles.myCatalogCrud}>
            <TouchableOpacity style={styles.myCatalogMl}>
              <Icon name='ios-trash' color='#707070' size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.myCatalogMl}>
              <Icon name='ios-create' color='#707070' size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.myCatalogContInactive}>
          <View>
            <Image source={{uri: this.state.image}} style={styles.myCatalogImg} />
          </View>
          <View style={styles.myCatalogDesc}>
            <Text style={styles.myCatalogTitle}>BARTER</Text>
            <Text style={styles.myCatalogTDesc}>2019 Tesla Model S</Text>
          </View>
          <View style={styles.myCatalogCrud}>
            <TouchableOpacity style={styles.myCatalogMl}>
              <Icon name='ios-trash' color='#707070' size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default MyOffers;
