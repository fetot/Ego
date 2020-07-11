import React from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import styles from '../styles/AndroidHome.style';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../RootNavigation';
import {getOffer} from '../api/OffersApi';

class Home extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      image : null,
      offerList: [],
      refreshing: false
    }
  }

  // onOfferAdded = (offer) => {
  //   ToastAndroid.show('Offer Added!', ToastAndroid.SHORT)
  //   console.log("Offer Added!");
  //   console.log(offer);
  //   this.inputTitle.clear();
  //   this.inputLocation.clear();
  //   this.inputDesc.clear();
  // }

  onOffersReceived = (offerList) => {
    console.log(offerList);
    this.setState(prevState => ({
      offerList: prevState.offerList = offerList,
    })
    // ,this.setState({refreshing:false})
    );
  }

  retrieveImages = async () => {
    const url = await storage()
      .ref('offers/tesla.jpg')
      .getDownloadURL();
    this.setState({image : url})
  }

  componentDidMount() {
    getOffer(this.onOffersReceived);
    this.retrieveImages()
  }

  // handleRefresh = ()=> {
  //   this.setState({
  //     refreshing: true,
  //   }, ()=> {this.onOffersReceived})
  // }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.searchContainer}>
        <Icon style={styles.searchIcon} name="ios-search" size={24}/>
        <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(searchString) => {this.setState({searchString})}}
            underlineColorAndroid="transparent"
        />
        </View>
        <FlatList
        numColumns={2}
        data={this.state.offerList}
        renderItem={({ item }) => (
          <View style={styles.adsContainer}>
            <TouchableOpacity
                onPress={() => RootNavigation.navigate('OfferDetail', {
                image : this.state.image})}>
            <View>
                <Image style={styles.adsImage} source={{uri: this.state.image}}/>
              </View>
            <Text style={styles.adsTitle}>{item.offertype}</Text>
            <Text style={styles.adsCaption}>{item.title}</Text>
            <Text style={styles.adsLocation}>
              <Icon name="ios-pin" color="#487db4" size={14} /> {item.location}
            </Text>
            </TouchableOpacity>
          </View> 
        )}
        // refreshing={this.state.refreshing}
        keyExtractor={item => item.id}
        // onRefresh={this.handleRefresh}
          />

        
      </View>
    ); 
  }
}

export default Home;
