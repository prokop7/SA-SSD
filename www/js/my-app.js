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

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

function createParcel() {
    var list = document.createElement('LI');
    list.className = "swipeout";

    var swipeout_content = document.createElement('DIV');
    swipeout_content.className = "swipeout-content";

    var item_content = document.createElement('DIV');
    item_content.className = "item-content";

    var item_media = document.createElement('DIV');
    item_media.className = "item-media";
    item_media.appendChild(document.createTextNode('Address'));

    var item_inner = document.createElement('DIV');
    item_inner.className = "item-inner";
    item_inner.appendChild(document.createTextNode('St. University, App-304'));

    item_content.appendChild(item_media);
    item_content.appendChild(item_inner);
    swipeout_content.appendChild(item_content);
    list.appendChild(swipeout_content);

    var approve = document.createElement('a');
    approve.href = '#';
    approve.innerHTML = 'Approve';
    approve.className = 'approve-button';
    var swipeout_close = document.createElement('a');
    swipeout_close.className = 'swipeout-close';
    swipeout_close.href = '#';
    swipeout_close.innerHTML = 'Close';
    var swipeout_actions_right = document.createElement('DIV');
    // var item_content2 = document.createElement('DIV');
    // item_content2.className = 'item-content'
    swipeout_actions_right.className = 'swipeout-actions-right';
    swipeout_actions_right.appendChild(approve);
    swipeout_actions_right.appendChild(swipeout_close);
    list.appendChild(swipeout_actions_right);
    return list;
}

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    // if (page.name === 'about') {
    //     // Following code will be executed for page with data-page attribute equal to "about"
    //     myApp.alert('Here comes About page');
    // }
});

onClickHandler();

$$('#addButton').on('click', function (e) {
    document.querySelector('#parclesList ul').appendChild(createParcel());
    onClickHandler();
});

function approveHandler(e) {
    e['path'][3].removeChild(e['path'][2]);
}

function onClickHandler() {
    $$('.approve-button').off('click', approveHandler);
    $$('.approve-button').on('click', approveHandler);
}




// // Option 2. Using live 'pageInit' event handlers for each page
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//     // Following code will be executed for page with data-page attribute equal to "about"
//     myApp.alert('Here comes About page');
// })