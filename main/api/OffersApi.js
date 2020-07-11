import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/storage';

export function makeOffer(offer, makeComplete){
    firestore()
        .collection('Offers')
        .add({
            offertype: offer.offertype,
            kategori: offer.kategori,
            title: offer.title,
            description: offer.description,
            location: offer.location,
            ownerUID: offer.ownerUID,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then((snapshot) => snapshot.get()
          ).then((offerData) => makeComplete(offerData.data()))
          .catch((error) => console.log(error));
}

export async function getOffer(offersRetrieved){


    var offerList = [];
    
    var snapshot = await firebase.firestore()
    .collection('Offers')
    .orderBy('createdAt', 'desc')
    .get()

    snapshot.forEach((doc) => {
        offerList.push(doc.data())
    });

    console.log(offerList);

    offersRetrieved(offerList);
}