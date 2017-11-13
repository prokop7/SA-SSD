<template>
    <div id="search-parcel">
        <f7-page title="Search" sliding>
            <f7-navbar>
                <f7-nav-left>
                    <f7-link icon="icon-back" link="#" @click="loadBack()"></f7-link>
                </f7-nav-left>
                <f7-nav-left>Parcels nearby</f7-nav-left>
            </f7-navbar>
            <div v-if='onMap===false'>


                <f7-block-title>
                    <f7-label class="leftstr range1">Search Distance:</f7-label>
                    <f7-label class="rightstr range1">{{range}} km</f7-label>
                </f7-block-title>
                    <f7-card class="remove-shadow sliders">


                        <f7-input v-model="range" type="range" min="1" max="100" step="1"></f7-input>

                    </f7-card>

                <f7-buttons>
                    <f7-button @click="loadParcels()" color="green">Apply</f7-button>
                    <f7-button @click="loadMap()">Show on map</f7-button>
                </f7-buttons>


                <f7-card v-for="parcel in parcelsList"
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
            </div>
            <near-parcels-map v-if="onMap===true"
                              :parcels="parcelsList"
                              :radius="range"
                              :pos="location"
                              @loadBack="loadBack">
            </near-parcels-map>
        </f7-page>
    </div>
</template>
<script>
    import api from '@/api/index'
    import nearParcelsMap from "@/pages/near-parcels-map.vue"

    var data = {
        parcelsList: {},
        onMap: false,
        range: 5
    }

    export default {
        components: {
            nearParcelsMap
        },
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
                var pos = {lat: this.location.coords.latitude, lng: this.location.coords.longitude}
                api.searchParcels(this.token, pos, this.range, this.setParcels)
                if (done)
                    done()
            },
            refreshParcels() {
                this.loadParcels()
            },
            acceptParcel(parcel_id) {
                api.updateParcel(this.token, parcel_id, 3, this.refreshParcels)
            },
            loadMap() {
                this.loadParcels()
                this.onMap = !this.onMap
            },
            loadBack() {
                if (this.onMap)
                    this.loadMap()
                else
                    this.$emit('loadParcels')
            }
        },
        created: function () {
            this.token = localStorage.getItem('token')
        },
        mounted: function () {
            this.$nextTick(function () {
                this.refreshParcels()
            })
        }
    }
</script>