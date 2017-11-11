<template>
	<div id="search-parcel">
		<f7-page title="Search" sliding>
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
				</f7-nav-left>
				<f7-nav-left>Parcels nearby</f7-nav-left>
			</f7-navbar>
			<f7-card v-for="parcel in parcelsList"
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
									</f7-block>
									<f7-card-footer>
										<f7-buttons>
											<f7-button @click="acceptParcel(parcel.id, parcel.name)"
											           color="green">
												Accept
											</f7-button>
										</f7-buttons>
									</f7-card-footer>
								</f7-accordion-content>
							</f7-list-item>
						</ul>
					</f7-list>
				</f7-card-content>
			</f7-card>
		</f7-page>
	</div>
</template>
<script>
	import api from '@/api/index'

	var data = {
		parcelsList: {}
	}

	export default {
		props: {
			location: {}
		},
		data: function () {
			return data
		},
		methods: {
			setParcels(parcels) {
				this.parcelsList = parcels;
			},
			loadParcels(done) {
				api.searchParcels(this.token, this.location, this.setParcels)
				if (done)
					done()
			},
			refreshParcels() {
				this.loadParcels()
			},
			acceptParcel(parcel_id) {
				api.updateParcel(this.token, parcel_id, 3, this.refreshParcels)
			}
		},
		created: function () {
			this.token = localStorage.getItem('token')
		},
		mounted: function () {
			this.$nextTick(function () {
				this.loadParcels()
			})
		}
	}
</script>