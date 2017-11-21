<template>
    <div id="search-parcel">
        <f7-page title="Search" sliding>
            <f7-navbar class="remove-shadow">
                <f7-nav-left>
                    <f7-link icon="icon-back" link="#" @click="loadBack()"></f7-link>
                </f7-nav-left>
                <f7-nav-left>Parcels nearby</f7-nav-left>
            </f7-navbar>
            <div v-if='onMap===false'>
                <f7-block style="margin:0!important;">
                    <f7-block-title class="range-title">
                        <f7-label class="range-title-inner">Search Distance:</f7-label>
                    </f7-block-title>
                    <div style="margin-top:48px;">
                        <vue-slider v-model="value"></vue-slider>
                    </div>
                </f7-block>

                <f7-button class="button-size center-my" fill @click="loadMap()" style="width: 120px">show on map
                </f7-button>

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
                              :radius="value"
                              :pos="location"
                              @loadBack="loadBack">
            </near-parcels-map>
        </f7-page>
    </div>
</template>

<script>
    import api from '@/api/index'
    import nearParcelsMap from "@/pages/near-parcels-map.vue"
    import vueSlider from 'vue-slider-component'

    var data = {
        parcelsList: {},
        onMap: false,
        value: 5,
    }

    export default {
        components: {
            nearParcelsMap,
            vueSlider
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
                console.log(this.value, "VALUE")
                var pos = {lat: this.location.coords.latitude, lng: this.location.coords.longitude}
                api.searchParcels(this.token, pos, this.value, this.setParcels)
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
            var timer = null;
            this.$watch(
                () => {
                    return this.value
                },
                (newVal, oldVal) => {
                    if (timer == null) {
                        //send api request throw 1500ms
                        timer = setTimeout(() => {
                            this.refreshParcels()
                            timer = null;
                        }, 1500);
                    }

                }
            )
            this.$nextTick(function () {
                this.refreshParcels()
            })
        }
    }
</script>