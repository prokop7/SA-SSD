<template>
	<div id="parcels">
		<f7-page title="Parcels" sliding tabbar-fixed>
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-bars" open-panel="left"></f7-link>
				</f7-nav-left>
				<f7-nav-left>Parcels</f7-nav-left>
				<!-- refresh list of parcels - start-->
				<f7-nav-right><i class="material-icons refresh1" @click="onRefresh">refresh</i></f7-nav-right>
				<!-- refresh list of parcels - end-->
			</f7-navbar>
			<!-- 3 states of parcels: Transit, Delivered, Blocked - start-->
			<f7-toolbar tabbar labels class="remove-shadow">
				<f7-link href="#tab-transit" tab-link text="Transit"></f7-link>
				<f7-link href="#tab-delivered" tab-link text="Delivered"></f7-link>
				<f7-link href="#tab-blocked" tab-link text="Blocked"></f7-link>
			</f7-toolbar>
			<!-- 3 states of parcels: Transit, Delivered, Blocked-->
			<f7-tabs>
				<parcel-tab :state="'Transit'"
				            @openOnMap="openOnMap"
				            @approveParcel="approveParcel"
				            @rejectParcel="rejectParcel">
				</parcel-tab>
				<parcel-tab :state="'Delivered'"></parcel-tab>
				<parcel-tab :state="'Blocked'"></parcel-tab>
			</f7-tabs>

			<!-- floating action button: search parcels near driver location-->
			<f7-fab color="#2196f3" @click="$emit('loadSearch')">
				<i class="material-icons">search</i>
			</f7-fab>
		</f7-page>
	</div>
</template>
<script>
	import api from '@/api/index'
	import ParcelTab from '@/pages/parcel-tab.vue'
	import {bus} from '@/main'

	var data = {
		parcels: {},
		isAllParcels: false,
		scrolled: false
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
			//refresh list of parcels
			onRefresh: function (event, done) {
				// As it was mentioned the method loadParcels is inside child component.
				// To call it we need to use "bus"
				bus.$emit("loadParcels", done);
			},
			openOnMap: function (location_from, location_to, name) {
				this.$emit('openOnMap', location_from, location_to, name)
			},
			loadParcels: function () {
				bus.$emit("loadParcels")
			},
			approveParcel: function (id, name) {
				this.$emit("approveParcel", id, name)
			},
			rejectParcel: function (id, name) {
				this.$emit("rejectParcel", id, name)
			}
		},
		created: function (e) {
			this.$emit('setToken', localStorage.getItem('token'))
		},
		mounted:
			function () {
				this.$nextTick(function () {
					window.f7.showTab('#tab-transit')
				});
			}
	}
</script>