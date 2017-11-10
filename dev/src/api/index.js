import * as ajax from './ajax'
import * as notifications from './notifications'

export default {
	signIn: ajax.signIn,
	loadActiveParcels: ajax.loadActiveParcels,
	searchParcels: ajax.searchParcels,
	loadAllParcels: ajax.loadAllParcels,
	updateParcel: ajax.updateParcel,
	setParcel: ajax.setParcel,
	sendGeolocation: ajax.sendGeolocation,
	server_url: 'https://tcsw.innopolis.dl-dev.ru/api/',
	setupPush: notifications.setupPush
}