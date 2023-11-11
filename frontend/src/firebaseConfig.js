import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC4_ypGTSrNEKsLhwAXtWUSczTgiUpQJe4",
  authDomain: "gpt-marketplace.firebaseapp.com",
  projectId: "gpt-marketplace",
  storageBucket: "gpt-marketplace.appspot.com",
  messagingSenderId: "1088481733237",
  appId: "1:1088481733237:web:01bee6107ce2d5bc31263c",
  measurementId: "G-WF10QRQ4R8"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export {firebase, auth};
export default firebase;
