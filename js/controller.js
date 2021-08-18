let requestListCopy = [];
let p13StockCopy;
let waterStockCopy;

function handleDeleteRequest(requestElement) {
    let id         = requestElement.getAttribute('data-id');
    let collection = requestElement.getAttribute('data-collection');
    let p13        = parseInt(requestElement.getAttribute('data-p13'));
    let water      = parseInt(requestElement.getAttribute('data-water'));

    deleteRequest(id, collection);
    handleUpdateStock(p13, water, false);
}

function handleRenderRequests(requests) {
    let requestsNotDeleted = requests.filter(wasNotDeletedOrFinished);
    requestsNotDeleted.forEach(request => renderRequest(request));
}

function handleCreateRequest(client, address, items, value, op) {   
    if(isFilled([address, items.p13, items.water]) && (items.p13 >= 1 || items.water >= 1)) {
        if(p13Stock >= items.p13 && waterStock >= items.water) {
            createRequest(client, address, items, value, op);
            handleUpdateStock(items.p13, items.water, true);
            return 0;
        }
        else
            return 2;
    }
    else
        return 1;
}

function handleChangeRequestStatus(requestElement) {
    let id         = requestElement.getAttribute('data-id');
    let collection = requestElement.getAttribute('data-collection');
    let status     = requestElement.getAttribute('data-status');
    let value      = parseInt(requestElement.getAttribute('data-value'));
    let op         = requestElement.getAttribute('data-cashOp');

    if(status === 'waiting')
        startRequest(id, collection);
    else{
        handleUpdateCash(value, op);
        finishRequest(id, collection);
    }
}

function handleUpdateStock(p13, water, op) {
    if (op) {
        if (p13 > 0)
            updateStockValue('p13', p13Stock - p13);
    
        if(water > 0)
        updateStockValue('water', waterStock - water);        
    }
    else{
        if (p13 > 0)
            updateStockValue('p13', p13Stock + p13);
    
        if(water > 0)
        updateStockValue('water', waterStock + water);  
    }
}

function handleUpdateCash(value, op) {
    console.log(op);
    if(atualCash.inCash === undefined) {
        if(op == 'true')
            updateCashValue(0, 0 + value);
        else
            updateCashValue(0 + value, 0);
    }
    else{
        if(op == 'true')
            updateCashValue(atualCash.inCash, atualCash.forward + value);
        else
            updateCashValue(atualCash.inCash + value, atualCash.forward);
    }
}

function start() {
    day = getCurrentDate();
    startNewRequestPopup();
    startNewClientPopup();
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