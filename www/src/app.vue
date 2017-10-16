<template>
	<!-- App -->
	<div id="app">
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		<left-panel></left-panel>
		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" main>
				<!-- Pages -->
				<f7-pages navbar-through>
					<parcels @remove="removeParcel" :token="token">
					</parcels>
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
	import LoginScreen from './pages/login.vue'


	var data;
	data = {
		"data": [
			{
				"id": 1,
				"name": "Name new",
				"from": "from",
				"to": "to",
				"location": "Moscow",
				"creator": {
					"id": 1,
					"name": "Jammie Grady",
					"email": "bode.jacky@example.com",
					"role": "driver"
				},
				"sender": {
					"id": 1,
					"name": "Jammie Grady",
					"email": "bode.jacky@example.com",
					"role": "driver"
				},
				"driver": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"status": "Delivered",
				"created_at": {
					"date": "2017-10-10 12:29:16.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-15 08:40:23.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				}
			},
			{
				"id": 2,
				"name": "New name 2",
				"from": "Innopolis",
				"to": "123 Magiting Street Barangay Santolan, Pasig City 1610 PHILIPPINES",
				"location": "Stock",
				"creator": {
					"id": 8,
					"name": "Gheorghe Pinzaru",
					"email": "feross95@gmail.com",
					"role": "admin"
				},
				"sender": {
					"id": 8,
					"name": "Gheorghe Pinzaru",
					"email": "feross95@gmail.com",
					"role": "admin"
				},
				"driver": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"status": "Transit",
				"created_at": {
					"date": "2017-10-10 17:09:21.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-14 23:06:02.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				}
			},
			{
				"id": 3,
				"name": "Ultra Cool Parcel",
				"from": "Innopolis",
				"to": "Altay",
				"location": "Stock",
				"creator": {
					"id": 8,
					"name": "Gheorghe Pinzaru",
					"email": "feross95@gmail.com",
					"role": "admin"
				},
				"sender": {
					"id": 8,
					"name": "Gheorghe Pinzaru",
					"email": "feross95@gmail.com",
					"role": "admin"
				},
				"driver": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"status": "Blocked",
				"created_at": {
					"date": "2017-10-10 17:09:23.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-15 08:40:34.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				}
			},
			{
				"id": 4,
				"name": "toy phone webname",
				"from": "Russia",
				"to": "China",
				"location": "Moscow",
				"creator": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"sender": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"driver": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"status": "Transit",
				"created_at": {
					"date": "2017-10-10 22:45:01.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-14 23:06:08.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				}
			},
			{
				"id": 5,
				"name": "Toy Gun",
				"from": "Russia",
				"to": "China",
				"location": "Moscow",
				"creator": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"sender": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"driver": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"status": "Transit",
				"created_at": {
					"date": "2017-10-10 23:11:59.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-14 23:06:10.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				}
			},
			{
				"id": 6,
				"name": "Toy Car",
				"from": "Russia",
				"to": "China",
				"location": "Moscow",
				"creator": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"sender": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"driver": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"status": "Transit",
				"created_at": {
					"date": "2017-10-10 23:12:13.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-11 06:17:10.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				}
			},
			{
				"id": 7,
				"name": "Number two",
				"from": "innopolis",
				"to": "China",
				"location": "innopolis post office",
				"creator": {
					"id": 8,
					"name": "Gheorghe Pinzaru",
					"email": "feross95@gmail.com",
					"role": "admin"
				},
				"sender": {
					"id": 8,
					"name": "Gheorghe Pinzaru",
					"email": "feross95@gmail.com",
					"role": "admin"
				},
				"driver": {
					"id": 11,
					"name": "Anton",
					"email": "a.prokopev@innopolis.ru",
					"role": "customer"
				},
				"status": "Transit",
				"created_at": {
					"date": "2017-10-11 07:56:15.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				},
				"updated_at": {
					"date": "2017-10-14 23:06:16.000000",
					"timezone_type": 3,
					"timezone": "UTC"
				}
			}
		],
		"token": localStorage.getItem('token')
	};


	export default {
		components: {
			LeftPanel,
			Parcels,
			LoginScreen,
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
			}
		}
	}
</script>