// Import the functions you need from the SDKs you need
// import firebase from 'firebase'
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqQCRHtRFhyLa9ZRKxjdy8qoc8vW2Lth4",
    authDomain: "music-b7ee5.firebaseapp.com",
    projectId: "music-b7ee5",
    storageBucket: "music-b7ee5.appspot.com",
    messagingSenderId: "764706411942",
    appId: "1:764706411942:web:eba4a609343260ce202b67"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const songsCollection = db.collection('songs')
const commentCollection = db.collection('comments');

export {
    auth,
    storage,
    songsCollection,
    commentCollection,
}