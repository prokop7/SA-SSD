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
            <f7-block style="margin:0!important;">
                <f7-block-title>
                    <f7-label class="range1">Why did you cancel the parcel?</f7-label>
                </f7-block-title>
                <f7-list form >

                    <f7-list-item style="background:white; border:2px solid rgba(0, 0, 0, .2);">
                        <f7-input @keyup.enter="submit"
                                  type="text"
                                  placeholder="Rejected message"
                                  v-model="rejectedMessage">
                        </f7-input>
                    </f7-list-item>
                </f7-list>

                <f7-block-title>
                    <f7-label class="range1">Confirm cancellation of the {{name}}</f7-label>
                </f7-block-title>
                <i class="material-icons icon-style" id="approveicon">verified_user</i>
                <i class="material-icons icon-style" id="retry" @click="clear()">replay</i>

                <vueSignature ref="signature" :sigOption="sigConfig"></vueSignature>

                <f7-button class="buttonConfirm center-my button-fill-my" fill @click="save()">Confirm</f7-button>

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
                rejectedMessage: "",
                valid: false
            };
        },
        methods: {
            save() {
                var _this = this;
                var png = _this.$refs.signature.save()
                var image = api.convert(png)
                var data = {img: image, parcelId: this.id, statusId: 6, rejectedMessage: this.rejectedMessage}
                console.log(this.rejectedMessage.length < 3)
                if (this.rejectedMessage.length < 3){
                	console.log(this)
                	window.f7.addNotification({
		                message: 'Reject message is to short or empty.'
	                });
                	return;
                }
                api.sendImage(this.token, data, function () {
                    _this.$emit('loadParcels')
                }, function (eNum, e) {
	                window.f7.addNotification({
		                message: 'Something went wrong'
	                });
	                _this.$emit('loadParcels')
                })
            },
            clear() {
                var _this = this;
                _this.$refs.signature.clear();
            },
            resizeCanvas() {
                const canvas = document.querySelector(".canvas");
                canvas.style.background = 'white';
                canvas.style.border = '2px dashed rgba(0, 0, 0, .2)';
                canvas.style.paddingLeft = '0';
                canvas.style.paddingRight = '0';
                canvas.style.marginLeft = 'auto';
                canvas.style.marginRight = 'auto';
                canvas.style.display = 'block';
                canvas.style.maxWidth = '100%';
                canvas.width = innerWidth;
                canvas.height = innerHeight / 3;
                const context = canvas.getContext('2d');
                context.fillStyle = "rgba(0, 0, 0, .2)";
                context.font = "24px Roboto";
                context.textAlign = "center";
                context.textBaseline = "middle";
//                context.fillText("Please, sign here", canvas.width / 2, canvas.height / 2);
            }
        },
        mounted: function () {
            this.resizeCanvas();
            window.addEventListener("resize", this.resizeCanvas);
        }
    };
</script>