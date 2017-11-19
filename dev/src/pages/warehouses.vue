<template>
	<div id="warehouses">
		<f7-page title="Warehouses" sliding>
			<f7-navbar class="remove-shadow">
				<f7-nav-left>
					<f7-link icon="icon-bars" open-panel="left"></f7-link>
				</f7-nav-left>
				<f7-nav-left>
					Warehouses
				</f7-nav-left>
			</f7-navbar>
			<f7-card>
				<f7-card-header>Warehouse "FISH AND FOOD"</f7-card-header>
				<f7-card-content>
					<div id="space-between-icon-and-text_icon"><i class="material-icons icon-opacity"
					                                              style="color: red;">room</i>
					</div>
					<div id="space-between-icon-and-text_text">832 Uxbridge Road, Hayes UB4 0RR, United Kingdom</div>
				</f7-card-content>
				<f7-card-footer>
					<div id="space-between-icon-and-text_icon"><i class="material-icons icon-opacity"
					                                              style="color: green;">phone</i></div>
					<div id="space-between-icon-and-text_text">333-345-45-23</div>
				</f7-card-footer>
			</f7-card>
			<f7-card>
				<f7-card-header>Warehouse "H&P"</f7-card-header>
				<f7-card-content>
					<div id="space-between-icon-and-text_icon"><i class="material-icons icon-opacity"
					                                              style="color: red;">room</i>
					</div>
					<div id="space-between-icon-and-text_text">360-366 Oxford St, London W1N 9HA, United Kingdom</div>
				</f7-card-content>
				<f7-card-footer>
					<div id="space-between-icon-and-text_icon"><i class="material-icons icon-opacity"
					                                              style="color: green;">phone</i></div>
					<div id="space-between-icon-and-text_text">333-345-45-23</div>
				</f7-card-footer>
			</f7-card>
			<f7-card>
				<f7-card-header>Warehouse "GOODS"</f7-card-header>
				<f7-card-content>
					<div id="space-between-icon-and-text_icon"><i class="material-icons icon-opacity"
					                                              style="color: red;">room</i>
					</div>
					<div id="space-between-icon-and-text_text">1 Route nationale, 02120 Malzy, France</div>
				</f7-card-content>
				<f7-card-footer>
					<div id="space-between-icon-and-text_icon"><i class="material-icons icon-opacity"
					                                              style="color: green;">phone</i></div>
					<div id="space-between-icon-and-text_text">333-345-45-23</div>
				</f7-card-footer>
			</f7-card>
		</f7-page>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				warehouse1: require('@/images/warehouse1.jpg'),
				warehouse2: require('@/images/warehouse2.jpg'),
			};
		},
		methods: {},
	}
</script>