const pageRequestsContainer = document.getElementById('page_requests_container');
const pageForwardsContainer = document.getElementById('page_forwards_container');
const pageRequests  = document.getElementById('page_requests');
const pageForwards  = document.getElementById('page_forwards');
const pageCustomers = document.getElementById('page_customers');
const pageStock     = document.getElementById('page_stock');
const pageCash      = document.getElementById('page_cash');
const pages         = [pageRequests, pageForwards, pageCustomers, pageStock, pageCash];
const btnRequests   = document.getElementById('btn_requests');
const btnForwards   = document.getElementById('btn_forwards');
const btnCustomers  = document.getElementById('btn_customers');
const btnStock      = document.getElementById('btn_stock');
const btnCash       = document.getElementById('btn_cash');
const addButtons    = document.getElementsByClassName('add-button');

const historyBtnRequests = document.getElementById('history-button-requests');
const historyBtnCash     = document.getElementById('history-button-cash');
const doneBtnRequests    = document.getElementById('done-button-requests');

let activePage = 1;

    // Navegação

btnRequests.onclick = () => {
    pages.forEach(page => page.style.display = 'none');
    pageRequests.style.display = 'block';
    activePage = 1;
}

btnForwards.onclick = () => {
    pages.forEach(page => page.style.display = 'none');
    pageForwards.style.display = 'block';
}

btnCustomers.onclick = () => {
    pages.forEach(page => page.style.display = 'none');
    pageCustomers.style.display = 'block';
    activePage = 2;
}

btnStock.onclick = () => {
    pages.forEach(page => page.style.display = 'none');
    pageStock.style.display = 'block';
    activePage = 3;
}

btnCash.onclick = () => {
    pages.forEach(page => page.style.display = 'none');
    pageCash.style.display = 'block';
    activePage = 4;
}

    // Show/Close

function showNewExpensePopup() {
    let newExpensePopup = document.getElementById('new-expense-popup');
    newExpensePopup.style.display = 'flex';
}

function showNewRequestPopup() {
    const newReqPopup         = document.getElementById('new-request-popup');
    newReqPopup.style.display = 'flex';
}

function showNewClientPopup() {
    const newPopup    = document.getElementById('new-client-popup');
    const newButton   = document.getElementById('new-popup-button-client');
    const closeButton = document.getElementById('close-popup-button-client');

    newPopup.style.display = 'flex';
    closeButton.onclick = () => closeNewClientPopup();
    newButton.onclick = () => {
        let client = newPopup.children[0].children[1].value;
        let address = newPopup.children[0].children[3].value;
        let itens = {p13: newPopup.children[0].children[5].value, water: newPopup.children[0].children[7].value};
        handleNewClientClick(client, address, itens);
        closeNewClientPopup();
    }
}

function closeNewExpensePopup() {
    let newExpensePopup = document.getElementById('new-expense-popup');
    newExpensePopup.style.display = 'none';
}

function closeNewRequestPopup(){
    const addressElement   = document.getElementById('input-request-address');
    const p13Element       = document.getElementById('input-p13');
    const waterElement     = document.getElementById('input-water');
    const valueElement     = document.getElementById('input-value');
    const opElement        = document.getElementById('input-op');
    const telephoneElement = document.getElementById('input-request-telephone');
    const newPopup         = document.getElementById('new-request-popup');
    
    deleteFormFields([addressElement, p13Element, waterElement, valueElement, telephoneElement, opElement]);
    newPopup.style.display = 'none';
}

function closeNewClientPopup(){
    const newPopup = document.getElementById('new-client-popup');
    newPopup.style.display = 'none';
}

function closeNewForwardPaymentPopup() {
    const newForwardPaymentPopup = document.getElementById('new-forward-payment');
    const valueElement = document.getElementById('input-forward-payment-value');
    const opElement    = document.getElementById('input-forward-payment-op');

    deleteFormFields([valueElement, opElement]);
    newForwardPaymentPopup.style.display = 'none';
}

function closeDatePickerPopup() {
    let datePickerPopup  = document.getElementById('date-picker-popup');
    datePickerPopup.style.display = 'none';
}

function showCashDay() {
    cashDayElement = document.getElementById('cash_day');
    if (cashDay !== day)
        cashDayElement.innerHTML = cashDay.replaceAll('-', '/');
    else
        cashDayElement.innerHTML = '';
}

    // Outros

function deleteFormFields(fields) {
    fields.forEach(field => field.value = '');
}

function startNewRequestPopup() {
    const newButton            = document.getElementById('new-popup-button-request');
    const closeButton          = document.getElementById('close-popup-button-request');
    const clientElement        = document.getElementById('select-clients');
    const addressElement       = document.getElementById('input-request-address');
    const telephoneElement     = document.getElementById('input-request-telephone');
    const p13Element           = document.getElementById('input-p13');
    const waterElement         = document.getElementById('input-water');
    const valueElement         = document.getElementById('input-value');
    const opElement            = document.getElementById('input-op');

    closeButton.onclick = () => closeNewRequestPopup();
    newButton.onclick = () => {
        let client    = clientElement.value;
        let address   = addressElement.value;
        let items     = {p13: p13Element.value, water: waterElement.value};
        let value     = parseFloat(valueElement.value);
        let op        = opElement.value;
        let telephone = telephoneElement.value;
        
        let response = handleCreateRequest(client, address, telephone, items, value, op);

        if (response === 0) {
            closeNewRequestPopup();
            clientElement.value = null;
        }
        else
            switch (response) {
                case 1: alert('preencha todos os campos corretamente'); break;
                case 2: alert('Não temos estoque suficiente!'); break;
                default: break;
            }
    }
}

function startNewClientPopup() {
    const newPopup = document.getElementById('new-client-popup');
    const newButton   = newPopup.children[0].children[8];
    const closeButton = newPopup.children[0].children[9];

    closeButton.onclick = () => closeNewClientPopup();
    newButton.onclick = () => {
        let client = newPopup.children[0].children[1].value;
        let address = newPopup.children[0].children[3].value;
        let itens = {p13: newPopup.children[0].children[5].value, water: newPopup.children[0].children[7].value};
        handleNewClientClick(client, address, itens);
        closeNewClientPopup();
    }
}

function startNewExpensePopup() {
    let newExpenseCloseBtn = document.getElementById('close-expense-popup-button');
    let newExpenseBtn      = document.getElementById('new-expense-button');

    newExpenseCloseBtn.onclick = () => closeNewExpensePopup();

    newExpenseBtn.onclick = () => {
        let valueElement = document.getElementById('input-expense-value');
        let itemElement  = document.getElementById('input-expense-item');
        let notesElement = document.getElementById('input-expense-notes');

        let response = handleNewExpenseClick(parseFloat(valueElement.value), itemElement.value, notesElement.value);
        if (response === 1) alert('Preencha o valor corretamente!');
        else {
            closeNewExpensePopup();
            itemElement.selectedIndex = 0;
            deleteFormFields([valueElement, notesElement]);
        }
    }
}

function showAndStartDatePickerPopup() {
    let datePickerPopup  = document.getElementById('date-picker-popup');
    let datePickerBtn           = document.getElementById('date-picker-button');
    let closeDatePickerPopupBtn = document.getElementById('close-date-picker-popup-button');
    let datePicker              = document.getElementById('date-picker');

    closeDatePickerPopupBtn.onclick = () => closeDatePickerPopup();
    datePickerBtn.onclick = () => {
        let selectedDay = formatDateOfDatePicker(datePicker.value);
        cashDay = selectedDay;
        showCashDay();
        datePickerPopup.style.display = 'none';
    }
    datePickerPopup.style.display = 'flex';
    datePicker.focus();
}

function showAndStartNewForwardPaymentPopup(forward) {
    const newForwardPaymentPopup = document.getElementById('new-forward-payment');
    const newButton    = document.getElementById('forward-payment-new-button');
    const closeButton  = document.getElementById('forward-payment-close-popup-button');
    const valueElement = document.getElementById('input-forward-payment-value');
    const opElement    = document.getElementById('input-forward-payment-op');

    closeButton.onclick = () => closeNewForwardPaymentPopup();
    newButton.onclick   = () => {
        let value    = valueElement.value;
        let op       = opElement.value;
        let response = handlePayForward(value, op, forward);
        
        if (response === 0) closeNewForwardPaymentPopup();
        else
            switch (response) {
                case 1: alert('preencha todos os campos corretamente'); break;
                default: break;
            }
    }
    newForwardPaymentPopup.style.display = 'flex'; 
}

function startAddButtons() {
    addButtons[0].onclick = () => showNewRequestPopup();
    //addButtons[1].onclick = () => showNewClientPopup();
    addButtons[2].onclick = () => showNewExpensePopup();
}

function renderClient(client) {
    let newClient = document.createElement('div');
    newClient.classList.add('request');
    newClient.setAttribute('data-id', client.id);
    newClient.setAttribute('data-collection', client.ref.parent.id);

    let newClientName       = document.createElement('h1');
    newClientName.innerHTML = request.data().address;
    newClientName.classList.add('request_address');

    let newDeleteClient       = document.createElement('p');
    newDeleteClient.innerHTML = 'Apagar';
    newDeleteClient.onclick   = handleDeleteRequest;
    newDeleteClient.classList.add('deny-request', 'text-base');

    let newRequestItems = document.createElement('h2');
    newRequestItems.classList.add('request_items');
    if(request.data().items.p13 && request.data().items.water)
        newRequestItems.innerHTML = request.data().items.p13+' gás P13 e '+request.data().items.water+' água';
    else if(request.data().items.p13)
        newRequestItems.innerHTML = request.data().items.p13+' gás P13';
    else if(request.data().items.water)
        newRequestItems.innerHTML = request.data().items.water+' águas';
    
    newRequest.appendChild(newClientName);
    newRequest.appendChild(newDeleteClient);
    newRequest.appendChild(newRequestItems);
    pageRequests.appendChild(newRequest);
}

function renderRequest(request) {
    let newRequest = document.createElement('div');
    newRequest.classList.add('request');
    newRequest.setAttribute('data-id', request.id);
    newRequest.setAttribute('data-collection', request.ref.parent.id);
    newRequest.setAttribute('data-status', request.data().status);
    newRequest.setAttribute('data-p13', request.data().items.p13);
    newRequest.setAttribute('data-water', request.data().items.water);
    newRequest.setAttribute('data-value', request.data().value);
    newRequest.setAttribute('data-cash-op', request.data().op);
    newRequest.setAttribute('data-telephone', request.data().telephone);
    newRequest.setAttribute('title', request.data().op);

    let newRequestStatus     = document.createElement('div');
    if (request.data().status !== 'finished') newRequestStatus.ondblclick = () => {handleChangeRequestStatus(newRequest)};
    newRequestStatus.classList.add('request_status');
    newRequestStatus.classList.add('request_status_'+request.data().status);
    newRequest.appendChild(newRequestStatus);

    let newRequestAddress       = document.createElement('h1');
    newRequestAddress.innerHTML = request.data().address;
    newRequestAddress.classList.add('request_address');
    newRequest.appendChild(newRequestAddress);
    
    if (request.data().status !== 'finished') {
        let newDeleteRequest       = document.createElement('p');
        newDeleteRequest.innerHTML = 'Apagar';
        newDeleteRequest.onclick   = () => {handleDeleteRequest(newRequest)};
        newDeleteRequest.classList.add('deny-request', 'text-base');
        newRequest.appendChild(newDeleteRequest);
    }

    let newRequestItems = document.createElement('h2');
    newRequestItems.classList.add('request_items');
    if(request.data().items.p13 && request.data().items.water)
        newRequestItems.innerHTML = request.data().items.p13+' gás P13 e '+request.data().items.water+' água';
    else if(request.data().items.p13)
        newRequestItems.innerHTML = request.data().items.p13+' gás P13';
    else if(request.data().items.water)
        newRequestItems.innerHTML = request.data().items.water+' águas';
    
    newRequestItems.innerHTML = newRequestItems.innerHTML+' por '+ request.data().value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    newRequest.appendChild(newRequestItems);

    pageRequestsContainer.appendChild(newRequest);
}

function clearRequests() {
    pageRequestsContainer.innerHTML = '';
    startAddButtons();
}

function clearRequestsAndForwards() {
    pageRequestsContainer.innerHTML = '';
    pageForwardsContainer.innerHTML = '';
    startAddButtons();
}

function clearForwards() {
    pageForwardsContainer.innerHTML = '';
    startAddButtons();
}

function renderForward(forward) {
    let newForward = document.createElement('div');
    newForward.classList.add('forward');
    newForward.setAttribute('data-id', forward.id);
    newForward.setAttribute('data-collection', forward.ref.parent.id);
    newForward.setAttribute('data-status', forward.data().status);
    newForward.setAttribute('data-p13', forward.data().items.p13);
    newForward.setAttribute('data-water', forward.data().items.water);
    newForward.setAttribute('data-value', forward.data().value);
    newForward.setAttribute('data-paid-value', forward.data().paidvalue);
    newForward.setAttribute('data-cash-op', forward.data().op);
    newForward.setAttribute('data-telephone', forward.data().telephone);

    let newForwardAddress       = document.createElement('h1');
    newForwardAddress.innerHTML = forward.data().address;
    newForwardAddress.classList.add('request_address');

    let newForwardTelephone       = document.createElement('h1');
    newForwardTelephone.innerHTML = forward.data().telephone;
    newForwardTelephone.classList.add('forward_telephone');

    let newPayForward       = document.createElement('p');
    newPayForward.innerHTML = 'Pagar';
    newPayForward.onclick   = () => {showAndStartNewForwardPaymentPopup(forward)};
    newPayForward.classList.add('pay_forward', 'text-base');

    let newForwardNotes = document.createElement('h2');
    newForwardNotes.classList.add('forward_notes');
    newForwardNotes.innerHTML = formatNotes(forward);

    newForward.appendChild(newForwardAddress);
    newForward.appendChild(newForwardTelephone);
    newForward.appendChild(newPayForward);
    newForward.appendChild(newForwardNotes);
    pageForwardsContainer.appendChild(newForward);
}

function formatNotes(request) {
    let notes;

    if(request.data().items.p13 && request.data().items.water)
        notes = request.data().items.p13 + ' gás P13 e ' + request.data().items.water + ' água';
    else if(request.data().items.p13)
        notes = request.data().items.p13 + ' gás P13 ';
    else if(request.data().items.water)
        notes = request.data().items.water + ' águas ';

    notes = notes +'por '+ request.data().value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    if (request.data().paidvalue > 0) notes = notes + '. Valor restante: ' + (request.data().value - request.data().paidvalue).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    return notes;
}

function formatDateOfDatePicker(date) {
    let formatedDate = '';
    if (date[8] == 0)
        formatedDate = date[9];
    else
        formatedDate = date[8]+date[9];

    if (date[5] == 0)
        formatedDate = formatedDate + date[7]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
    else
        formatedDate = formatedDate + date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];

    return formatedDate;
}

function renderStock(p13Stock, waterStock) {
    let gasNumberElement         = document.getElementById('gas_number');
    let waterNumberElement       = document.getElementById('water_number');
    gasNumberElement.innerHTML   = p13Stock;
    waterNumberElement.innerHTML = waterStock
}

function renderCash(cash) {
    let moneyNumberElement   = document.getElementById('money_number');
    let cardNumberElement    = document.getElementById('card_number');
    let pixNumberElement     = document.getElementById('pix_number');
    let forwardNumberElement = document.getElementById('forward_number');
    let expenseNumberElement = document.getElementById('expense_number');
    let totalNumberElement   = document.getElementById('total_number');
    
    moneyNumberElement.innerHTML   = cash.incashLessExpense.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    cardNumberElement.innerHTML    = cash.card.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    pixNumberElement.innerHTML     = cash.pix.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    forwardNumberElement.innerHTML = cash.forward.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    expenseNumberElement.innerHTML = cash.expense.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    totalNumberElement.innerHTML   = cash.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

doneBtnRequests.onclick = () => {
    isHistoryRequestsOn = !isHistoryRequestsOn;
    clearRequests();
    handleRenderRequests();
}

historyBtnCash.onclick = () => {
    showAndStartDatePickerPopup();
}