<template>
	<div id="near-parcels-map">
		<div id="map-field"></div>
	</div>
</template>
<script>
	var data = {}

	export default {
		props: {
			pos: {},
			parcels: {},
			radius: {}
		},
		data: function () {
			return data;
		},
		methods: {
			initMap: function () {
				if (!this.pos) {
					alert("Can't find a geolocation")
					this.$emit("loadBack")
					return;
				}
				var myPosition = new google.maps.LatLng(this.pos.coords.latitude, this.pos.coords.longitude)
				var map = new google.maps.Map(document.getElementById('map-field'), {
					zoom: 10,
					center: myPosition
				});
				var bounds = new google.maps.LatLngBounds();
				bounds.extend(myPosition);
				var myMarker = new google.maps.Marker({
					position: myPosition,
					animation: google.maps.Animation.BOUNCE,
					map: map
				});
				var cityCircle = new google.maps.Circle({
					strokeColor: '#FFFFF',
					strokeOpacity: 1,
					strokeWeight: 0.5,
					fillColor: '#0000FF',
					fillOpacity: 0.15,
					map: map,
					center: myPosition,
					radius: this.radius * 1000
				})
				this.parcels.map(function (p) {
					var loc = new google.maps.LatLng(p.from.lat, p.from.long)
					var marker = new google.maps.Marker({
						position: loc,
						label: p.name,
						map: map
					});
					bounds.extend(marker.position);
				})
				map.fitBounds(bounds);
			}
		},
		mounted() {
			this.$nextTick(function () {
				this.initMap()
			})
		}
	}
</script>