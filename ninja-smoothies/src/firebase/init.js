import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD5HUg_agqAagzNmtDPu6aRWDBjcg9tfs8",
    authDomain: "ninja-smoothies-61158.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-61158.firebaseio.com",
    projectId: "ninja-smoothies-61158",
    storageBucket: "ninja-smoothies-61158.appspot.com",
    messagingSenderId: "644910738133"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore();