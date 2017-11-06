<template>
	<div id="approveParcel">
		<f7-page title="Approve" sliding >
			<f7-navbar style="background: #60bf84;">
				<f7-nav-left>
					<f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					<!--564R5{{name}}TT89-->
					Approve
				</f7-nav-left>
			</f7-navbar>
			<img src="images/confirm.png" id="approveicon"class="">
			<f7-block-title class="title-style">Confirm receipt of the {{name}}</f7-block-title>
			<img src="http://cdn.onlinewebfonts.com/svg/img_71904.png" id="trash" @click="clear()"class="">
			<f7-block class="canvas1 center-my">

				<div id="watermark">
					Please, sign here

				</div>
				<vueSignature  ref="signature" :sigOption="sigConfig" ></vueSignature>
				<f7-buttons>
					<f7-button  fill class="buttonConfirm" @click="save()" style="    background-color: #60bf84;">Confirm</f7-button>
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