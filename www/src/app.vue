<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<div id="left-panel"></div>
		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" main>

				<!-- Pages -->
				<f7-pages navbar-through>
					<f7-page>
						<f7-navbar>
							<f7-nav-left>
								<f7-link icon="icon-bars" open-panel="left"></f7-link>
							</f7-nav-left>
							<f7-nav-left>
							</f7-nav-left>
						</f7-navbar>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-views>

		<!-- Popup -->
		<f7-popup id="popup">
			<f7-view navbar-fixed>
				<f7-pages>
					<f7-page>
						<f7-navbar title="Popup">
							<f7-nav-right>
								<f7-link close-popup>Close</f7-link>
							</f7-nav-right>
						</f7-navbar>
						<f7-block>
							asdasdasd
						</f7-block>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-popup>

		<!-- Login Screen -->
		<div id="login-screen"></div>

	</div>
</template>

<script>
	export default {}
</script>