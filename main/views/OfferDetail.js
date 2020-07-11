import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

class CatalogDetail extends React.Component {
  state = {
    nama: 'Ferdy Hasan',
  }
  render() {
    const { route } = this.props;
    const { image } = route.params;
    return (
      <View style={{flex: 1}}>
        <Image source={{uri: image}} style={styles.detailImage} />
        <View style={styles.detailInfo}>
          <View style={styles.infoPenjual}>
            <View style={styles.penjualAvatar}>
            <Avatar.Image 
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                size={60}
                />
            </View>
            <Text style={styles.namaPenjual}>{this.state.nama}</Text>
          </View>
        </View>
        <View style={styles.descCont}>
          <Text style={styles.adsType}>Barter</Text>
          <Text style={styles.adsTitle}>2019 Tesla Model S, mantap, langka</Text>
          <View
              style={{
                borderBottomColor: '#487db4',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10
              }}/>
            <Text style={styles.adsDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet bibendum odio, 
              sit amet eleifend ex. Nulla facilisi. Nunc diam arcu, finibus vitae erat vel, lacinia sollicitudin arcu. 
              Vivamus finibus lacinia feugiat. Duis et nisl dapibus neque tempor consectetur vitae et quam. 
              </Text>
              <View
              style={{
                borderBottomColor: '#487db4',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10
              }}/>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#487db4'}}>Location</Text>
              <Text style={styles.adsLocation}>
                <Icon name="ios-pin" color="#487db4" size={14} /> Medan Kota
              </Text>
          <TouchableOpacity style={{alignItems: 'flex-end', bottom: 30, position: 'absolute', right: 40}}>
              <View style={styles.callCircle}>
                <Icon name='ios-call' color='#FFFFFF' size={30} />
              </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailImage: {
    width: '100%',
    height: 200
  },
  callCircle: {
    height: 60,
    width: 60,
    backgroundColor: '#487db4',
    borderRadius: 100,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailInfo: {
    marginTop: -20,
    backgroundColor: '#487db4',
    padding: 10,
    marginHorizontal: 40,
    flexDirection: 'row',
    borderRadius: 22,
    elevation: 5
  },
  detailCall: {
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  infoPenjualCont: {
    marginHorizontal: 30,
    marginTop: 20
  },
  penjualAvatar: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 8
  },
  namaPenjual: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15
  },
  infoPenjual: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  descCont: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 40,
    marginTop: 20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    flex: 1
  },
  adsType: {
    fontWeight: 'bold',
    color: '#487db4',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontSize: 18
  },
  adsTitle: {
    fontSize: 14
  },
  adsDesc: {
    textAlign: 'justify'
  },
  adsLocation: {
    marginTop: 6,
    textTransform: 'uppercase',
  },
});

export default function(props) {
  const route = useRoute();

  return <CatalogDetail {...props} route={route} />;
}
