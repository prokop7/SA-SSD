<template>
	<!-- App -->
	<div id="app">
		<!-- Statusbar -->
		<f7-statusbar>dfdfd</f7-statusbar>
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
						         @remove="removeParcel"
						         @openOnMap="openOnMap"
						         :token="token">
						</parcels>
						<warehouses v-if="state==='warehouses'">
						</warehouses>
						<google-map v-if="state==='map'"
						            :name="parcelName"
						            @loadParcels="loadParcels"
						            :from="from"
						            :to="to"
						            :pos="pos">
						</google-map>
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
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicitly call 'app.receivedEvent(...);'
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
			data.pos = pos
			api.sendGeolocation(data.token, position)

			app.aftereffect()
		},
		aftereffect: function () {
			setInterval(app.sendLocation, 60000)
		},
		sendLocation: function() {
			navigator.geolocation.getCurrentPosition(app.receivedLocation, app.onError);
		}

	};

	var data;
	data = {
		data: {},
		token: localStorage.getItem('token'),
		name: localStorage.getItem('name'),
		state: 'parcels',
		from: {},
		to: {},
		pos: {},
		parcelName: ""
	};


	export default {
		components: {
			LeftPanel,
			Parcels,
			LoginScreen,
			Warehouses,
			GoogleMap
		},
		data: function () {
			return data
		},
		props: {},
		methods: {
			removeParcel(idToRemove) {
				this.data = this.data.filter(item => {
					return item.id !== idToRemove
				})
			},
			setToken(token) {
				this.token = token
//				this.$emit('loadParcels')
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
			//TODO here called notification.
			notify() {
				window.f7.addNotification({
					title: 'Framework7',
					message: 'This is a simple notification message with title and message'
				})
			}
		},
		mounted: function () {
			app.initialize()
			data.name = localStorage.getItem('name')
			data.token = localStorage.getItem('token')
		}
	}
</script>