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
                                    <f7-grid>
                                        <f7-col width="25">
                                            <p><b>From</b></p>
                                        </f7-col>
                                        <f7-col width="75">
                                            <p>{{parcel.from.address}}</p>
                                        </f7-col>
                                    </f7-grid>
                                    <f7-grid>
                                        <f7-col width="25">
                                            <p><b>To</b></p>
                                        </f7-col>
                                        <f7-col width="75">
                                            <p>{{parcel.to.address}}</p>
                                        </f7-col>
                                    </f7-grid>
                                    <f7-grid>
                                        <f7-col width="25">
                                            <p><b>Location</b></p>
                                        </f7-col>
                                        <f7-col width="75">
                                            <p>{{parcel.location.address}}</p>
                                        </f7-col>
                                    </f7-grid>
                                    <f7-grid>
                                        <f7-col width="25">
                                            <p><b>Email</b></p>
                                        </f7-col>
                                        <f7-col width="75">
                                            <p>{{parcel.sender.email}}</p>
                                        </f7-col>
                                    </f7-grid>
                                    <f7-grid>
                                        <f7-col width="25">
                                            <p><b>Phone</b></p>
                                        </f7-col>
                                        <f7-col width="75">
                                            <p>{{parcel.phones.to}}</p>
                                        </f7-col>
                                    </f7-grid>
                                    <f7-grid v-if="parcel.status==='Blocked'">
                                        <f7-col width="25">
                                            <p><b>Rejected reason</b></p>
                                        </f7-col>
                                        <f7-col width="75">
                                            <p>{{parcel.rejected_message}}</p>
                                        </f7-col>
                                    </f7-grid>
                                </f7-block>
                                <f7-card-footer v-if="parcel.status === 'Transit'">
                                    <f7-buttons>
                                        <f7-button @click=" $emit('approveParcel', parcel.id, parcel.name)"
                                                   color="green">
                                            Approve
                                        </f7-button>
                                        <f7-button @click=" $emit('openOnMap', parcel.from, parcel.to, parcel.name)">
                                            Map
                                        </f7-button>
                                        <f7-button @click="$emit('rejectParcel', parcel.id, parcel.name)" color="red">
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
            setParcels(parcels) {
                this.parcels = parcels
            },
            loadParcels(done) {
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