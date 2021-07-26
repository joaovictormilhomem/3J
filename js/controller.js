function handleDeleteRequest(requestElement) {
    let id             = requestElement.getAttribute('data-id');
    let collection     = requestElement.getAttribute('data-collection');
    deleteRequest(id, collection);
}

function handleRenderRequests(requests) {
    let requestsNotDeleted = requests.filter(wasNotDeleted);
    requestsNotDeleted.forEach(request => renderRequest(request));
}

function handleCreateRequest(client, address, items) {   
    if (isFilled([address, items.p13, items.water]) && items.p13 >= 1 && items.water >= 1) {
        createRequest(client, address, items);
        return true;
    }
}

function handleStartRequest(requestElement) {
    let id             = requestElement.getAttribute('data-id');
    let collection     = requestElement.getAttribute('data-collection');
    changeRequestStatus(id, collection);
}

function start() {
    startNewRequestPopup();
    startAddButtons();
    startLookingForChanges();

    let autoHandleRenderRequests = setInterval(() => {
        if(requestListCopy !== requestList){
            requestListCopy = requestList;
            clearRequests();
            handleRenderRequests(requestList);
        }
    }, 500)
}

start();