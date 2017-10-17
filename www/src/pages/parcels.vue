<template>
	<div id="parcels">
		<f7-page title="Parcels" sliding pull-to-refresh @ptr:refresh="loadParcels">
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-bars" open-panel="left"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					Parcels
				</f7-nav-left>
			</f7-navbar>
			<f7-list>
				<ul>
					<f7-list-group>
						<f7-list-item checkbox title="Show all parcels" @change="loadParcels" v-model="isAllParcels">
							<!--<f7-label>Show all parcels</f7-label>-->
							<!--<f7-input type="switch" v-model="isAllParcels" @change="loadParcels"></f7-input>-->
						</f7-list-item>
					</f7-list-group>
					<f7-list-item accordion-item v-for="parcel in parcels" :key="parcel.id" :title="parcel.name">
						<f7-accordion-content>
							<f7-block>
								<p>From: {{parcel.from}}</p>
								<p>To: {{parcel.to}}</p>
								<p>Location: {{parcel.location}}</p>
								<p>Email: {{parcel.sender.email}}</p>
								<p>Phone: {{parcel.phones.to}}</p>
								<p>Status: {{parcel.status}}</p>
							</f7-block>
							<f7-buttons v-if="parcel.status==='Transit'">
								<f7-button @click="approveParcel(parcel.id)" color="green">Approve</f7-button>
								<f7-button @click="rejectParcel(parcel.id)" color="red">Reject</f7-button>
							</f7-buttons>
						</f7-accordion-content>
					</f7-list-item>
				</ul>
			</f7-list>
		</f7-page>
	</div>
</template>
<script>
	import api from '@/api/index'

	var data = {
		parcels: {},
		isAllParcels: false
	};

	function setParcels(d) {
		data.parcels = d
	}

	export default {
		props: {
			token: {}
		},
		data() {
			return data
		},
		methods: {
			loadParcels(event, done) {
				if (!this.isAllParcels)
					api.loadActiveParcels(this.token, setParcels);
				else
					api.loadAllParcels(this.token, setParcels)
				if (done)
					setTimeout(function () {
						done();
					}, 1000);
			},
			approveParcel(parcelId) {
				api.updateParcel(this.token, parcelId, 5, this.removeParcel, function (e) {
					console.log(e)
				})
			},
			rejectParcel(parcelId) {
				api.updateParcel(this.token, parcelId, 6, this.removeParcel, function (e) {
					console.log(e)
				})
			},
			removeParcel(response) {
				this.loadParcels()
//				var idToRemove = response.params
//				this.parcels = this.parcels.filter(item => {
//					return item.id !== idToRemove
//				})
			},
			loadAllParcels(event, e) {
				console.log(event)
			}
		},
		created: function (e) {
			this.$emit('setToken', localStorage.getItem('token'))
			console.log('Я создался!')
			console.log(this.token)
//			this.token = localStorage.getItem('token');
			this.$on('loadParcels');
			if (!this.isAllParcels)
				api.loadActiveParcels(this.token, setParcels);
			else
				api.loadAllParcels(this.token, setParcels)

		}
	}
</script>