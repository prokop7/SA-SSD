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
						            :to="to">
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
		initialize: function() {
			this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicitly call 'app.receivedEvent(...);'
		onDeviceReady: function() {
			console.log('Received Device Ready Event');
			console.log('calling setup push');
			api.setupPush();
		},
		onSuccess: function (pos) {
			console.log(pos)
		}
	};

	var data;
	data = {
		"data": [
			{
				"id": 1,
				"name": "Toy Gun",
				"from": null,
				"to": null,
				"location": null,
				"creator": {
					"id": 1,
					"name": "anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer",
					"phone": "89991626709"
				},
				"sender": {
					"id": 1,
					"name": "anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer",
					"phone": "89991626709"
				},
				"driver": null,
				"status": "Created",
				"created_at": {
					"date": "2017-10-17 09:26:30.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-17 09:26:30.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"phones": {
					"from": "89991626709",
					"to": "89994005050"
				}
			}
		],
		"token": localStorage.getItem('token'),
		name: localStorage.getItem('name'),
		state: 'parcels',
		from: 0,
		to: 0,
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
			openOnMap(location_from, location_to, name){
				this.from = location_from
				this.to = location_to
				this.parcelName = name
				console.log(location_from)
				this.loadMap()
			},
			notify() {
				window.f7.addNotification({
					title: 'Framework7',
					message: 'This is a simple notification message with title and message'
				})
			}
		},
		mounted: function() {
			app.initialize()
		}
	}
</script>