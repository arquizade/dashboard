var rowList = "";

var environmentPanel = document.querySelector('.staging-environment');

document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
        .querySelector(".products-area-wrapper")
        .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
    document.querySelector(".list").classList.add("active");
    document.querySelector(".grid").classList.remove("active");
    document.querySelector(".products-area-wrapper").classList.remove("gridView");
    document.querySelector(".products-area-wrapper").classList.add("tableView");
});

var sortButton = document.querySelectorAll(".sort-button");
sortButton.forEach(event =>
    event.addEventListener("click", function () {
        sortBy(brandlist, 'brand', 'DESC');
    })
);

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');
});
var setServerName = "local";
var link = "";

brandlist.forEach(setTable);
loadTable();
loadLinkEvent();
function setTable(item, index) {

    link = `https://${item['sublink']}.kepler.local.sykes.io`;

    if (setServerName != 'local') {
        link = `https://${item['sublink']}.${setServerName}.staging.cottage-search.com`
    }

    var imageUrl = `${link}/images/white_labels/${item['sublink']}_favicon.png`;
    if (typeof item['favicon'] !== 'undefined') {
        imageUrl = `${link}/${item['favicon']}`;
    }

    // checkImageState(imageUrl, item['sublink']);

    rowList += `
            <div class="products-row" data-link="${link}">
                <button class="cell-more-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-more-vertical">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </button>
                <div class="product-cell image">
                    <img src="${imageUrl}"
                        alt="${item['sublink']}">
                    <span>${item['brand']}</span>
                </div>
                <div class="product-cell code"><span class="cell-label">Code:</span>${item['code']}</div>
                <div class="product-cell status-cell">
                    <span class="cell-label">Status:</span>
                    <span class="status disabled" id="${item['sublink']}">Offline</span>
                </div>
                <div class="product-cell sublink"><span class="cell-label">Sublink:</span>${item['sublink']}</div>
                <div class="product-cell note"><span class="cell-label">Note:</span>${item['notes']}</div>
            </div> `;
}

function loadTable() {
    document.querySelectorAll('.products-row').forEach(pRow => { pRow.remove(); });
    document.querySelector('.products-header').insertAdjacentHTML("afterend", rowList);
    rowList = "";
}

var serverTab = document.querySelectorAll(".server-tab");
serverTab.forEach(event =>
    event.addEventListener("click", function () {
        serverTab.forEach(sTab => sTab.classList.remove("active"));
        this.classList.add("active");
        setServerName = this.dataset.server;
        brandlist.forEach(setTable);
        loadTable();
        loadLinkEvent();
    })
);

function loadLinkEvent() {
    document.querySelectorAll(".products-row").forEach(brandRow =>
        brandRow.addEventListener("click", function () {
            window.open(brandRow.dataset.link, "_blank");
        })
    );
}

document.querySelectorAll("[data-sidebar-item]").forEach(sidebarItem =>
    sidebarItem.addEventListener("click", function () {
        document.querySelectorAll(".sidebar-list-item").forEach(e => {
            e.classList.remove('active');
        });
        sidebarItem.parentElement.classList.add('active');
        if (this.dataset.sidebarItem == 'staging') {
            environmentPanel.classList.remove('is-hidden');
            setServerName = 'tech';
            brandlist.forEach(setTable);
            loadTable();
            loadLinkEvent();
        } else {
            environmentPanel.classList.add('is-hidden');
        }
    })
);

function checkImageState(url, link) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        setTimeout(function () {
            rowId = document.querySelector('#' + link);
            rowId.classList.remove('disabled');
            rowId.classList.add('active');
            rowId.innerHTML = 'Active';
        }, 3000);
    }
    img.onerror = function () {
        console.log('Image not available.');
    };
}

var cards = document.querySelectorAll('.products-row')

function liveSearch() {
    let search_query = document.getElementById("searchbox").value;

    //Use innerText if all contents are visible
    //Use textContent for including hidden elements
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].textContent.toLowerCase()
            .includes(search_query.toLowerCase())) {
            cards[i].classList.remove("is-hidden");
        } else {
            cards[i].classList.add("is-hidden");
        }
    }
}

let typingTimer;
let typeInterval = 500;
let searchInput = document.getElementById('searchbox');

searchInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, typeInterval);
});

function sortBy(obj, key, order) {
    if (order == 'ASC') {
        obj.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    } else {
        obj.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    }
}