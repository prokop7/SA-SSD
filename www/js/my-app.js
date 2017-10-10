
// Initialize app
var myApp = new Framework7({
    swipePanel: 'left'
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var URL = 'https://tcsw.innopolis.dl-dev.ru/api/' ;

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

if (!getCookie('api_token')) {
    console.log(document.cookie.api_token);
    myApp.loginScreen();
} else {
    api_token = getCookie('api_token');
    document.querySelector('#driver-name').innerHTML =  getCookie('name');
}

function deleteCookie(name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function successSignIn(e) {
    myApp.closeModal();
    document.cookie = 'name=' + e.name + ";";
    document.cookie = 'email=' + e.email + ";";
    document.cookie = 'api_token=' + e.api_token + ";";
    api_token = e.api_token;
    document.querySelector('#driver-name').innerHTML =  e.name;
}

function errorCallback(e) {
    console.log(e);
}

$$('#sign-in').on('click', function (e) {
    var obj = {"email": $$('#input-login').val(), "password": $$('#input-password').val()};
    sign_in(URL + 'login', obj, successSignIn, errorCallback);
});

$$('#sign-out').on('click', function (e) {
    myApp.closePanel();
    myApp.loginScreen();
    deleteCookie('api_token');
    deleteCookie('name');
    deleteCookie('email');
});

var roomNumber = 0;

/**
 * @param {String} html representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}


function createParcelsFordelivery() {
    var rows = htmlToElement("<div class=\"popup popup-delivery" + roomNumber + "\">\n" +
        "    <div class=\"content-block\">\n" +
        "        <p>Date: 10/5.</p>\n" +
        "        <p>Address: St. University, App-" + roomNumber + "</p>\n" +
        "        <div class=\"list-block\">\n" +
        "            <ul>\n" +
        "                <li class=\"swipeout\">\n" +
        "                    <a href=\"#\" class=\"item-content item-link\">\n" +
        "                        <div class=\"swipeout-content\">\n" +
        "                            <div class=\"item-content item-title\">\n" +
        "                                <div class=\"item-media\">Toy Gun" + roomNumber + "</div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </a>\n" +
        "                        <div class=\"swipeout-actions-right\">\n" +
        "                            <a href=\"#\" class=\"approve-button approvealert\">Approve</a>\n" +
        "                            <a href=\"#\" class=\"reject-button rejectalert\">Reject</a>\n" +
        "                            <a href=\"#\" class=\"swipeout-close\">Close</a>\n" +
        "                        </div>\n" +
        "                </li>\n" +
        "                <li class=\"swipeout\">\n" +
        "                    <a href=\"#\" class=\"item-content item-link\">\n" +
        "                        <div class=\"swipeout-content\">\n" +
        "                            <div class=\"item-content item-title\">\n" +
        "                                <div class=\"item-media\">Toy Car</div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </a>\n" +
        "                        <div class=\"swipeout-actions-right\">\n" +
        "                            <a href=\"#\" class=\"approve-button approvealert\">Approve</a>\n" +
        "                            <a href=\"#\" class=\"reject-button rejectalert\">Reject</a>\n" +
        "                        </div>\n" +
        "                </li>\n" +
        "            </ul>\n" +
        "        </div>\n" +
        "        <p><a href=\"#\" class=\"close-popup\">Close delivery</a></p>\n" +
        "    </div>\n" +
        "</div>\n");
    return rows

}

function createDelivery() {
    var rows = htmlToElement("<li class=\"swipeout\" id=\"delivery" + roomNumber + "\">\n" +
        "                                <a href=\"#\" class=\"item-content item-link open-popup\"  data-popup=\".popup-delivery" + roomNumber + "\">\n" +
        "                                    <div class=\"swipeout-content\">\n" +
        "                                        <div class=\"item-content item-title\">\n" +
        "                                            <div class=\"item-media\">10/5. St. University, App-" + roomNumber + "</div>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </a>\n" +
        "                                    <div class=\"swipeout-actions-right\" id=\"swipeout-actions-right\">\n" +
        "                                        <a href=\"#\" class=\"approve-button approvealert\">Approve</a>\n" +
        "                                        <a href=\"#\" class=\"reject-button rejectalert\">Reject</a>\n" +
        "                                    </div>\n" +
        "                            </li>");
    return rows;
}

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}



$$('#addButton').on('click', function (e) {
    roomNumber++;
    document.querySelector('#parclesList ul').appendChild(createDelivery());
    document.querySelector('body').appendChild(createParcelsFordelivery());
  onClickApproveHandler();
  onClickRejectHandler();
});

onClickApproveHandler();
onClickRejectHandler();

function delete_delivery(node) {
    if (is_current) {
        node.childNodes[3].remove();
        history_del.childNodes[1].appendChild(node);
    }
}

// TODO divide them into two functions.
function approveRejectHandler(e) {
    var isPopup = e['path'][6].classList[0] === 'popup';
    delete_delivery(e['path'][2]);
    // e['path'][3].removeChild(e['path'][2]);
    if (isPopup && e['path'][3].childElementCount === 0) {
        var index;
        e['path'][6].classList.forEach(function (t) {
            var regex = /popup-delivery(\d+)/;
            if (t.match(regex)) {
                index = regex.exec(t)[1];
            }
        });
        $$('#delivery' + index).remove();
        myApp.closeModal($$('.popup-delivery' + index), false);
        delete_delivery($$('.popup-delivery' + index));
    }
    // if (!isPopup) $$('.popup-' + e['path'][2].id).remove();
}


function onClickApproveHandler() {
    //$$('.approvealert').off('click', approveRejectHandler1);
    $$('.approvealert').on('click', function () {
    myApp.modalPassword('You private key please:','Customer input', function (password) {
        myApp.alert('Thank you for your cooperation!','Success');
    });
});
}

function onClickRejectHandler() {
   // $$('.reject-button').off('click', approveRejectHandler);
    $$('.rejectalert').on('click', function () {
    myApp.prompt(
	 
	'Why the user refused the parcel?', 
	'Cancellation',
      function (value) {
        myApp.alert('The report is generated and sent!','Success');
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
function getHistoryDeliveries() {
    roomNumber++;
    document.querySelector('body').appendChild(createParcelsFordelivery());
    return htmlToElement("<div class=\"list-block\" id=\"parclesList\">\n" +
        "                        <ul>\n" +
        "                            <li class=\"swipeout\" id=\"delivery" + roomNumber + "\">\n" +
        "                                <a href=\"#\" class=\"item-content item-link open-popup\" data-popup=\".popup-delivery" + roomNumber + "\">\n" +
        "                                    <div class=\"swipeout-content\">\n" +
        "                                        <div class=\"item-content item-title\">\n" +
        "                                            <div class=\"item-media\">5/5. St. University, App-30" + roomNumber + "</div>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </a>\n" +
        "                            </li>\n" +
        "                        </ul>\n" +
        "                    </div>");
}

var history_del = getHistoryDeliveries();
var is_current = true;

$$('.open-current-deliveries').on('click', function (e) {
    if (is_current) {
        current_del = $$("#parclesList")[0];
        return;
    }
    is_current = true;
    history_del = $$("#parclesList")[0];
    $$("#parclesList")[0].parentNode.replaceChild(current_del, $$("#parclesList")[0]);
});


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
