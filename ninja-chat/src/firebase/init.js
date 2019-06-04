import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBgfAdiYgkvyPlbNZnsLYUeUE4ZVipJbLA",
    authDomain: "ninja-chat-54fd8.firebaseapp.com",
    databaseURL: "https://ninja-chat-54fd8.firebaseio.com",
    projectId: "ninja-chat-54fd8",
    storageBucket: "ninja-chat-54fd8.appspot.com",
    messagingSenderId: "985968527557"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()