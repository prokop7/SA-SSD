<template>
<!--<<<<<<< HEAD-->
    <!--<div id="parcels">-->
        <!--<f7-page title="Parcels" sliding pull-to-refresh @ptr:refresh="loadParcels" tabbar-fixed>-->

            <!--<f7-navbar>-->
                <!--<f7-nav-left>-->
                    <!--<f7-link icon="icon-bars" open-panel="left"></f7-link>-->
                <!--</f7-nav-left>-->
                <!--<f7-nav-left>-->
                    <!--Parcels-->
                <!--</f7-nav-left>-->
            <!--</f7-navbar>-->

            <!--<f7-tabs>-->

                <!--<f7-tab id="tabActive" active>-->
                    <!--<f7-card v-for="parcel in parcels" v-if="parcel.status!='Blocked'&&parcel.status!='Delivered'"-->
                             <!--:key="parcel.id">-->
                        <!--<f7-card-header>{{parcel.name}}</f7-card-header>-->
                        <!--<f7-card-content>-->
                            <!--<f7-list>-->
                                <!--<ul>-->
                                    <!--<f7-list-item accordion-item :title="parcel.to.address">-->
                                        <!--<f7-accordion-content>-->
                                            <!--<f7-block>-->
                                                <!--<p>From: {{parcel.from.address}}</p>-->
                                                <!--<p>To: {{parcel.to.address}}</p>-->
                                                <!--<p>Location: {{parcel.location.address}}</p>-->
                                                <!--<p>Email: {{parcel.sender.email}}</p>-->
                                                <!--<p>Phone: {{parcel.phones.to}}</p>-->
                                                <!--<p>Status: {{parcel.status}}</p>-->
                                            <!--</f7-block>-->
                                            <!--<f7-card-footer>-->
                                                <!--<f7-buttons v-if="parcel.status==='Transit'" style="width:100%">-->
                                                    <!--<f7-button-->
                                                            <!--@click="approveParcel(parcel.id)" color="green">-->
                                                        <!--Approve-->
                                                    <!--</f7-button>-->
                                                    <!--<f7-button-->
                                                            <!--@click=" $emit('openOnMap', parcel.from, parcel.to, parcel.name)">-->
                                                        <!--Map-->
                                                    <!--</f7-button>-->
                                                    <!--<f7-button-->
                                                            <!--@click="rejectParcel(parcel.id)" color="red">-->
                                                        <!--Reject-->
                                                    <!--</f7-button>-->
                                                <!--</f7-buttons>-->
                                            <!--</f7-card-footer>-->
                                        <!--</f7-accordion-content>-->
                                    <!--</f7-list-item>-->
                                <!--</ul>-->
                            <!--</f7-list>-->

                        <!--</f7-card-content>-->
                    <!--</f7-card>-->
                <!--</f7-tab>-->
                <!--<f7-tab id="tabDelivered">-->
                    <!--<f7-card v-for="parcel in parcels" v-if="parcel.status=='Delivered'" :key="parcel.id">-->
                        <!--<f7-card-header>{{parcel.name}}</f7-card-header>-->

                        <!--<f7-card-content>-->
                            <!--<f7-list>-->
                                <!--<ul>-->
                                    <!--<f7-list-item accordion-item :title="parcel.to.address">-->
                                        <!--<f7-accordion-content>-->
                                            <!--<f7-block>-->
                                                <!--<p>From: {{parcel.from.address}}</p>-->
                                                <!--<p>To: {{parcel.to.address}}</p>-->
                                                <!--<p>Location: {{parcel.location.address}}</p>-->
                                                <!--<p>Email: {{parcel.sender.email}}</p>-->
                                                <!--<p>Phone: {{parcel.phones.to}}</p>-->
                                                <!--<p>Status: {{parcel.status}}</p>-->
                                            <!--</f7-block>-->
                                        <!--</f7-accordion-content>-->
                                    <!--</f7-list-item>-->
                                <!--</ul>-->
                            <!--</f7-list>-->

                        <!--</f7-card-content>-->
                    <!--</f7-card>-->

                <!--</f7-tab>-->
                <!--<f7-tab id="tabBlocked">-->

                    <!--<f7-card v-for="parcel in parcels" v-if="parcel.status=='Blocked'" :key="parcel.id">-->
                        <!--<f7-card-header>{{parcel.name}}</f7-card-header>-->
                        <!--<f7-card-content>-->
                            <!--<f7-list>-->
                                <!--<ul>-->
                                    <!--<f7-list-item accordion-item :title="parcel.to.address">-->
                                        <!--<f7-accordion-content>-->
                                            <!--<f7-block>-->
                                                <!--<p>From: {{parcel.from.address}}</p>-->
                                                <!--<p>To: {{parcel.to.address}}</p>-->
                                                <!--<p>Location: {{parcel.location.address}}</p>-->
                                                <!--<p>Email: {{parcel.sender.email}}</p>-->
                                                <!--<p>Phone: {{parcel.phones.to}}</p>-->
                                                <!--<p>Status: {{parcel.status}}</p>-->
                                            <!--</f7-block>-->
                                        <!--</f7-accordion-content>-->
                                    <!--</f7-list-item>-->
                                <!--</ul>-->
                            <!--</f7-list>-->

                        <!--</f7-card-content>-->
                    <!--</f7-card>-->

                <!--</f7-tab>-->

            <!--</f7-tabs>-->


            <!--<f7-toolbar tabbar labels>-->
                <!--<f7-link href="#tabActive" tab-link text="Active" active></f7-link>-->
                <!--<f7-link href="#tabDelivered" tab-link text="Delivered"></f7-link>-->
                <!--<f7-link href="#tabBlocked" tab-link text="Blocked"></f7-link>-->
            <!--</f7-toolbar>-->
            <!--&lt;!&ndash;<f7-list>&ndash;&gt;-->
            <!--&lt;!&ndash;<ul>&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-list-group>&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-list-item checkbox title="Show all parcels" @change="loadParcels" v-model="isAllParcels">&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<f7-label>Show all parcels</f7-label>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<f7-input type="switch" v-model="isAllParcels" @change="loadParcels"></f7-input>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-list-item>&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-list-group>&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-list-item accordion-item v-for="parcel in parcels" :key="parcel.id" :title="parcel.name">&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-accordion-content>&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-block>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>From: {{parcel.from.address}}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>To: {{parcel.to.address}}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>Location: {{parcel.location.address}}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>Email: {{parcel.sender.email}}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>Phone: {{parcel.phones.to}}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p>Status: {{parcel.status}}</p>&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-block>&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-buttons v-if="parcel.status==='Transit'">&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-button @click="approveParcel(parcel.id)" color="green">Approve</f7-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-button @click=" $emit('openOnMap', parcel.from, parcel.to, parcel.name)">&ndash;&gt;-->
            <!--&lt;!&ndash;Map&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<f7-button @click="rejectParcel(parcel.id)" color="red">Reject</f7-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-buttons>&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-accordion-content>&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-list-item>&ndash;&gt;-->
            <!--&lt;!&ndash;</ul>&ndash;&gt;-->
            <!--&lt;!&ndash;</f7-list>&ndash;&gt;-->
        <!--</f7-page>-->
    <!--</div>-->
<!--=======-->
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
			<f7-fab color="pink" @click="loadParcels">
				<i class="material-icons">refresh</i>
			</f7-fab>
		</f7-page>
	</div>
<!--&gt;>>>>>> 3bb36a601f211635723d51b44e08c5de664c63a2-->
</template>
<script>
	import api from '@/api/index'
	import ParcelTab from '@/pages/parcel-tab.vue'
	import {bus} from '@/main'

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
			},
			loadParcels: function() {
				bus.$emit("loadParcels")
			}
		},
		created: function (e) {
			this.$emit('setToken', localStorage.getItem('token'))
//			this.token = localStorage.getItem('token');
//<<<<<<< HEAD
//            this.$on('loadParcels');
////            if (!this.isAllParcels)
////                api.loadActiveParcels(this.token, setParcels);
////            else
//            api.loadAllParcels(this.token, setParcels)
//
//        }
//    }
//=======
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
//>>>>>>> 3bb36a601f211635723d51b44e08c5de664c63a2
</script>