import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ToastAndroid
} from 'react-native';
import styles from '../styles/Android.style';
import CameraRoll from "@react-native-community/cameraroll";
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {makeOffer} from '../api/OffersApi';
import auth from '@react-native-firebase/auth';
import {onOffersReceived} from './Home'

class MakeOffer extends React.Component {

  state = {
    offerList: [],
    ownerUID: '',
    title: '',
    description: '',
    location: '',
    offertype: '',
    kategori: '',
    photos: [],
    modalVisible: false,
    CRollHW: Dimensions.get('window').width / 3,
    selected_image: null
  }

  onOfferAdded = (offer) => {
    ToastAndroid.show('Offer Added!', ToastAndroid.SHORT)
    console.log("Offer Added!");
    
    this.inputTitle.clear();
    this.inputLocation.clear();
    this.inputDesc.clear();
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  cameraRollInit = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    })
    .then(r => {
      this.setState({photos : r.edges});
    })
    .catch((err) => {
      // Error
    });
  }

  selectImage(p) {
    this.setState({selected_image : p.node.image.uri})
  }

  componentDidMount() {
    this.cameraRollInit();

    auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({ownerUID : user})
        }
      })
  }

  render() {
    const {modalVisible} = this.state;
    return (
      <KeyboardAvoidingView style={styles.makeOfferContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.makeOfferScrollContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.acText}>Add photos</Text>
              <View style={styles.acAddImgCont}>
                <TouchableOpacity
                  style={styles.acAddBox}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <Icon name='ios-image' color='#487db4' size={42} />
                </TouchableOpacity>
                {/*  */}
                <Modal
                  animationType='fade'
                  transparent={true}
                  onRequestClose={() => {this.setModalVisible(false)}}
                  visible={modalVisible}
                >
                  <View style={styles.centeredModal}>
                    <View style={styles.modalView}>
                      <ScrollView>
                        <View style={styles.photosCont}>
                          {this.state.photos.map((p, i) => {
                            return (
                              <TouchableOpacity key={i} onPress={() => this.selectImage(p)}>
                                <Image
                                  style={{width: this.state.CRollHW, height: this.state.CRollHW}}
                                  source={{uri: p.node.image.uri}}
                                />
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                {/*  */}
                <View style={styles.acImgBox}>
                  {
                    this.state.selected_image ? <Image source={{uri: this.state.selected_image}} style={{height: 100, width: 100, borderRadius: 5, resizeMode: 'contain'}} /> : null
                  }
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.acText}>Offer types</Text>
              <View style={styles.kategoriPicker}>
                <Picker
                  selectedValue={this.state.offertype}
                  onValueChange={(itemValue, itemIndex) => 
                    this.setState({offertype : itemValue})
                  }>
                  <Picker.Item label='Please select type' value='' />
                  <Picker.Item label='Barter' value='Barter' />
                  <Picker.Item label='Trade-ins' value='Trade-ins' />
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.acText}>Choose category</Text>
              <View style={styles.kategoriPicker}>
                <Picker
                  selectedValue={this.state.kategori}
                  onValueChange={(itemValue, itemIndex) => 
                    this.setState({kategori : itemValue})
                  }>
                  <Picker.Item label='Please select category' value='' />
                  <Picker.Item label='Vehicle' value='Vehicle' />
                  <Picker.Item label='Electronic and Gadget' value='Electronic and Gadget' />
                  <Picker.Item label='Fashion' value='Fashion' />
                  <Picker.Item label='Hobby and Sport' value='Hobby and Sport' />
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.acText}>Title</Text>
              <TextInput 
                style={styles.priceInput} 
                placeholder='Your title' 
                onChangeText={(value) => this.setState({title : value})}
                ref={(input) => this.inputTitle = input}
                maxLength={45}
                />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.acText}>Location</Text>
              <TextInput style={styles.priceInput} ref={(input) => this.inputLocation = input} placeholder='Your location' onChangeText={(value) => this.setState({location : value})}></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.acText}>Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={styles.descriptionInput}
                placeholder="Describe what you're offering"
                onChangeText={(value) => this.setState({description : value})}
                ref={(input) => this.inputDesc = input}
              />
            </View>
            <TouchableOpacity
                    style={styles.makeOfferButton}
                    onPress={() =>
                      makeOffer(
                        {
                          offertype: this.state.offertype,
                          kategori: this.state.kategori,
                          title: this.state.title,
                          location: this.state.location,
                          description: this.state.description,
                          ownerUID: this.state.ownerUID && this.state.ownerUID.uid,
                        },
                        this.onOfferAdded,
                      )
                    }
                    
                >
                <LinearGradient
                    colors={['#487db4', '#6c9bcc']}
                    style={styles.makeOfferButton}
                >
                    <Text style={[styles.makeOfferButtonText, {
                        color:'#fff'
                    }]}>Make Offer!</Text>
                </LinearGradient>
                </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default MakeOffer;

