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

let requestList = [];
let requestListCopy = [];

var db = firebase.firestore();

function startLookingForChanges() {
    let handleListenerRequests = db.collection('requests').onSnapshot((collection) => {
        requestList = collection.docs;
    })
}

function createRequestOnServer(customer, address, items) {
    db.collection('requests').add({
        customer: customer,
        address: address,
        items: items,
        status: 'waiting'
    }).then((doc)=>{
        console.log('request created');
    }).catch(err=>{
        console.log(err);
    })
}

startLookingForChanges();
//createRequest('clientes/NgqQPMvE5BzcbGYk5OlJ', 'Bairro São João, Rua Rodoviario, N° 1276. Próximo ao centro comunitário.', {agua: 1, p13: 1})