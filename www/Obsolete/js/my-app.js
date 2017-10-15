var myApp = new Framework7({
    swipePanel: 'left',
    material: true,
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

var $$ = Dom7;
var URL = 'https://tcsw.innopolis.dl-dev.ru/api/';

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    swipePanel: 'left'
});


myApp.addView(".history-deliveries", {
    name: 'history'
});

var api_token;

function appendParcels(parcels) {
    var node;
    node = mainView.activePage.name === 'current-parcels'
        ? document.querySelector('#parcelsList ul')
        : document.querySelector('#historyParcelList ul');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    if (mainView.activePage.name === 'current-parcels')
        parcels.forEach(function (obj) {
            var parcel = createParcel(obj.id, obj.name, obj.sender.name, obj.from, obj.to, obj.sender.email, obj.status);
            node.appendChild(parcel);
        });
    else {
        parcels.forEach(function (obj) {
            var parcel = createArchivedParcel(obj.id, obj.name, obj.sender.name, obj.from, obj.to, obj.sender.email, obj.status);
            node.appendChild(parcel);
        });
    }
    onClickApproveHandler();
    onClickRejectHandler();
}

function loadParcels() {
    if (mainView.activePage.name !== 'history-parcels')
        mainView.router.loadPage("history-parcels.html");
    ajax('GET', URL + "parcels/driver/my?api_token=" + api_token, '', appendParcels, errorCallback);
}

function loadActiveParcels() {
    if (mainView.activePage.name !== 'current-parcels')
        mainView.router.loadPage("current-parcels.html");
    ajax('GET', URL + "parcels/driver/my?status_id=3&api_token=" + api_token, '', appendParcels, errorCallback);
}


if (!getCookie('api_token')) {
    myApp.loginScreen();
} else {
    api_token = getCookie('api_token');
    document.querySelector('#driver-name').innerHTML = getCookie('name');
    loadActiveParcels();
}


function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function successSignIn(e) {
    myApp.closeModal();
    document.cookie = 'name=' + e.name + ";";
    document.cookie = 'email=' + e.email + ";";
    document.cookie = 'api_token=' + e.api_token + ";";
    api_token = e.api_token;
    document.querySelector('#driver-name').innerHTML = e.name;
    loadActiveParcels();
}

function errorSignIn(error_code, error) {
    var n = myApp.addNotification({message: error_code + ": " + error['errors'].email[0]});
    setTimeout(function () {
        myApp.closeNotification(n);
    }, 5000);
}

function errorCallback(e) {
    console.log(e);
}


$$('#sign-in').on('click', function () {
    var obj = {"email": $$('#input-login').val(), "password": $$('#input-password').val()};
    sign_in(URL + 'login', obj, successSignIn, errorSignIn);
});

$$('#sign-out').on('click', function () {
    myApp.closePanel();
    myApp.loginScreen();
    deleteCookie('api_token');
    deleteCookie('name');
    deleteCookie('email');
});

/**
 * @param {String} html representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function createParcel(id, parcel_name, sender, from, to, email, status) {
    return htmlToElement("<li class=\"swipeout accordion-item\" id=\"delivery-" + id + "\">\n" +
        "                                <a href=\"#\" class=\"item-content item-link\">\n" +
        "                                    <div class=\"item-inner\">\n" +
        "                                        <div class=\"swipeout-content\">\n" +
        "                                            <div class=\"item-title\">" + parcel_name + "</div>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </a>\n" +
        "                                <div class=\"accordion-item-content\">\n" +
        "                                    <div class=\"content-block\">\n" +
        "                                        <p>Name: " + sender + "</p>\n" +
        "                                        <p>From: " + from + "</p>\n" +
        "                                        <p>To: " + to + "</p>\n" +
        "                                        <p>Email: " + email + "</p>\n" +
        "                                        <p>Status: " + status + "</p>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"swipeout-actions-right\" id=\"swipeout-actions-right\">\n" +
        "                                    <a href=\"#\" class=\"approve-button approve-alert\">Approve</a>\n" +
        "                                    <a href=\"#\" class=\"reject-button reject-alert\">Reject</a>\n" +
        "                                </div>\n" +
        "                            </li>");
}

function createArchivedParcel(id, parcel_name, sender, from, to, email, status) {
    return htmlToElement("<li class=\"swipeout accordion-item\" id=\"delivery-" + id + "\">\n" +
        "                                <a href=\"#\" class=\"item-content item-link\">\n" +
        "                                    <div class=\"item-inner\">\n" +
        "                                        <div class=\"swipeout-content\">\n" +
        "                                            <div class=\"item-title\">" + parcel_name + "</div>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </a>\n" +
        "                                <div class=\"accordion-item-content\">\n" +
        "                                    <div class=\"content-block\">\n" +
        "                                        <p>Name: " + sender + "</p>\n" +
        "                                        <p>From: " + from + "</p>\n" +
        "                                        <p>To: " + to + "</p>\n" +
        "                                        <p>Email: " + email + "</p>\n" +
        "                                        <p>Status: " + status + "</p>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </li>");
}

$$(document).on('pageInit', function (e) {
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}


onClickApproveHandler();
onClickRejectHandler();

function deleteParcel(e) {
    console.log(e);
    $$("#delivery-" + e.params).remove();
}

function updateParcel(index, status_id) {
    ajaxWithParameters(
        'POST',
        URL + "parcels/" + index + "?api_token=" + api_token,
        {status_id: status_id},
        deleteParcel,
        errorCallback,
        index);
}

function approveHandler(e) {
    var li = e['path'][2];
    var id = li.id;
    var regex = /delivery-(\d+)/;
    var index = regex.exec(id)[1];
    updateParcel(index, 5);
}

function rejectHandler(e) {
    var li = e['path'][2];
    var id = li.id;
    var regex = /delivery-(\d+)/;
    var index = regex.exec(id)[1];
    updateParcel(index, 6);
}


function onClickApproveHandler() {
    $$('.approve-button').off('click', approveHandler);
    $$('.approve-button').on('click', approveHandler);

    //TODO temporary disabled.
    // $$('.approve-alert').on('click', function () {
    //     myApp.modalPassword('You private key please:', 'Customer input', function (password) {
    //         myApp.alert('Thank you for your cooperation!', 'Success');
    //     });
    // });
}


function onClickRejectHandler() {
    $$('.reject-button').off('click', rejectHandler);
    $$('.reject-button').on('click', rejectHandler);

    //TODO temporary disabled.
    // $$('.reject-alert').on('click', function () {
    //     myApp.prompt(
    //         'Why the user refused the parcel?',
    //         'Cancellation',
    //         function (value) {
    //             myApp.alert('The report is generated and sent!', 'Success');
    //         },
    //         function (value) {
    //             myApp.alert('CANCEL');
    //         }
    //     );
    // });
}

$$('.open-current-deliveries').on('click', loadActiveParcels);

$$('.open-history-deliveries').on('click', loadParcels);

$$('.addresses-warehouses').on('click', function (e) {
    console.log(mainView.router.loadPage('addresses-warehouses.html'));
    mainView.router.loadPage('addresses-warehouses.html');
});
