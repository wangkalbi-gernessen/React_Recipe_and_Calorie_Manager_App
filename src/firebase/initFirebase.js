import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7jCzUZ0TXLC6xx305z8KfFvv-QjOl9Ho",
  authDomain: "recipe-and-calorie-manag-d5c04.firebaseapp.com",
  databaseURL: "https://recipe-and-calorie-manag-d5c04-default-rtdb.firebaseio.com",
  projectId: "recipe-and-calorie-manag-d5c04",
  storageBucket: "recipe-and-calorie-manag-d5c04.appspot.com",
  messagingSenderId: "87692265955",
  appId: "1:87692265955:web:0bfd1b4e8b5b00e2ceb8d6",
  measurementId: "G-XE2SFJSEHJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.firestore();
export {auth, provider, database};


// const provider = new firebase.auth.GoogleAuthProvider();
// console.log(provider);
// export const signInWithGoogle = () => {
//   auth.signInWithPopup(provider).then((res) => {
//     console.log(res.user);
//   }).catch((error) => {
//     console.log(error.message);
//   })

// };

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     const { email, name, birthday } = user;
//     try {
//       await userRef.set({
//         name,
//         email,
//         birthday,
//         ...additionalData
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// const getUserDocument = async uid => {
//   if (!uid) return null;
//   try {
//     const userDocument = await firestore.doc(`users/${uid}`).get();

//     return {
//       uid,
//       ...userDocument.data()
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };