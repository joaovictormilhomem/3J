let requestListCopy = [];
let atualStockCopy = {};
let atualCashCopy = {};
let isHistoryRequestsOn = false;

function handleDeleteRequest(requestElement) {
    let id         = requestElement.getAttribute('data-id');
    let collection = requestElement.getAttribute('data-collection');
    let p13        = parseInt(requestElement.getAttribute('data-p13'));
    let water      = parseInt(requestElement.getAttribute('data-water'));
    let p13Empty   = parseInt(requestElement.getAttribute('data-p13Empty'));
    let waterEmpty = parseInt(requestElement.getAttribute('data-waterEmpty'));

    deleteRequest(id, collection);
    handleUpdateStock(p13, water, p13Empty, waterEmpty, false);
}

function handleRenderRequests() {
    if (isHistoryRequestsOn) {
        let requestFinishedTodayList = requestList.filter(isARequestFinishedToday);
        requestFinishedTodayList.forEach(request => renderRequest(request));
    }
    else{
        let requestsNotDeletedOrFinished = requestList.filter(wasNotDeletedOrFinished);
        requestsNotDeletedOrFinished.forEach(request => renderRequest(request));
    }
}

function handleRenderForwards(forwards) {
    let requestsNotDeletedAndIsFinished = forwards.filter(wasNotDeletedAndIsFinished);
    requestsNotDeletedAndIsFinished.forEach(forward => renderForward(forward));
}

function handleNewExpenseClick(value, item, notes){
    if (value !== '' && value >= 0.1 && !isNaN(value)){
        createExpense(value, item, notes);
        checkUndefinedCash();
        updateExpenseCashValue(value + atualCash.expense);
    }
    else return 1;
}

function handleCreateRequest(client, address, telephone, items, value, op) {
    items = deleteNaNAndDuplicatedProps(items);
    if(isFilled([address, op, items], value)) {
        if(checkIfThereIsStock(items)) {
            createRequest(client, address, telephone, items, value, op);
            handleUpdateStock(items.p13, items.water, items.p13Empty, items.waterEmpty, true);
            return 0; // Tudo certo
        }
        else
            return 2; // Sem estoque
    }
    else
        return 1; // Não preencheu corretamente
}

function handleChangeRequestStatus(requestElement) {
    let id         = requestElement.getAttribute('data-id');
    let collection = requestElement.getAttribute('data-collection');
    let status     = requestElement.getAttribute('data-status');
    let value      = parseFloat(requestElement.getAttribute('data-value'));
    let op         = requestElement.getAttribute('data-cash-op');

    if(status === 'waiting')
        startRequest(id, collection);
    else if(status === 'started'){
        handleUpdateCash(value, op);
        finishRequest(id, collection);
    }
}

function handlePayForward(valueToBePaid, paymentMethod, forward) {
    let remainingValue = forward.data().value - forward.data().paidvalue;
    valueToBePaid = parseFloat(valueToBePaid);
    let finalValue = valueToBePaid + parseFloat(forward.data().paidvalue);

    if (valueToBePaid > 0 && valueToBePaid <= remainingValue && paymentMethod !== ''){
        changeForwardPaidValue(forward.id, finalValue);
        createBackward(forward.id, valueToBePaid, paymentMethod);
        handleUpdateCash(valueToBePaid, paymentMethod);
        return 0;
    }
    else return 1;
}

function handleUpdateStock(p13, water, p13Empty, waterEmpty, isToDecrease) {
    if (isToDecrease) {
        if(p13 > 0) updateStockValue('p13', atualStock.p13 - p13);
        if(water > 0) updateStockValue('water', atualStock.water - water);
        if(p13Empty > 0) updateStockValue('p13Empty', atualStock.p13Empty - p13Empty);
        if(waterEmpty > 0) updateStockValue('waterEmpty', atualStock.waterEmpty - waterEmpty);
    }
    else{
        if(p13 > 0) updateStockValue('p13', atualStock.p13 + p13);
        if(water > 0) updateStockValue('water', atualStock.water + water);
        if(p13Empty > 0) updateStockValue('p13Empty', atualStock.p13Empty + p13Empty);
        if(waterEmpty > 0) updateStockValue('waterEmpty', atualStock.waterEmpty + waterEmpty);
    }
}

function handleUpdateCash(value, op) {
    if (atualCash[op] !== undefined)
        atualCash[op] = atualCash[op] + value;
    else
        atualCash[op] = value;
    updateCashValue();
}

function startSearch() {
    let forwardsSearchBar = document.getElementById('forwards_search_bar');

    forwardsSearchBar.onkeyup = () => {
        let value = forwardsSearchBar.value.toLowerCase();
        let forwardsList = requestList.filter(isForward);

        forwardsList = forwardsList.filter((request) => {
            let address = request.data().address.toLowerCase();
            return address.includes(value);
        })
        
        clearForwards();
        handleRenderForwards(forwardsList);
    }
}

async function start() {
    day = getCurrentDate();
    let checkStartFirebase = await startFirebase();
    startNewExpensePopup();
    startNewRequestPopup();
    startNewClientPopup();
    startAddButtons();
    startLookingForChanges();
    checkUndefinedCash();
    startSearch();

    let autoRenderRequestsAndForwards = setInterval(() => {
        if(requestListCopy !== requestList){
            requestListCopy = requestList;
            clearRequestsAndForwards();
            handleRenderRequests();
            let forwardsList = requestList.filter(isForward);
            handleRenderForwards(forwardsList);
        }
    }, 500)

    let autoRenderCash = setInterval(() => {
        if (!isEqualObjects(atualCash, atualCashCopy)) {
            atualCashCopy.incash  = atualCash.incash;
            atualCashCopy.card    = atualCash.card;
            atualCashCopy.pix     = atualCash.pix;
            atualCashCopy.forward = atualCash.forward;
            atualCashCopy.expense = atualCash.expense;
            atualCashCopy.total   = atualCash.total;
            renderCash(atualCashCopy);
        }
    }, 500);

    let autoRenderStock = setInterval(() => {
        if (!isEqualObjects(atualStock, atualStockCopy)) {
            atualStockCopy.p13 = atualStock.p13;
            atualStockCopy.water = atualStock.water;
            atualStockCopy.p13Empty = atualStock.p13Empty;
            atualStockCopy.waterEmpty = atualStock.waterEmpty;
            renderStock(atualStockCopy);
        }
    }, 500);
}

start();