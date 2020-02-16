import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4UYZmAfk8vgg3jFE1gy_L2yY0wfKIDDw",
  authDomain: "naramel.firebaseapp.com",
  databaseURL: "https://naramel.firebaseio.com",
  projectId: "naramel",
  storageBucket: "naramel.appspot.com",
  messagingSenderId: "27048051909",
  appId: "1:27048051909:web:712eb506982f015929dcac",
  measurementId: "G-KM3VXDVXSP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const authGoogleProvider = new firebase.auth.GoogleAuthProvider();
export const authFacebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;
