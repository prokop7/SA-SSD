export const server_url = 'https://tcsw.innopolis.dl-dev.ru/api/';

export function request(type, url, data, successCallback, errorCallback) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function () {
		if (xhr.response) {
			if (xhr.status >= 200 && xhr.status < 400) {
				// console.log(xhr.status);
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

export function loadActiveParcels(token, appendParcels, errorCallback) {
	request('GET', server_url + "parcels/driver/my?status_id=3&api_token=" + token, '', appendParcels, errorCallback);
}

export function loadAllParcels(token, appendParcels, errorCallback) {
	request('GET', server_url + "parcels/driver/my?api_token=" + token, '', appendParcels, errorCallback);
}

export function requestWithParameters(type, url, data, successCallback, errorCallback, params) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function () {
		if (xhr.response) {
			if (xhr.status >= 200 && xhr.status < 400) {
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
				console.log(xhr.status);
				console.error(xhr.response);
				if (errorCallback)
					errorCallback({params: params, result: {status: xhr.status, response: xhr.response}});
			}
		} else {
			console.log(xhr.status);
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

export function updateParcel(token, index, status_id, successCallback, errorCallback) {
	requestWithParameters(
		'POST',
		server_url + "parcels/" + index + "?api_token=" + token,
		{status_id: status_id},
		successCallback,
		errorCallback,
		index);
}

export function signIn(data, successCallback, errorCallback) {
	request("POST", server_url + 'login', data, successCallback, errorCallback);
}

export function get(url, successCallback, errorCallback) {
	ajax("GET", url, '', successCallback, errorCallback);
}

export function sendGeolocation(token, location, successCallback, errorCallback) {
	request('POST', server_url + "users/driver?api_token=" + token, location, successCallback, errorCallback)
}

