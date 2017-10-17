<template>
	<!-- App -->
	<div id="app">
		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>
		<left-panel :name="name"></left-panel>
		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" main>
				<!-- Pages -->
				<f7-pages navbar-through>
					<parcels v-if="token" @remove="removeParcel" :token="token">
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
		name: localStorage.getItem('name')
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
				this.$emit('loadParcels')
			}
		}
	}
</script>