<template>
	<div id="parcels">
		<f7-page title="Parcels" sliding tabbar-fixed>
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-bars" open-panel="left"></f7-link>
				</f7-nav-left>
				<f7-nav-left>Parcels</f7-nav-left>
			</f7-navbar>

			<f7-toolbar tabbar labels>
				<f7-link href="#tab-transit" tab-link text="Transit"></f7-link>
				<f7-link href="#tab-delivered" tab-link text="Delivered"></f7-link>
				<f7-link href="#tab-blocked" tab-link text="Blocked"></f7-link>
			</f7-toolbar>

			<f7-tabs>
				<parcel-tab :state="'Transit'" @openOnMap="openOnMap"></parcel-tab>
				<parcel-tab :state="'Delivered'"></parcel-tab>
				<parcel-tab :state="'Blocked'"></parcel-tab>
			</f7-tabs>
		</f7-page>
	</div>
</template>
<script>
	import api from '@/api/index'
	import ParcelTab from '@/pages/parcel-tab.vue'

	var data = {
		parcels: {},
		isAllParcels: false
	};

	export default {
		components: {
			parcelTab: ParcelTab
		},
		props: {
			token: {}
		},
		data() {
			return data
		},
		methods: {
			openOnMap: function (location_from, location_to, name) {
				console.log(location_from)
				this.$emit('openOnMap', location_from, location_to, name)
			}
		},
		created: function (e) {
			this.$emit('setToken', localStorage.getItem('token'))
//			this.token = localStorage.getItem('token');
//			this.$on('loadParcels');
////            if (!this.isAllParcels)
////                api.loadActiveParcels(this.token, setParcels);
////            else
//			api.loadAllParcels(this.token, setParcels)

		},
		mounted: function () {
			this.$nextTick(function () {
				window.f7.showTab('#tab-transit')
			})
		}
	}
</script>