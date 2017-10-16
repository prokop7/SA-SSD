<template>
	<div id="LeftPanel">
		<f7-panel left reveal layout="dark">
			<f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
				<f7-navbar sliding></f7-navbar>
				<f7-pages>
					<f7-page>
						<f7-navbar title="Left Panel" sliding></f7-navbar>
						<f7-list>
							<f7-list-item link="/parcels/" title="Parcels" link-view="#main-view"
							              link-close-panel></f7-list-item>
							<f7-list-item link="/warehouses/" title="Warehouses" link-view="#main-view"
							              link-close-panel></f7-list-item>
						</f7-list>
						<f7-button class="login-button" color="blue" close-panel
						                 open-login-screen>Login</f7-button>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-panel>
	</div>
</template>

<script>
	export default {

	}
</script>