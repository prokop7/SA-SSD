<template>
	<div id="google-map">
		<f7-page title="Map" sliding>
			<f7-navbar class="remove-shadow">
				<f7-nav-left>
					<f7-link icon="icon-back" link="#" @click="$emit('loadParcels')"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					{{name}}
				</f7-nav-left>
			</f7-navbar>
			<!--Buttons to open in Map Application-->
			<f7-buttons class="buttons-map">
				<f7-button class="button button-map" @click="openOnMap(from.lat, from.lng)">From</f7-button>
				<f7-button class="button button-map" @click="openOnMap(to.lat, to.lng)">To</f7-button>
			</f7-buttons>
			<div id="map-field"></div>
		</f7-page>
	</div>
</template>
<script>
	export default {

		props: {
			from: {},
			to: {},
			pos: {},
			name: {}
		},
		methods: {
			onError: function (e) {
				console.log(e)
			},
			setupMap() {
				const element = document.getElementById('map-field')
				var directionsService = new google.maps.DirectionsService;
				var directionsDisplay = new google.maps.DirectionsRenderer;

				var position = (this.pos.coords) ? {
					lat: this.pos.coords.latitude,
					lng: this.pos.coords.longitude,
				} : this.from;
				const options = {
					zoom: 14,
					center: position
				}
				const map = new google.maps.Map(element, options);
				directionsDisplay.setMap(map);
				var my_loc = new google.maps.Marker({
					position: position,
					map: map
				});
				var loc = new google.maps.LatLng(my_loc.position.latitude, my_loc.position.longitude);

				directionsService.route({
					origin: this.from,
					destination: this.to,
					travelMode: 'DRIVING'
				}, function (response, status) {
					if (status === 'OK') {
						directionsDisplay.setDirections(response);
					} else if (status === 'ZERO_RESULTS') {
						window.alert('Can\'t find a route.');
					} else {
						window.alert('Directions request failed due to ' + status);
					}
				});
			},
			openOnMap(lat, lng) {
				window.open("geo:" + lat + ',' + lng);
			}
		},
		mounted() {
			// As soon as component is mounted we're setting up the Map.
			this.setupMap()
		}
	}
</script>