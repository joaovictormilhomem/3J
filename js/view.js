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

function closeNewRequestPopup(){
    const newReqPopup = document.getElementById('new-request-popup');
    newReqPopup.style.display = 'none';
}

function showNewRequestPopup() {
    const newReqPopup          = document.getElementById('new-request-popup');
    newReqPopup.style.display = 'flex';
}

function showNewClientPopup() {
    const newReqPopup = document.getElementById('new-client-popup');
    const newButton   = newReqPopup.children[0].children[8];
    const closeButton = newReqPopup.children[0].children[9];

    newReqPopup.style.display = 'flex';
    closeButton.onclick = () => closeNewClientPopup();
    newButton.onclick = () => {
        let client = newReqPopup.children[0].children[1].value;
        let address = newReqPopup.children[0].children[3].value;
        let itens = {p13: newReqPopup.children[0].children[5].value, water: newReqPopup.children[0].children[7].value};
        handleNewClientClick(client, address, itens);
        closeNewClientPopup();
    }
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
    const newButton            = newReqPopupContainer.children[8];
    const closeButton          = newReqPopupContainer.children[9];
    const clientElement        = newReqPopupContainer.children[1];
    const addressElement       = newReqPopupContainer.children[3];
    const p13Element           = newReqPopupContainer.children[5];
    const waterElement         = newReqPopupContainer.children[7];

    closeButton.onclick = () => closeNewRequestPopup();
    newButton.onclick = () => {
        let client  = clientElement.value;
        let address = addressElement.value;
        let items   = {p13: p13Element.value, water: waterElement.value};
        
        let response = handleCreateRequest(client, address, items);

        if (response) {
            closeNewRequestPopup();
            clientElement.value = null;
            deleteFormFields([addressElement, p13Element, waterElement]);
        }
        else
            alert('preencha todos os campos corretamente');
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