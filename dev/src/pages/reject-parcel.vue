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
                <!--<div class="content-block-title">Why did you cancel the parcel?</div>-->
                <!--<f7-block-title>-->
                    <!--<f7-label class="range1">Why did you cancel the parcel?</f7-label>-->
                <!--</f7-block-title>-->
                <!--<f7-list form>-->

                    <!--<f7-list-item >-->
                        <!--<f7-label>Reason of cancellation</f7-label>-->
                        <!--<f7-input @keyup.enter="submit" type="text" placeholder="Rejected message"-->
                                  <!--v-model="rejectedMessage"></f7-input>-->
                    <!--</f7-list-item>-->


                <!--</f7-list>-->









                    <form style="margin-top:40px">

                        <div class="group">
                            <input v-model="rejectedMessage" type="text" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Reason</label>
                        </div>
                    </form>




                <f7-block-title style="margin: 0;font-size: 16px; margin-bottom: 16px;">
                    <f7-label>Signature</f7-label>
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
                rejectedMessage: ""

            };
        },
        methods: {
            confirm: function(){
                var v = this;
                console.log(this.$f7);
                this.$f7.addNotification({
                        message: 'Receiving the parcel was canceled!',
                        button: {
                            text: 'Success',
                            color: 'lightgreen'
                        }
                    });
            },
            clicIt(){ const canvas = document.querySelector(".canvas");

                const context = canvas.getContext('2d');
                context.fillStyle = "rgba(0, 0, 0, .2)";
                context.font = "24px Roboto";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText("Plefgfase, sign here", canvas.width / 2, canvas.height / 2);
            },
            save() {
//                this.confirm();
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
            },
            resizeCanvas() {
                console.log("resize")
                const canvas = document.querySelector(".canvas");

                canvas.style.background = 'white';
                canvas.style.border = '2px dashed rgba(0, 0, 0, .2)';
                canvas.style.paddingLeft = '0';
                canvas.style.paddingRight = '0';
                canvas.style.marginLeft = 'auto';
                canvas.style.marginRight = 'auto';
                canvas.style.display = 'block';
                canvas.style.maxWidth = '100%';
//                canvas.placeholder='dfdfd';
                canvas.width = innerWidth;
                canvas.height = innerHeight / 3;
//                canvas.placeholder("test")
//                canvas.placeholder="rtrtrtrt";
//                const context = canvas.getContext('2d');
//                context.placeholder='kllml';
//                context.fillStyle = "rgba(0, 0, 0, .2)";
//                context.font = "24px Roboto";
//                context.textAlign = "center";
//                context.textBaseline = "middle";
//                context.fillText("Please, sign here", canvas.width / 2, canvas.height / 2);
            }
        },
        mounted: function () {
            this.resizeCanvas();
            window.addEventListener("resize", this.resizeCanvas);
        }
    };
</script>