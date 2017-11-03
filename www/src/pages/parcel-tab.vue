<template>
	<f7-tab :id="'tab-' + state.toLowerCase()">
		<f7-card v-for="parcel in parcels"
		         v-if="parcel.status === state"
		         :key="parcel.id">
			<f7-card-header>{{parcel.name}}</f7-card-header>
			<f7-card-content>
				<f7-list>
					<ul>
						<f7-list-item accordion-item :title="parcel.to.address">
							<f7-accordion-content>
								<f7-block>
									<p>From: {{parcel.from.address}}</p>
									<p>To: {{parcel.to.address}}</p>
									<p>Location: {{parcel.location.address}}</p>
									<p>Email: {{parcel.sender.email}}</p>
									<p>Phone: {{parcel.phones.to}}</p>
									<p>Status: {{parcel.status}}</p>
								</f7-block>
								<f7-card-footer v-if="parcel.status === 'Transit'">
									<f7-buttons>
										<!--<f7-button @click="approveParcel(parcel.id)" color="green">-->
										<f7-button @click=" $emit('approveParcel', parcel.from, parcel.to, parcel.name)">

										Approve
										</f7-button>
										<f7-button @click=" $emit('openOnMap', parcel.from, parcel.to, parcel.name)">
											Map
										</f7-button>
										<f7-button @click="rejectParcel(parcel.id)" color="red">
											Reject
										</f7-button>
									</f7-buttons>
								</f7-card-footer>
							</f7-accordion-content>
						</f7-list-item>
					</ul>
				</f7-list>
			</f7-card-content>
		</f7-card>
	</f7-tab>
</template>
<script>
	import api from '@/api/index'
	import {bus} from '@/main'

	var data = {
		parcels: {}
	}

	export default {
		props: {
			state: {}
		},
		data: function () {
			return data;
		},
		methods: {
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
			},
			setParcels(parcels) {
				this.parcels = parcels
			},
			loadParcels(event, done) {
				api.loadAllParcels(this.token, this.setParcels)
				if (done)
					setTimeout(function () {
						done();
					}, 1000);
			},
		},
		created: function () {
			this.token = localStorage.getItem('token')
			this.loadParcels()
		},
		mounted: function () {
			this.$nextTick(function () {
				bus.$on('loadParcels', this.loadParcels)
			})
		}

	}
</script>