function handleDeleteRequest() {
    let requestElement = this.parentNode;
    let id             = requestElement.getAttribute('data-id');
    let collection     = requestElement.getAttribute('data-collection');
    deleteRequest(id, collection);
}

function wasNotDeleted(request) { 
    return request.data().status !== 'deleted'
}

function handleRenderRequests(requests) {
    let requestsNotDeleted = requests.filter(wasNotDeleted);
    requestsNotDeleted.forEach(request => renderRequest(request));
}

function handleNewRequestClick(client, address, itens) {
    createRequest(client, address, itens);  
}

let autoHandleRenderRequests = setInterval(() => {
    if(requestListCopy !== requestList){
        requestListCopy = requestList;
        clearRequests();
        handleRenderRequests(requestList);
    }
}, 500)

startAddButtons();