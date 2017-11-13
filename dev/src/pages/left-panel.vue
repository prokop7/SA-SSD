<template>
	<div id="LeftPanel">
		<f7-panel left cover>
			<f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
				<f7-navbar sliding>
					<i class="material-icons" style="opacity:0.5; margin-right: 16px;
    margin-left: 16px;">account_circle</i>
					<f7-block>
						{{name}}
					</f7-block>
				</f7-navbar>
				<f7-pages>
					<f7-page  style="background: white">
						<f7-navbar title="Left Panel" sliding></f7-navbar>
						<f7-list media-list class="">

							<f7-list-item link="#"
										  media='<i class="material-icons" style="opacity:0.5">view_list</i>'
							              @click="$emit('loadParcels')"
							              title="Parcels"
							              link-view="#main-view"
							              link-close-panel>
							</f7-list-item>

							<f7-list-item link="#"
										  media='<i class="material-icons" style="opacity:0.5">home</i>'
							              @click="$emit('loadWarehouses')"
							              title="Warehouses"
							              link-view="#main-view"
							              link-close-panel>
							</f7-list-item>
						</f7-list>
						<f7-button class="login-button" color="blue" close-panel @click="$emit('logout')"
						           open-login-screen>Log out
						</f7-button>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>
	</div>
</template>

<script>

	export default {
		props: {
			name: {},
			token: {}
		},
		methods: {}
	}
</script>