<template>
	<div id="approveParcel">
		<f7-page title="Approve" sliding>
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					{{name}}
				</f7-nav-left>
			</f7-navbar>
			<vueSignature ref="signature" :sigOption="sigConfig"></vueSignature>
		</f7-page>
	</div>
</template>

<script>
	export default {
		props: {
			name: {},
			id: {}
		},
		data() {
			return {
				sigConfig: {
					penColor: "rgb(0, 0, 0)"
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
			}
		}
	};
</script>