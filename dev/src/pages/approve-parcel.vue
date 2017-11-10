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
            <i class="material-icons icon-style" style="color: rgb(96, 191, 132);" id="approveicon" >verified_user</i>
            <f7-block-title class="title-style">Confirm receipt of the {{name}}</f7-block-title>
            <i class="material-icons icon-style"  id="trash" @click="clear()">replay</i>

            <f7-block>

                <div id="watermark">Please, sign here</div>
                    <vueSignature ref="signature" :sigOption="sigConfig"></vueSignature>

                <f7-buttons>
                    <f7-button fill class="buttonConfirm" @click="save()" style="margin-top:16px">
                        Confirm
                    </f7-button>
                </f7-buttons>
            </f7-block>
        </f7-page>
    </div>
</template>

<script>
    export default {

        name: "approveParcel",
        props: {
            name: {},
            id: {}
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
				var jpeg = _this.$refs.signature.save('image/jpeg')
				var svg = _this.$refs.signature.save('image/svg+xml');
				console.log(png);
				console.log(jpeg)
				console.log(svg)

			},
			clear() {
				var _this = this;
				_this.$refs.signature.clear();
			},
			resizeCanvas() {
				var canvas = document.getElementById("canvas");
				canvas.width  =innerWidth;
				canvas.height = 280;
                canvas.style.background='white';
                canvas.style.border='4px dashed rgba(0, 0, 0, .2)';
                canvas.style.paddingLeft='0';
                canvas.style.paddingRight='0';
                canvas.style.marginLeft='auto';
                canvas.style.marginRight='auto';
                canvas.style.display='block';
                canvas.style.width='-webkit-fill-available';
			}
		},
		mounted: function () {
			this.resizeCanvas()
		}
	};
</script>