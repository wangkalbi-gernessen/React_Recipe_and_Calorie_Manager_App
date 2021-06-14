import firebase from 'firebase';

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
// firebase.analytics();
export default firebase;