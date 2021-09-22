import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

//momin.shahzad@techverx.com
// const config = {
//   apiKey: 'AIzaSyCvNkAJ6Cmb7PkUdstp64vDnZ32GyMdj7c',
//   authDomain: 'crwn-db-8c510.firebaseapp.com',
//   projectId: 'crwn-db-8c510',
//   storageBucket: 'crwn-db-8c510.appspot.com',
//   messagingSenderId: '254929042514',
//   appId: '1:254929042514:web:4284637ce11e595b7df38b',
//   measurementId: 'G-Z4GP59M8RZ'
// };


//mominshahzad106@gmail.com
const config = {
  apiKey: "AIzaSyDX4gCOYaDXfdRz4s2VpgDr8zT9ddqZMnA",
  authDomain: "crwn-db-98171.firebaseapp.com",
  projectId: "crwn-db-98171",
  storageBucket: "crwn-db-98171.appspot.com",
  messagingSenderId: "486221296505",
  appId: "1:486221296505:web:21e20feb1fa38cf5fcb5a8",
  measurementId: "G-N8HXMRYMPG"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection ) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator; 
  },{});

}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
