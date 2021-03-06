import * as ajax from './ajax'
import * as notifications from './notifications'
import * as converter from './converter'

// Implement Facade for accessing all third-party methods.
export default {
	signIn: ajax.signIn,
	loadActiveParcels: ajax.loadActiveParcels,
	searchParcels: ajax.searchParcels,
	loadAllParcels: ajax.loadAllParcels,
	updateParcel: ajax.updateParcel,
	sendGeolocation: ajax.sendGeolocation,
	sendImage: ajax.sendImage,
	server_url: 'https://tcsw.innopolis.dl-dev.ru/api/',
	setupPush: notifications.setupPush,
	convert: converter.toBlob
}