<template>
    <div id="rejectParcel">
        <f7-page title="Reject" sliding>
            <f7-navbar>
                <f7-nav-left>
                    <f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
                </f7-nav-left>
                <f7-nav-left>
                    Reject
                </f7-nav-left>
            </f7-navbar>
            <!--<i class="material-icons icon-style" id="approveicon" >verified_user</i>-->
            <f7-block>
                <f7-block-title class="title-style">Confirm cancellation of the {{name}}</f7-block-title>
                <i class="material-icons icon-style"  id="retry" @click="clear()">replay</i>
                <vueSignature ref="signature" :sigOption="sigConfig"></vueSignature>

                <!--<i class="material-icons icon-style" id="reasonicon" >warning</i>-->
                <f7-block-title class="title-style">Why did you cancel the parcel? </f7-block-title>
                <f7-list form>

                    <!--<f7-input type="text" class="reject-input line input1" placeholder="Rejected message" v-model="rejectedMessage"></f7-input>-->

                </f7-list>
                <input class="input1" type="text" placeholder="Оставьте сообщение здесь">
                <f7-buttons>
                    <f7-button fill class="buttonConfirm" @click="save()" >
                        Confirm
                    </f7-button>
                </f7-buttons>
            </f7-block>
        </f7-page>
    </div>
</template>

<script>
	import api from "@/api"
    export default {
        props: {
            name: {},
            id: {},
	        token: {}
        },
        data() {
            return {
                sigConfig: {
                    penColor: "rgb(66, 133, 244)"
                },
                rejectedMessage: ""
            };
        },
        methods: {
            save() {
	            var _this = this;
	            var png = _this.$refs.signature.save()
	            var image = api.convert(png)
                var data = {img: image, parcelId: this.id, statusId: 6, rejectedMessage: this.rejectedMessage}
	            api.sendImage(this.token, data, function () {
		            _this.$emit('loadParcels')
	            }, function (eNum, e) {
		            alert(e.message)
	            })
            },
            clear() {
                var _this = this;
                _this.$refs.signature.clear();
                var canvas = document.querySelector(".canvas");
                //draw placeholder inside canvas
                var context = canvas.getContext('2d');
                context.fillStyle = "rgba(0, 0, 0, .2)";
                context.font = "24px Roboto";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText("Please, sign here", canvas.width/2,canvas.height/2);
            },
            resizeCanvas() {
                var canvas = document.querySelector(".canvas");
                canvas.width  =innerWidth;
                canvas.height = innerHeight/2;
                canvas.style.background='white';
                canvas.style.border='4px dashed rgba(0, 0, 0, .2)';
                canvas.style.paddingLeft='0';
                canvas.style.paddingRight='0';
                canvas.style.marginLeft='auto';
                canvas.style.marginRight='auto';
                canvas.style.display='block';
                canvas.style.width='-webkit-fill-available';
                //draw placeholder inside canvas
                var context = canvas.getContext('2d');
                context.fillStyle = "rgba(0, 0, 0, .2)";
                context.font = "24px Roboto";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText("Please, sign here", canvas.width/2,canvas.height/2);
            }
        },
        mounted: function () {
            this.resizeCanvas()
        }
    };
</script>