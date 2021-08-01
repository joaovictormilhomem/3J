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
let p13Stock;
let waterStock;

var db = firebase.firestore();

    // Firebase functions

function startLookingForChanges() {
    let handleListenerRequests = db.collection('requests').onSnapshot((collection) => {
        requestList = collection.docs;
    })

    let handleListenerStock = db.collection('stock').onSnapshot((collection) => {
        collection.docs.forEach(item => {
            if (item.id === 'water')
                waterStock = item.data().number;
            else //if (item.id === 'p13')
                p13Stock = item.data().number;
        });
        p13Stock
    })
}

function createRequest(customer, address, items) {
    let now = new Date().valueOf();
    db.collection('requests').add({
        customer: customer,
        address: address,
        items: items,
        status: 'waiting',
        startTime: now
    }).then((doc)=>{
    }).catch(err=>{
        console.log(err);
    })
}

function deleteRequest(id, collection) {
    let now = new Date().valueOf();
    db.collection(collection).doc(id).update({
        status: "deleted",
        //controller: auth.currentUser.email,
        EndValidationTime: now
    }).then(() => {
    }).catch(error => {
        console.log(error);
    })
}

function startRequest(id, collection) {
    let now = new Date().valueOf();
    db.collection(collection).doc(id).update({
        status: "started",
        //initiator: auth.currentUser.email,
        deliveryStartTime: now
    }).then(() => {
    }).catch(error => {
        console.log(error);
    })
}

function finishRequest(id, collection) {
    let now = new Date().valueOf();
    db.collection(collection).doc(id).update({
        status: "finished",
        //initiator: auth.currentUser.email,
        deliveryStartTime: now
    }).then(() => {
    }).catch(error => {
        console.log(error);
    })
}

function createClient(name, address, birthday, phone) {
    let now = new Date().valueOf();
    db.collection('clients').add({
        name: name,
        address: address,
        birthday: birthday,
        phone: phone,
        status: 'active',
        startTime: now
    }).then((doc)=>{
    }).catch(err=>{
        console.log(err);
    })
}

function deleteClient(id, collection) {
    let now = new Date().valueOf();
    db.collection(collection).doc(id).update({
        status: 'deleted',
        //controller: auth.currentUser.email,
        deleteTime: now
    }).then(() => {
    }).catch(error => {
        console.log(error);
    })
}

function updateStockValue(item, value) {
    db.collection('stock').doc(item).update({
        number: value
    }).then(() => {
    }).catch(error => {
        console.log(error);
    })
}

    // Logic functions

function wasNotDeletedOrFinished(request) { 
    return request.data().status !== 'deleted' && request.data().status !== 'finished'
}

function isFilled(values) {
    filled = true;
    values.forEach(value => {
        if (value === '' || value === null || value === undefined){
            filled = false;
        }
    });
    return filled;
}

/* function startRequest(id, collection) {
    let now = new Date().valueOf();
    db.collection(collection).doc(id).update({
        status: "started",
        //entregador: auth.currentUser.email,
        deliveryStartTime: now
    }).then(() => {
    }).catch(error => {
        console.log(error);
    })
}

let auth = firebase.auth();

let defectList           = [];
let defectListCopy       = [];
let installationList     = [];
let installationListCopy = [];
let combinedList         = [];
let combinedListCopy     = [];

let op1 = null;
let op2 = null;

let loginIsDone = false;
let checkLogin = setInterval(() => inicializateLoginIsDone(), 500);
let appMetaData = null;

function getAppMetadata() {
    db.collection('metadata').doc('appData').onSnapshot((data) => {
        appMetaData = data.data();
    })
}

function isRequestValidated(id, op) {
    return new Promise(resolve => {
        db.collection(op).doc(id).get().then((request) => {
            resolve(request.data().Status);
        })
    })
    
}

function inicializateLoginIsDone() {
    if (auth.currentUser) {
        if (auth.currentUser.email !== null) {
            loginIsDone = true;
        }
        clearInterval(checkLogin);
    }
}

function login(email,password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            inicializateLoginIsDone();
        })
        .catch((error) => {
            console.log(error);
            loginIsDone = false;
        });
}

function logout() {
    auth.signOut()
        .then(() => {
           loginIsDone = false;
        })
        .catch(error => {
            console.log(error);
        })
}

*/