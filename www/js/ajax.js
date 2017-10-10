function ajax(type, url, data, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.response) {
            if (xhr.status >= 200 && xhr.status < 400) {
                console.log(xhr.status);
                var result;
                try {
                    result = xhr.response.data;
                }
                catch (e) {
                    result = xhr.response.result;
                }
                if (successCallback)
                    successCallback(result);
            } else {
                console.error(xhr.response);
                if (errorCallback)
                    errorCallback(xhr.status, xhr.response);
            }
        } else {
            console.error('Response is absent!');
        }
    }
    xhr.onerror = function () {
        console.error(xhr.status);
        if (errorCallback)
            errorCallback(xhr.status);
    }
    xhr.responseType = 'json';
    xhr.send(JSON.stringify(data));
}

function ajaxWithParameters(type, url, data, successCallback, errorCallback, params) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.response) {
            if (xhr.status >= 200 && xhr.status < 400) {
                console.log(xhr.status);
                var result;
                try {
                    result = xhr.response.data;
                }
                catch (e) {
                    result = xhr.response.result;
                }
                if (successCallback)
                    successCallback({params: params, result: result});
            } else {
                console.error(xhr.response);
                if (errorCallback)
                    errorCallback({params: params, result: {status: xhr.status, response: xhr.response}});
            }
        } else {
            console.error('Response is absent!');
        }
    }
    xhr.onerror = function () {
        console.error(xhr.status);
        if (errorCallback)
            errorCallback({params: params, result: {status: xhr.status}});
    }
    xhr.responseType = 'json';
    xhr.send(JSON.stringify(data));
}

function get(url, successCallback, errorCallback) {
    ajax("GET", url, '', successCallback, errorCallback);
}

function sign_in(url, data, successCallback, errorCallback) {
    ajax("POST", url, data, successCallback, errorCallback);
}
