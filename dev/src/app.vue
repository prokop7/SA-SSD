<template>
	<!-- App -->
	<div id="app">
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		<left-panel
				:name="name"
				@logout="logout"
				@loadParcels="loadParcels"
				@loadWarehouses="loadWarehouses"
				:token="token"></left-panel>
		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" main>
				<!-- Pages -->
				<f7-pages navbar-through>
					<div v-if="token">
						<parcels v-if="state==='parcels'"
						         @openOnMap="openOnMap"
						         @approveParcel="approveParcel"
						         @rejectParcel="rejectParcel"
						         @loadSearch="loadSearch"
						         :token="token">
						</parcels>
						<warehouses v-if="state==='warehouses'">
						</warehouses>
						<confirm-parcel v-if="state==='Reject'||state==='Approve'"
						                :id="parcelId"
						                :state="state"
						                :name="parcelName"
						                @loadParcels="loadParcels"
						                :token="token">
						</confirm-parcel>
						<google-map v-if="state==='map'"
						            :name="parcelName"
						            :from="from"
						            :to="to"
						            :pos="pos"
						            @loadParcels="loadParcels">
						</google-map>
						<search-parcels v-if="state==='searchParcels'"
						                :location="pos"
						                @loadParcels="loadParcels">
						</search-parcels>
					</div>
				</f7-pages>
			</f7-view>
		</f7-views>
		<!-- Login Screen -->
		<login-screen @setToken="setToken" :token="token"></login-screen>
	</div>
</template>

<script>

	import LeftPanel from './pages/left-panel.vue'
	import Parcels from './pages/parcels.vue'
	import Warehouses from './pages/warehouses.vue'
	import LoginScreen from './pages/login.vue'
	import GoogleMap from './pages/google-map.vue'
	import ConfirmParcel from './pages/confirm-parcel.vue'
	import SearchParcels from './pages/search-parcels.vue'
	import api from '@/api/index'

	var app = {
		initialize: function () {
			this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function () {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		// onDeviceReady we are setting up notification and geolocation services.
		onDeviceReady: function () {
			api.setupPush();
			navigator.geolocation.getCurrentPosition(app.receivedLocation, app.onError);
		},
		onError: function (e) {
			window.alert(e)
		},
		receivedLocation: function (pos) {
			var position = {
				location: {
					lat: pos.coords.latitude,
					long: pos.coords.longitude,
					address: 'Somewhere'
				}
			}
			// Sending location to the server
			api.sendGeolocation(data.token, position)
			data.pos = pos;
			app.aftereffect()
		},
		// Every minute we're resending the location of a driver
		aftereffect: function () {
			setInterval(app.sendLocation, 60000)
		},
		sendLocation: function () {
			navigator.geolocation.getCurrentPosition(app.receivedLocation, app.onError);
		}
	};

	// Local data for internal uses of application.
	var data = {
		data: {},
		token: localStorage.getItem('token'),
		name: localStorage.getItem('name'),
		state: 'parcels',
		from: {},
		to: {},
		pos: {
			coords: {
				latitude: 55.753432,
				longitude: 48.741957
			}
		},
		parcelName: "",
		parcelId: 0
	};

	/***
	 * This is part of Vue framework.
	 *
	 * Components have:
	 * components - components are child components such are LeftPanel, LoginScreen etc
	 * props - property which are given from parent component.
	 * data - internal data to use it inside html layout.
	 * methods - functions which are also visible inside html.
	 *
	 * Components could have a mounted/created methods
	 * which will be called automatically after mounting or creating component.
	 */
	export default {
		components: {
			LeftPanel,
			Parcels,
			LoginScreen,
			Warehouses,
			GoogleMap,
			SearchParcels,
			ConfirmParcel
		},
		data: function () {
			return data
		},
		props: {},
		methods: {
			setToken(token) {
				this.token = token
			},
			logout() {
				this.token = ""
				localStorage.removeItem('token')
				localStorage.removeItem('email')
				localStorage.removeItem('name')
			},
			loadParcels() {
				this.state = 'parcels'
			},
			loadWarehouses() {
				this.state = 'warehouses'
			},
			loadMap() {
				this.state = 'map'
			},
			loadSearch() {
				this.state = 'searchParcels'
			},
			openOnMap(location_from, location_to, name) {
				var from = {
					'lat': location_from.lat,
					'lng': location_from.long
				}
				var to = {
					'lat': location_to.lat,
					'lng': location_to.long
				}
				this.from = from
				this.to = to
				this.parcelName = name
				this.loadMap()
			},
			approveParcel: function (id, name) {
				this.parcelId = id
				this.parcelName = name
				this.state = "Approve"
			},
			rejectParcel: function (id, name) {
				this.parcelId = id
				this.parcelName = name
				this.state = "Reject"
			}
		},
		mounted: function () {
			app.initialize()
			data.name = localStorage.getItem('name')
			data.token = localStorage.getItem('token')
		}
	}
</script>