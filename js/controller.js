function wasNotDeleted(request) { 
    return request.data().status !== 'deleted'
}

function handleDeleteRequest(requestElement) {
    let id             = requestElement.getAttribute('data-id');
    let collection     = requestElement.getAttribute('data-collection');
    deleteRequest(id, collection);
}

function handleRenderRequests(requests) {
    let requestsNotDeleted = requests.filter(wasNotDeleted);
    requestsNotDeleted.forEach(request => renderRequest(request));
}

function handleNewRequestClick(client, address, itens) {
    createRequest(client, address, itens);  
}

function handleChangeStatusClick(requestElement) {
    let id             = requestElement.getAttribute('data-id');
    let collection     = requestElement.getAttribute('data-collection');
    changeRequestStatus(id, collection);
}

let autoHandleRenderRequests = setInterval(() => {
    if(requestListCopy !== requestList){
        requestListCopy = requestList;
        clearRequests();
        handleRenderRequests(requestList);
    }
}, 500)

startAddButtons();