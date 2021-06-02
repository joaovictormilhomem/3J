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
const menuButtons   = [btnRequests, btnCustomers, btnStock, btnCash, btnManagement];

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

function createRequest(request) {
    console.log(request);
    let newRequest = document.createElement('div');
    newRequest.classList.add('request');
    newRequest.setAttribute('data-id', request.id);

    let newRequestStatus = document.createElement('div');
    newRequestStatus.classList.add('request_status');
    newRequestStatus.classList.add('request_status_'+request.data().status);

    let newRequestAddress = document.createElement('h1');
    newRequestAddress.classList.add('request_address');
    newRequestAddress.innerHTML = request.data().address;

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
    newRequest.appendChild(newRequestItems);
    pageRequests.appendChild(newRequest);
    console.log(newRequest);
}

function renderRequests(requests) {
    requests.forEach(request => {
        createRequest(request);
    });
}

function clearRequests() {
    pageRequests.innerHTML = '<div class="add-btn" id="add-btn-requests"></div>';
    startAddButtons();
}

function startAddButtons() {

    addButtons[0].onclick = () => {
        console.log('add request');
        //createRequest(customer, address, items)
    }

    for (i = 0; i < addButtons.length; i++)
        addButtons[i].style.display = 'block';
}

let handleRenderRequests = setInterval(() => {
    if(requestListCopy !== requestList){
        requestListCopy = requestList;
        clearRequests();
        renderRequests(requestList);
    }
}, 500)