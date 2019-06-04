import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-4gsDgXcZ0L_q-Ot371y7KD6PwHiDkxw",
    authDomain: "geo-ninjas-be9ad.firebaseapp.com",
    databaseURL: "https://geo-ninjas-be9ad.firebaseio.com",
    projectId: "geo-ninjas-be9ad",
    storageBucket: "geo-ninjas-be9ad.appspot.com",
    messagingSenderId: "685078690078"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore();
