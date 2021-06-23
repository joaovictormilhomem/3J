function handleDeleteRequest() {
    let requestElement = this.parentNode;
    let id             = requestElement.getAttribute('data-id');
    let collection     = requestElement.getAttribute('data-collection');
    deleteRequest(id, collection);
}

function requestModel(request) {
    let newRequest = document.createElement('div');
    newRequest.classList.add('request');
    newRequest.setAttribute('data-id', request.id);
    newRequest.setAttribute('data-collection', request.ref.parent.id);

    let newRequestStatus = document.createElement('div');
    newRequestStatus.classList.add('request_status');
    newRequestStatus.classList.add('request_status_'+request.data().status);

    let newRequestAddress       = document.createElement('h1');
    newRequestAddress.innerHTML = request.data().address;
    newRequestAddress.classList.add('request_address');

    let newDeleteRequest       = document.createElement('p');
    newDeleteRequest.innerHTML = 'Apagar';
    newDeleteRequest.onclick   = handleDeleteRequest;
    newDeleteRequest.classList.add('deny-request', 'text-base');

    let newRequestItems = document.createElement('h2');
    newRequestItems.classList.add('request_items');
    if(request.data().items.p13 && request.data().items.water)
        newRequestItems.innerHTML = request.data().items.p13+' gás P13 e '+request.data().items.water+' água';
    else if(request.data().items.p13)
        newRequestItems.innerHTML = request.data().items.p13+' gás P13';
    else if(request.data().items.water)
        newRequestItems.innerHTML = request.data().items.water+' águas';
    
    newRequest.appendChild(newRequestStatus);
    newRequest.appendChild(newRequestAddress);
    newRequest.appendChild(newDeleteRequest);
    newRequest.appendChild(newRequestItems);
    pageRequests.appendChild(newRequest);
}

function wasNotDeleted(request) { 
    return request.data().status !== 'deleted'
}

function renderRequests(requests) {
    let requestsNotDeleted = requests.filter(wasNotDeleted);
    requestsNotDeleted.forEach(request => requestModel(request));
}

function clearRequests() {
    pageRequests.innerHTML = '<div class="add-btn" id="add-btn-requests"></div>';
    startAddButtons();
}

function handleNewRequestClick(client, address, itens) {
    createRequest(client, address, itens);  
}

let handleRenderRequests = setInterval(() => {
    if(requestListCopy !== requestList){
        requestListCopy = requestList;
        clearRequests();
        renderRequests(requestList);
    }
}, 500)