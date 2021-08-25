let requestListCopy = [];
let p13StockCopy;
let waterStockCopy;
let atualCashCopy = {};

function handleDeleteRequest(requestElement) {
    let id         = requestElement.getAttribute('data-id');
    let collection = requestElement.getAttribute('data-collection');
    let p13        = parseInt(requestElement.getAttribute('data-p13'));
    let water      = parseInt(requestElement.getAttribute('data-water'));

    deleteRequest(id, collection);
    handleUpdateStock(p13, water, false);
}

function handleRenderRequests(requests) {
    let requestsNotDeletedOrFinished = requests.filter(wasNotDeletedOrFinished);
    requestsNotDeletedOrFinished.forEach(request => renderRequest(request));
}

function handleRenderForwards(forwards) {
    let requestsNotDeletedAndIsFinished = forwards.filter(wasNotDeletedAndIsFinished);
    requestsNotDeletedAndIsFinished.forEach(forward => renderForward(forward));
}

function handleCreateRequest(client, address, telephone, items, value, op) {   
    if(isFilled([address, items.p13, items.water, value]) && (items.p13 >= 1 || items.water >= 1)) {
        if(p13Stock >= items.p13 && waterStock >= items.water) {
            createRequest(client, address, telephone, items, value, op);
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
    let op         = requestElement.getAttribute('data-cash-op');

    if(status === 'waiting')
        startRequest(id, collection);
    else{
        handleUpdateCash(value, op);
        finishRequest(id, collection);
    }
}

function handlePayForward(forwardElement) {
    let id         = forwardElement.getAttribute('data-id');
    let collection = forwardElement.getAttribute('data-collection');
    let value      = parseInt(forwardElement.getAttribute('data-value'));
    let paidValue  = parseInt(forwardElement.getAttribute('data-paid-value'));
    let op         = forwardElement.getAttribute('data-cash-op');

    console.log(value, paidValue);
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
    if (atualCash[op] !== undefined)
        atualCash[op] = atualCash[op] + value;
    else
        atualCash[op] = value;
    updateCashValue();
}

function start() {
    day = getCurrentDate();
    startNewRequestPopup();
    startNewClientPopup();
    startAddButtons();
    startLookingForChanges();
    checkUndefinedCash();

    let autoRenderRequestsAndForwards = setInterval(() => {
        if(requestListCopy !== requestList){
            requestListCopy = requestList;
            clearRequestsAndForwards();
            handleRenderRequests(requestList);
            let forwardsList = requestList.filter(isForward);
            handleRenderForwards(forwardsList);
        }
    }, 500)

    let autoRenderCash = setInterval(() => {
        if (atualCash !== atualCashCopy) {
            atualCashCopy.incash  = atualCash.incash;
            atualCashCopy.card    = atualCash.card;
            atualCashCopy.pix     = atualCash.pix;
            atualCashCopy.forward = atualCash.forward;
            atualCashCopy.total   = atualCash.total;
            renderCash(atualCashCopy);
        }
    }, 500);

    let autoRenderStock = setInterval(() => {
        if (p13Stock !== p13StockCopy || waterStock !== waterStockCopy) {
            waterStockCopy = waterStock;
            p13StockCopy = p13Stock;
            renderStock(p13StockCopy, waterStockCopy);
        }
    }, 500);
}

start();