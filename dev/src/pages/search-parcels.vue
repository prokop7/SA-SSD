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

                <f7-block style="margin:0!important;">
                    <f7-block-title>
                        <f7-label class="leftstr range1">Search Distance:</f7-label>
                        <f7-label class="rightstr range1">{{range}} km</f7-label>
                    </f7-block-title>




                    <header>
                        <h2>Material Design Sliders</h2>
                    </header><!-- @end header -->

                    <!-- Main content -->
                    <main role="main" data-slider-color="slider-lightBlue">
                        <section>
                            <h3 class="heading">Light</h3>
                            <div class="wrap">
                                <div class="title">Continuous slider</div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-lightBlue">
                                            <input type="range" min="0" max="100" value="0">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Normal</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-scale slider-lightBlue">
                                            <input type="range" min="0" max="100" value="25">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Scale Effect</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-shadow slider-lightBlue">
                                            <input type="range" min="0" max="100" value="50">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Shadow Effect</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-shadow slider-lightBlue">
                                            <input type="range" min="0" max="100" value="65" disabled>
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Disabled</div>
                                </div>
                            </div>
                            <div class="wrap">
                                <div class="title">Discrete slider</div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-discrete slider-lightBlue">
                                            <input type="range" min="0" max="100" value="35">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Normal</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-discrete slider-lightBlue">
                                            <input type="range" min="0" max="100" value="65" disabled>
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Disabled</div>
                                </div>
                            </div>
                        </section>

                        <section class="bg-dark">
                            <h3 class="heading">Dark</h3>
                            <div class="wrap">
                                <div class="title">Continuous slider</div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-lightBlue slider-light">
                                            <input type="range" min="0" max="100" value="0">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Normal</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-scale slider-lightBlue slider-light">
                                            <input type="range" min="0" max="100" value="25">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Scale Effect</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-shadow slider-lightBlue slider-light">
                                            <input type="range" min="0" max="100" value="50">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Shadow Effect</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-continuous slider-shadow slider-lightBlue slider-light">
                                            <input type="range" min="0" max="100" value="65" disabled>
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Disabled</div>
                                </div>
                            </div>
                            <div class="wrap">
                                <div class="title">Discrete slider</div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-discrete slider-lightBlue slider-light">
                                            <input type="range" min="0" max="100" value="35">
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Normal</div>
                                </div>
                                <div class="holder">
                                    <div class="demo">
                                        <!-- rkmd-slider -->
                                        <div class="rkmd-slider slider-discrete slider-lightBlue slider-light">
                                            <input type="range" min="0" max="100" value="65" disabled>
                                        </div><!-- @end rkmd-slider -->
                                    </div>
                                    <div class="captions">Disabled</div>
                                </div>
                            </div>
                        </section>
                    </main><!-- @end main -->

                    <!-- Footer -->
                    <footer>
                        <div class="row">
                            <div class="footer-content">
                                <span><strong>Made in India</strong>,</span>
                                <span>by <a href="https://twitter.com/rkchauhan01" target="_blank">Ravikumar Chauhan</a>.</span>
                                <span><a href="https://github.com/rkchauhan" target="_blank">GitHub</a></span>
                                <span><a href="https://codepen.io/rkchauhan" target="_blank">CodePen</a></span>
                                <span><a href="http://uplabs.com/rkchauhan01" target="_blank">UpLabs</a></span>
                            </div>
                        </div>
                    </footer><!-- @end footer -->

                    <!-- color-box -->
                    <div class="color-box">
                        <a class="show-box"><i title="Select color" class="material-icons">invert_colors</i></a>
                        <p>Colors:</p>
                        <ul class="colors-list">
                            <li><a title="Teal" class="teal" data-slider-color="teal" onclick="return false;"></a></li>
                            <li><a title="Light Blue" class="lightBlue" data-slider-color="lightBlue" onclick="return false;"></a></li>
                            <li><a title="Green" class="green" data-slider-color="green" onclick="return false;"></a></li>
                            <li><a title="Amber" class="amber" data-slider-color="amber" onclick="return false;"></a></li>
                            <li><a title="Orange" class="orange" data-slider-color="orange" onclick="return false;"></a></li>
                            <li><a title="Cyan" class="cyan" data-slider-color="cyan" onclick="return false;"></a></li>
                            <li><a title="Pink" class="pink" data-slider-color="pink" onclick="return false;"></a></li>
                            <li><a title="Deep Purple" class="deepPurple" data-slider-color="deepPurple" onclick="return false;"></a></li>
                            <li><a title="Indigo" class="indigo" data-slider-color="indigo" onclick="return false;"></a></li>
                            <li><a title="Red" class="red" data-slider-color="red" onclick="return false;"></a></li>
                            <li><a title="Yellow" class="yellow" data-slider-color="yellow" onclick="return false;"></a></li>
                            <li><a title="Lime" class="lime" data-slider-color="lime" onclick="return false;"></a></li>
                            <li><a title="Brown" class="brown" data-slider-color="brown" onclick="return false;"></a></li>
                        </ul>
                    </div><!-- @end color-box -->




                    <f7-list form>
                        <f7-list-item style="background:white;">
                            <f7-input v-model="range" type="range" min="1" max="100" step="1"></f7-input>

                        </f7-list-item>

                    </f7-list>
                    <!--<div>-->
                        <!--<vue-slider v-ref:slider :value.sync="value"></vue-slider>-->
                    <!--</div>-->
                </f7-block>
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
        range: 5,
        value:1
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