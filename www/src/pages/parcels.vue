<template>
	<div id="parcels">
		<f7-page title="Parcels" back-link="Back" sliding>
			<f7-navbar>
				<f7-nav-left>
					<f7-link icon="icon-bars" open-panel="left"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					Parcels
				</f7-nav-left>
			</f7-navbar>
			<f7-list>
				<ul>
					<f7-list-item accordion-item v-for="parcel in data" :key="parcel.id" :title="parcel.name">
						<f7-accordion-content>
							<f7-block>
								<p>From: {{parcel.from}}</p>
								<p>To: {{parcel.to}}</p>
								<p>Location: {{parcel.location}}</p>
								<p>Email: {{parcel.sender.email}}</p>
								<p>Status: {{parcel.status}}</p>
							</f7-block>
							<f7-buttons>
								<f7-button @click="$emit('remove', parcel.id)" color="green">Approve</f7-button>
								<f7-button @click="$emit('remove', parcel.id)" color="red">Reject</f7-button>
							</f7-buttons>
						</f7-accordion-content>
					</f7-list-item>
				</ul>
			</f7-list>
		</f7-page>
	</div>
</template>
<script>
	import api from '@/api/index'

	var data = {};
	function setData(e) {
		data = e.data
	}


	export default {
		props: {
			token: {
				required: true
			},
			data: this.data
		},
		data: function () {
			return data
		},
		created: function (e) {
			api.loadActiveParcels(this.token, setData)
		}
	}
</script>