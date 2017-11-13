<template>
    <div id="approveParcel">
        <f7-page title="Approve" sliding>
            <f7-navbar>
                <f7-nav-left>
                    <f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
                </f7-nav-left>
                <f7-nav-left>
                    Approve
                </f7-nav-left>
            </f7-navbar>
            <i class="material-icons icon-style" id="approveicon">verified_user</i>
            <f7-block-title class="title-style">Confirm receipt of the {{name}}</f7-block-title>
            <i class="material-icons icon-style" id="retry" @click="clear()">replay</i>

            <f7-block>
                <vueSignature ref="signature" :sigOption="sigConfig"></vueSignature>
                <f7-buttons>
                    <f7-button fill class="buttonConfirm" @click="save()" style="margin-top:32px">
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
                }
            };

        },
		methods: {
			save() {
				var _this = this;
				var png = _this.$refs.signature.save()
				var image = api.convert(png)
                var data = {img: image, parcelId: this.id, statusId: 5}
                api.sendImage(this.token, data, function () {
	                _this.$emit('loadParcels')
                }, function (eNum, e) {
                	alert(e.message)
                })
			},
			clear() {
				var _this = this;
				_this.$refs.signature.clear();
                var canvas = document.getElementById("canvas");
                //draw placeholder inside canvas
                var context = canvas.getContext('2d');
                context.fillStyle = "rgba(0, 0, 0, .2)";
                context.font = "24px Roboto";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText("Please, sign here", canvas.width/2,canvas.height/2);
			},
			resizeCanvas() {
			    //draw canvas
				var canvas = document.getElementById("canvas");
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