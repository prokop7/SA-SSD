<template>
	<div id="google-map">
		<f7-page title="Map" sliding>
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-bars" open-panel="left"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					Map1
				</f7-nav-left>
			</f7-navbar>
			<f7-block inner>
				<div id="map-field"></div>
			</f7-block>
		</f7-page>
	</div>
</template>
<script>
	export default {
		props: {
			from: {},
			to: {}
		},

		mounted() {
			const element = document.getElementById('map-field')
			var uluru = {
				"lat": 34.1358289,
				"lng": -117.9220826
			};
			var uluru2 = {
				"lat": 34.1358289,
				"lng": -120.9220826
			};
			const options = {
				zoom: 14,
				center: uluru
			}
			var bounds  = new google.maps.LatLngBounds();
			const map = new google.maps.Map(element, options);
			var marker1 = new google.maps.Marker({
				position: uluru,
				map: map
			});
			var loc = new google.maps.LatLng(marker1.position.lat(), marker1.position.lng());
			bounds.extend(loc);
			var marker2 = new google.maps.Marker({
				position: uluru2,
				map: map
			});
			loc = new google.maps.LatLng(marker2.position.lat(), marker2.position.lng());
			bounds.extend(loc);
			map.fitBounds(bounds)
		}
	}
</script>