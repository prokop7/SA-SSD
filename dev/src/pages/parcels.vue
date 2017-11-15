<template>
    <div id="parcels">
        <f7-page title="Parcels" sliding tabbar-fixed pull-to-refresh @ptr:refresh="onRefresh">
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
            <!--<pull-refresh :next="onRefresh" >-->
            <!--<div slot="list">-->
            <!--Your code-->
            <!--</div>-->
            <!--</pull-refresh>-->
            <f7-tabs>
                <parcel-tab :state="'Transit'"
                            @openOnMap="openOnMap"
                            @approveParcel="approveParcel"
                            @rejectParcel="rejectParcel">
                </parcel-tab>
                <parcel-tab :state="'Delivered'"></parcel-tab>
                <parcel-tab :state="'Blocked'"></parcel-tab>
            </f7-tabs>
            <div id="test"></div>
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
            onScroll:function(e, position){
                alert("Fgfgf");
                console.log("Scrolling down");
                this.position = position;
            },
            handleScroll (event) {
                console.log("Scrolling down");
                // Any code to be executed
                // when the window is scrolled
            },
//            handleScroll: function(e) {
//                console.log("Scrolling down");
//                var currentScrollPosition = e.srcElement.scrollTop;
//                if (currentScrollPosition > this.scrollPosition) {
//                    console.log("Scrolling down");
//                }
//                this.scrollPosition = currentScrollPosition;
//            },
            myMethod(){
                console.log("my method");
                window.addEventListener("scroll", function(){
                    alert("Df");
                });
            },
//            handleScroll() {
//                window.addEventListener('scroll',function(){
//                    console.log('scroll!');
//                });
//                alert('Привет, ' + this.name + '!')
////                const fab = document.querySelector("f7-fab");
////                fab.style.display='none';
//
////                this.scrolled = window.scrollY > 0;
//
//            },

            onRefresh: function (event, done) {
                var self = this;
                bus.$emit("loadParcels", done);
//                setTimeout(function () {
//
//                }, 2000);
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
//        destroyed () {
//            window.removeEventListener('scroll', this.handleScroll);
//        },
        created: function (e) {
            window.addEventListener('scroll', this.handleScroll);
            this.$emit('setToken', localStorage.getItem('token'))

//			this.token = localStorage.getItem('token');
        },
        mounted:
            function () {
//            this.handleScroll();
                this.$nextTick(function () {
                    window.f7.showTab('#tab-transit')
                });
//                console.log("mounted");
//                this.myMethod();
////                document.querySelector
//                var elem1 = document.getElementById("parcels");

////                var elem1 = document.querySelector("#test");
//                window.addEventListener("scroll",()=>alert("hi"));
//                document.querySelector(#test.addEventListener("scroll", this.handleScroll(), false);
            }


    }
</script>