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
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer;
			const options = {
				zoom: 14,
				center: this.from
			}
			const map = new google.maps.Map(element, options);

			directionsDisplay.setMap(map);

			directionsService.route({
				origin: this.from,
				destination:  this.to,
				travelMode: 'DRIVING'
			}, function(response, status) {
				if (status === 'OK') {
					directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});




//			var bounds  = new google.maps.LatLngBounds();
//			var from_loc = new google.maps.Marker({
//				position: this.from,
//				map: map
//			});
//			var loc = new google.maps.LatLng(from_loc.position.lat(), from_loc.position.lng());
//			bounds.extend(loc);
//			var to_loc = new google.maps.Marker({
//				position: this.to,
//				map: map
//			});
//			loc = new google.maps.LatLng(to_loc.position.lat(), to_loc.position.lng());
//			bounds.extend(loc);
//			map.fitBounds(bounds)
		}
	}
</script>