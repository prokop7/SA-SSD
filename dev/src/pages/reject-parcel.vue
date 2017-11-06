<template>
    <div id="rejectParcel">
        <f7-page title="Reject" sliding >
            <f7-navbar style="background: #f57d00;">
                <f7-nav-left>
                    <f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
                </f7-nav-left>
                <f7-nav-left>
                    <!--564R5{{name}}TT89-->
                    Reject
                </f7-nav-left>
            </f7-navbar>
            <img src="http://pamirtimes.net/wp-content/uploads/2015/03/Security_Approved.png" id="approveicon"class="">
            <f7-block-title class="title-style">Confirm receipt of the {{name}}</f7-block-title>
            <f7-block>
                <img src="http://cdn.onlinewebfonts.com/svg/img_71904.png" id="trash" @click="clear()"class="">

                <div id="watermark">

                    <hr width="288px" align="center"  size="0" style="    border: 2px;"/>
                    Please, sign here

                </div>
                <vueSignature  ref="signature" :sigOption="sigConfig" class="canvas1" ></vueSignature>
                <f7-buttons>
                    <f7-button  fill  @click="save()" style="    background-color: #f57d00;"class="buttonConfirm">Confirm</f7-button>
                </f7-buttons>
            </f7-block>
        </f7-page>
    </div>
</template>

<script>
    export default {

        name:"approveParcel",
        props: {
            name: {},
            id: {}
        },
        data() {
            return {
                sigConfig: {
                    penColor: "rgb(66, 133, 244)"
                },
            };
        },

        methods: {
            save() {
                var _this = this;
                var png = _this.$refs.signature.save()
                var jpeg = _this.$refs.signature.save('image/jpeg')
                var svg = _this.$refs.signature.save('image/svg+xml');
                console.log(png);
                console.log(jpeg)
                console.log(svg)
            },
            clear() {
                var _this = this;
                _this.$refs.signature.clear();
            }
        }
    };
</script>