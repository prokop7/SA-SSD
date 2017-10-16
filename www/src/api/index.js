import * as ajax from './ajax'
export default {
	sign_in(url, data, successCallback, errorCallback) {
		ajax.request("POST", url, data, successCallback, errorCallback);
	},
	loadActiveParcels: ajax.loadActiveParcels,
	server_url: 'https://tcsw.innopolis.dl-dev.ru/api/',
}