
let requestListCopy = [];
let p13StockCopy;
let waterStockCopy;

function handleDeleteRequest(requestElement) {
    let id             = requestElement.getAttribute('data-id');
    let collection     = requestElement.getAttribute('data-collection');
    deleteRequest(id, collection);
}

function handleRenderRequests(requests) {
    let requestsNotDeleted = requests.filter(wasNotDeletedOrFinished);
    requestsNotDeleted.forEach(request => renderRequest(request));
}

function handleCreateRequest(client, address, items) {   
    if (isFilled([address, items.p13, items.water]) && items.p13 >= 1 && items.water >= 1) {
        createRequest(client, address, items);
        return true;
    }
}

function handleChangeRequestStatus(requestElement) {
    let id         = requestElement.getAttribute('data-id');
    let collection = requestElement.getAttribute('data-collection');
    let status     = requestElement.getAttribute('data-status');

    status === 'waiting' ? startRequest(id, collection) : finishRequest(id, collection);
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

    let autoRenderStock = setInterval(() => {
        if (p13Stock !== p13StockCopy || waterStock !== waterStockCopy) {
            waterStockCopy = waterStock;
            p13StockCopy = p13Stock;
            renderStock(p13Stock, waterStock);
        }
    }, 500);
}

start();