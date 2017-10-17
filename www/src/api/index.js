import * as ajax from './ajax'
export default {
	signIn: ajax.signIn,
	loadActiveParcels: ajax.loadActiveParcels,
	loadAllParcels: ajax.loadAllParcels,
	updateParcel: ajax.updateParcel,
	server_url: 'https://tcsw.innopolis.dl-dev.ru/api/',
}