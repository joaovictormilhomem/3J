const pageRequests   = document.getElementById('page_requests');
const pageCustomers  = document.getElementById('page_customers');
const pageStock      = document.getElementById('page_stock');
const pageCash       = document.getElementById('page_cash');
const pageManagement = document.getElementById('page_management');
const pages          = [pageRequests, pageCustomers, pageStock, pageCash, pageManagement];

let pageRequestsContainer = document.getElementById('page_requests_container');

const btnRequests   = document.getElementById('btn_requests');
const btnCustomers  = document.getElementById('btn_customers');
const btnStock      = document.getElementById('btn_stock');
const btnCash       = document.getElementById('btn_cash');
const btnManagement = document.getElementById('btn_management');

const addButtons = document.getElementsByClassName('add-btn');

let activePage = 1;

    // Navegação

btnRequests.onclick = () => {
    pages.forEach(page => page.style.display = 'none');
    pageRequests.style.display = 'block';
    activePage = 1;
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

btnManagement.onclick = () => {
    pages.forEach(page => page.style.display = 'none');
    pageManagement.style.display = 'block';
    activePage = 5;
}

    // Show/Close

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

function closeNewRequestPopup(){
    const newPopup = document.getElementById('new-request-popup');
    newPopup.style.display = 'none';
}

function closeNewClientPopup(){
    const newPopup = document.getElementById('new-client-popup');
    newPopup.style.display = 'none';
}

    // Outros

function deleteFormFields(fields) {
    fields.forEach(field => {
        field.value = '';
    });
}

function startNewRequestPopup() {
    const newReqPopup          = document.getElementById('new-request-popup');
    const newReqPopupContainer = newReqPopup.children[0];
    const newButton            = document.getElementById('new-popup-button-request');
    const closeButton          = document.getElementById('close-popup-button-request');
    const clientElement        = document.getElementById('select-clients');
    const addressElement       = document.getElementById('input-request-address');
    const p13Element           = document.getElementById('input-p13');
    const waterElement         = document.getElementById('input-water');
    const valueElement         = document.getElementById('input-value');

    closeButton.onclick = () => closeNewRequestPopup();
    newButton.onclick = () => {
        let client  = clientElement.value;
        let address = addressElement.value;
        let items   = {p13: p13Element.value, water: waterElement.value};
        let value   = valueElement.value;
        
        let response = handleCreateRequest(client, address, items, value);

        if (response === 0) {
            closeNewRequestPopup();
            clientElement.value = null;
            deleteFormFields([addressElement, p13Element, waterElement, valueElement]);
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

function startAddButtons() {
    addButtons[0].onclick = () => showNewRequestPopup();
    addButtons[1].onclick = () => showNewClientPopup();
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

    let newRequestStatus     = document.createElement('div');
    newRequestStatus.ondblclick = () => {handleChangeRequestStatus(newRequest)};
    newRequestStatus.classList.add('request_status');
    newRequestStatus.classList.add('request_status_'+request.data().status);

    let newRequestAddress       = document.createElement('h1');
    newRequestAddress.innerHTML = request.data().address;
    newRequestAddress.classList.add('request_address');

    let newDeleteRequest       = document.createElement('p');
    newDeleteRequest.innerHTML = 'Apagar';
    newDeleteRequest.onclick   = () => {handleDeleteRequest(newRequest)};
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
    pageRequestsContainer.appendChild(newRequest);
}

function clearRequests() {
    pageRequestsContainer.innerHTML = '';
    startAddButtons();
}

function renderStock(p13Stock, waterStock) {
    let gasNumberElement         = document.getElementById('gas_number');
    let waterNumberElement       = document.getElementById('water_number');
    gasNumberElement.innerHTML   = p13Stock;
    waterNumberElement.innerHTML = waterStock
}