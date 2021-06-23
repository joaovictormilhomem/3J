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

startLookingForChanges();

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
} */


/*

 var firebaseConfig = {
    apiKey: "AIzaSyAwifrnD5MbRmfSUgw14oU1CAZATiqTCBE",
    authDomain: "validacaovivo.firebaseapp.com",
    projectId: "validacaovivo",
    storageBucket: "validacaovivo.appspot.com",
    messagingSenderId: "237257354370",
    appId: "1:237257354370:web:9709a5adba9020de6e189b",
    measurementId: "G-XYRYGTBSE8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();
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
let currentUserIsValidating = false;

let handleListenerDefect;
let handleListenerInstallation;

function getAppMetadata() {
    db.collection('metadata').doc('appData').onSnapshot((data) => {
        appMetaData = data.data();
    })
}

function sortReqs() {

    defectList.sort( (a, b) => {
        if (a.data().StartTime < b.data().StartTime)
            return -1;
        else if (a.data().StartTime > b.data().StartTime)
            return 1;
        else
            return 0;
    });

    installationList.sort( (a, b) => {
        if (a.data().StartTime < b.data().StartTime)
            return -1;
        else if (a.data().StartTime > b.data().StartTime)
            return 1;
        else
            return 0;
    });

    combinedList.sort( (a, b) => {
        if (a.data().StartTime < b.data().StartTime)
            return -1;
        else if (a.data().StartTime > b.data().StartTime)
            return 1;
        else
            return 0;
    });
}

function stopLookingForChanges() {
    handleListenerDefect();
    handleListenerInstallation();
}

function startLookingForChanges() {
    handleListenerDefect = db.collection(op1).onSnapshot((collection) => {
        defectList = collection.docs;
        combinedList = defectList.concat(installationList);
        setCurrentUserIsValidating();
        sortReqs();
    })
    
    handleListenerInstallation = db.collection(op2).onSnapshot((collection) => {
        installationList = collection.docs;
        combinedList = defectList.concat(installationList);
        setCurrentUserIsValidating();
        sortReqs();
    })
}

function setCurrentUserIsValidating() {
    if (combinedList.find((request) => request.data().Validator === auth.currentUser.email && request.data().Status === 'validating'))
        currentUserIsValidating = true;
    else
        currentUserIsValidating = false;
}

function isRequestValidated(id, op) {
    return new Promise(resolve => {
        db.collection(op).doc(id).get().then((request) => {
            resolve(request.data().Status);
        })
    })
    
}

function openForms() {
    var win = window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=DmBElwQ-Lkm6oSXsJFxvEBIWUWZQrGNMjPmsr51iRkdUN1oxSEFTMDc3QkFFMjhJQ09DVk1RUDVDOS4u',
                          "_blank");
}

function requestIsValidating(id,op) {
    let now = new Date().valueOf();
    db.collection(op).doc(id).update({
        Status: "validating",
        Validator: auth.currentUser.email,
        StartValidationTime: now
    }).then(() => {
    }).catch(error => {
        console.log(error);
    })
}

function requestIsValidated(id,validator,op) {
    if (auth.currentUser.email == validator) {
        let now = new Date().valueOf();

        db.collection(op).doc(id).update({
            Status: "validated",
            EndValidationTime: now
        }).then(() => {
        }).catch(error => {
            console.log(error);
        })
    }
}

function requestIsDenied(id, reason, op) {
    let now = new Date().valueOf();

    db.collection(op).doc(id).update({
            Reason: reason,
            Status: 'denied',
            EndValidationTime: now
        }).then(() => {
        }).catch(error => {
            console.log(error);
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