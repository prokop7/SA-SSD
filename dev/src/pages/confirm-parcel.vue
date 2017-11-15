<template>
	<div id="confirmParcel">
		<f7-page :title="state" sliding>
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					{{state}} {{name}}
				</f7-nav-left>
			</f7-navbar>
			<f7-block style="margin: 0 !important;">
				<form style="margin-top:40px" v-if="state==='Reject'">
					<div class="group">
						<input v-model="rejectedMessage" type="text" required>
						<span class="highlight"></span>
						<span class="bar"></span>
						<label>Reason</label>
					</div>
				</form>
				<f7-block-title style="font-size: 16px; margin: 20px 0 16px;">
					<f7-label>Signature</f7-label>
				</f7-block-title>
				<i class="material-icons icon-style" id="approveicon">verified_user</i>
				<i class="material-icons icon-style" id="retry" @click="clear()">replay</i>
				<vueSignature ref="signature" :sigOption="sigConfig"></vueSignature>
				<f7-button class="buttonConfirm center-my button-fill-my"
				           fill
				           @click="save()">
					Confirm
				</f7-button>
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
			token: {},
			state: ""
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
				var status_id = (this.state === 'Approve') ? 5 : 6;
				var data = {img: image, parcelId: this.id, statusId: status_id}

				if (this.state === 'Reject' && this.rejectedMessage.length < 3){
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
				});
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
				context.fillText("Please, sign here", canvas.width / 2, canvas.height / 2);
			},
			resizeCanvas() {
				//draw canvas
				var canvas = document.querySelector(".canvas");
				canvas.width = innerWidth;
				canvas.height = innerHeight / 3;
				canvas.style.background = 'white';
				canvas.style.border = '2px dashed rgba(0, 0, 0, .2)';
				canvas.style.paddingLeft = '0';
				canvas.style.paddingRight = '0';
				canvas.style.marginLeft = 'auto';
				canvas.style.marginRight = 'auto';
				canvas.style.display = 'block';
				canvas.style.maxWidth = '100%';
//                canvas.style.height='-webkit-fill-available';
				//draw placeholder inside canvas
				var context = canvas.getContext('2d');
				context.fillStyle = "rgba(0, 0, 0, .2)";
				context.font = "24px Roboto";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText("Please, sign here", canvas.width / 2, canvas.height / 2);
			}
		},
		mounted: function () {
			this.resizeCanvas()

			window.addEventListener("resize", this.resizeCanvas);
		}
	};
</script>