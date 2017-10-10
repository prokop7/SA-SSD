// Initialize app
var myApp = new Framework7({
    swipePanel: 'left',
    material: true
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var URL = 'https://tcsw.innopolis.dl-dev.ru/api/';

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
    swipePanel: 'left'

});


myApp.addView(".history-deliveries", {
    name: 'history'
});

var api_token;

function appendParcels(parcels) {
    var node = document.querySelector('#parcelsList ul');
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    parcels.forEach(function (obj) {
        var parcel = createParcel(obj.id, obj.name, obj.sender.name, obj.from, obj.to, obj.sender.email);
        document.querySelector('#parcelsList ul').appendChild(parcel);
    });
    onClickApproveHandler();
    onClickRejectHandler();
}

function loadParcels() {
    ajax('GET', URL + "parcels/driver/my?api_token=" + api_token, '', appendParcels, errorCallback);
}

function loadActiveParcels() {
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

function createParcel(id, parcel_name, sender, from, to, email) {
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
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"swipeout-actions-right\" id=\"swipeout-actions-right\">\n" +
        "                                    <a href=\"#\" class=\"approve-button approve-alert\">Approve</a>\n" +
        "                                    <a href=\"#\" class=\"reject-button reject-alert\">Reject</a>\n" +
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


// $$('#addButton').on('click', function (e) {
//     roomNumber++;
//     document.querySelector('#parclesList ul').appendChild(createParcel());
//     document.querySelector('body').appendChild(createParcelsFordelivery());
//     onClickApproveHandler();
//     onClickRejectHandler();
// });

onClickApproveHandler();
onClickRejectHandler();

function delete_delivery(node) {
    if (is_current) {
        node.childNodes[3].remove();
        history_del.childNodes[1].appendChild(node);
    }
}

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

// TODO divide them into two functions.
function approveHandler(e) {
    var li = e['path'][2];
    var id = li.id;
    var regex = /delivery-(\d+)/;
    var index = regex.exec(id)[1];
    updateParcel(index, 5);

    // delete_delivery(e['path'][2]);
    // // e['path'][3].removeChild(e['path'][2]);
    // if (isPopup && e['path'][3].childElementCount === 0) {
    //     var index;
    //     e['path'][6].classList.forEach(function (t) {
    //         var regex = /popup-delivery(\d+)/;
    //         if (t.match(regex)) {
    //             index = regex.exec(t)[1];
    //         }
    //     });
    //     $$('#delivery' + index).remove();
    //     myApp.closeModal($$('.popup-delivery' + index), false);
    //     delete_delivery($$('.popup-delivery' + index));
    // }
    // if (!isPopup) $$('.popup-' + e['path'][2].id).remove();
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
    // $$('.reject-button').off('click', approveRejectHandler);
    $$('.reject-alert').on('click', function () {
        myApp.prompt(
            'Why the user refused the parcel?',
            'Cancellation',
            function (value) {
                myApp.alert('The report is generated and sent!', 'Success');
            },
            function (value) {
                myApp.alert('CANCEL');
            }
        );
    });
}

/*
function onClickApproveHandler() {
    $$('.approve-button').off('click', approveRejectHandler);
    $$('.approve-button').on('click', approveRejectHandler);
}

function onClickRejectHandler() {
    $$('.reject-button').off('click', approveRejectHandler);
    $$('.reject-button').on('click', approveRejectHandler);
}
*/

var current_del = $$("#parclesList")[0];

// TODO correct initialization with dates.
// function getHistoryDeliveries() {
//     roomNumber++;
//     document.querySelector('body').appendChild(createParcelsFordelivery());
//     return htmlToElement("<div class=\"list-block\" id=\"parclesList\">\n" +
//         "                        <ul>\n" +
//         "                            <li class=\"swipeout\" id=\"delivery" + roomNumber + "\">\n" +
//         "                                <a href=\"#\" class=\"item-content item-link open-popup\" data-popup=\".popup-delivery" + roomNumber + "\">\n" +
//         "                                    <div class=\"swipeout-content\">\n" +
//         "                                        <div class=\"item-content item-title\">\n" +
//         "                                            <div class=\"item-media\">5/5. St. University, App-30" + roomNumber + "</div>\n" +
//         "                                        </div>\n" +
//         "                                    </div>\n" +
//         "                                </a>\n" +
//         "                            </li>\n" +
//         "                        </ul>\n" +
//         "                    </div>");
// }

var history_del;
var is_current = true;


$$('.open-current-deliveries').on('click', loadParcels);


$$('.open-history-deliveries').on('click', function (e) {
    if (!is_current) {
        history_del = $$("#parclesList")[0];
        return;
    }
    is_current = false;
    current_del = $$("#parclesList")[0];
    $$("#parclesList")[0].parentNode.replaceChild(history_del, $$("#parclesList")[0]);
});

$$('.open-addresses-warehouses').on('click', function (e) {
    if (!is_current) {
        history_del = $$("#parclesList")[0];
        return;
    }
    is_current = false;
    current_del = $$("#parclesList")[0];
    $$("#parclesList")[0].parentNode.replaceChild(history_del, $$("#parclesList")[0]);
});
