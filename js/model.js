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
let atualCash = {};
let day;

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

    let handleListenerCash = db.collection('cash').onSnapshot((collection) => {
        collection.docs.forEach(item => {
            if (item.id === day) {
                atualCash.inCash = item.data().cashValue;
                atualCash.forward = item.data().forwardValue;
                atualCash.total = atualCash.inCash + atualCash.forward;
            }
        })
    })
}

function createRequest(customer, address, items, value) {
    let now = new Date().valueOf();
    db.collection('requests').add({
        customer: customer,
        address: address,
        items: items,
        status: 'waiting',
        startTime: now,
        value: value
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

function updateCashValue(cashValue, forwardValue) {
    console.log(day, cashValue, forwardValue);
    db.collection('cash').doc(day).set({
        cashValue: cashValue,
        forwardValue: forwardValue
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

function getCurrentDate() {
    let day = new Date;
    return (day.getDay()+1) + '-' + (day.getMonth()+1) + '-' + day.getFullYear();
}