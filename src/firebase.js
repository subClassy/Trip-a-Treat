import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCBUxKVXjvs-FsmjmxgVQUdTjHFMvGpVYI",
    authDomain: "trip-a-treat.firebaseapp.com",
    databaseURL: "https://trip-a-treat.firebaseio.com",
    projectId: "trip-a-treat",
    storageBucket: "",
    messagingSenderId: "978102614454"
};

export const firebaseApp = firebase.initializeApp(config);
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();