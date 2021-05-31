var firebaseConfig = {
    apiKey: "AIzaSyDq48j5uf5OWCChZp8WfsEs5-41mc7HHY4",
    authDomain: "jgas-94bed.firebaseapp.com",
    projectId: "jgas-94bed",
    storageBucket: "jgas-94bed.appspot.com",
    messagingSenderId: "606477017238",
    appId: "1:606477017238:web:7c7d54667db0fe146ce2b7",
    measurementId: "G-2STVC1E1DG"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();