import {
    StyleSheet
  } from 'react-native';
  
  export default StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
    },
    adsContainer: {
      height: 270,
      width: 180,
      borderRadius: 8,
      marginHorizontal: 4,
      padding: 10,
      backgroundColor: '#fff',
      marginTop: 10,
      marginBottom: 15
    },
    adsImage: {
      width: '100%',
      height: 160
    },
    adsTitle: {
      fontWeight: 'bold',
      color: '#487db4',
      textTransform: 'uppercase',
      marginTop: 4
    },
    adsCaption: {
      height: 44
    },
    adsLocation: {
      marginTop: 6,
      color: 'grey',
      textTransform: 'uppercase',
      fontSize: 12
    },
    searchContainer: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: 'lightgrey'
    },
    searchIcon: {
      padding: 10,
      color: '#487db4',
      marginLeft: 10
    },
    searchInput: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
      fontSize: 16
    },

})