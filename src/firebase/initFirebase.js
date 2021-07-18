import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
  // apiKey: "",
  apiKey: "AIzaSyApfm-ZbIXBn9II4XyZPHIUakcllOz_b4Q",
  authDomain: "auth.recipe-and-calorie-manager.com",
  databaseURL: "https://recipe-and-calorie-default-rtdb.firebaseio.com",
  projectId: "recipe-and-calorie",
  storageBucket: "recipe-and-calorie.appspot.com",
  messagingSenderId: "989041596134",
  appId: "1:989041596134:web:2367f0d4e08188ee00cd27",
  measurementId: "G-7WMEY1Q0VG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
export {auth, provider, db};