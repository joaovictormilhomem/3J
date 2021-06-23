const pageRequests   = document.getElementById('page_requests');
const pageCustomers  = document.getElementById('page_customers');
const pageStock      = document.getElementById('page_stock');
const pageCash       = document.getElementById('page_cash');
const pageManagement = document.getElementById('page_management');
const pages          = [pageRequests, pageCustomers, pageStock, pageCash, pageManagement];

const btnRequests   = document.getElementById('btn_requests');
const btnCustomers  = document.getElementById('btn_customers');
const btnStock      = document.getElementById('btn_stock');
const btnCash       = document.getElementById('btn_cash');
const btnManagement = document.getElementById('btn_management');

const addButtons = document.getElementsByClassName('add-btn');

let activePage = 1;

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

function closeNewRequestPopup(){
    const newReqPopup = document.getElementById('new-request-popup');
    newReqPopup.style.display = 'none';
}

function showNewRequestPopup() {
    const newReqPopup = document.getElementById('new-request-popup');
    const newButton   = newReqPopup.children[0].children[8];
    const closeButton = newReqPopup.children[0].children[9];

    newReqPopup.style.display = 'flex';
    closeButton.onclick = () => closeNewRequestPopup();
    newButton.onclick = () => {
        let client = newReqPopup.children[0].children[1].value;
        let address = newReqPopup.children[0].children[3].value;
        let itens = {p13: newReqPopup.children[0].children[5].value, water: newReqPopup.children[0].children[7].value};
        handleNewRequestClick(client, address, itens);
        closeNewRequestPopup();
    }
}

function startAddButtons() {

    addButtons[0].onclick = () => showNewRequestPopup();

    for (i = 0; i < addButtons.length; i++)
        addButtons[i].style.display = 'block';
}