// Initialize app
var myApp = new Framework7({
    swipePanel: 'left'
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
    swipePanel: 'left'
});


myApp.addView(".history-deliveries", {
    name: 'history'
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

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
        "                            <a href=\"#\" class=\"approve-button\">Approve</a>\n" +
        "                            <a href=\"#\" class=\"reject-button\">Reject</a>\n" +
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
        "                            <a href=\"#\" class=\"approve-button\">Approve</a>\n" +
        "                            <a href=\"#\" class=\"reject-button\">Reject</a>\n" +
        "                            <a href=\"#\" class=\"swipeout-close\">Close</a>\n" +
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
        "                                        <a href=\"#\" class=\"approve-button\">Approve</a>\n" +
        "                                        <a href=\"#\" class=\"reject-button\">Reject</a>\n" +
        "                                        <a href=\"#\" class=\"swipeout-close\">Close</a>\n" +
        "                                    </div>\n" +
        "                            </li>");
    return rows;
}

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
});

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
    $$('.approve-button').off('click', approveRejectHandler);
    $$('.approve-button').on('click', approveRejectHandler);
}

function onClickRejectHandler() {
    $$('.reject-button').off('click', approveRejectHandler);
    $$('.reject-button').on('click', approveRejectHandler);
}

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
