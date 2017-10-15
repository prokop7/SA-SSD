<template>
	<div id="login-screen">
		<f7-login-screen>
			<f7-view>
				<f7-pages>
					<f7-page login-screen>
						<f7-login-screen-title>Login</f7-login-screen-title>
						<f7-list form>
							<f7-list-item>
								<f7-input name="username" type="text" placeholder="Username"></f7-input>
							</f7-list-item>
							<f7-list-item>
								<f7-input name="password" type="password" placeholder="Password"></f7-input>
							</f7-list-item>
						</f7-list>
						<f7-button close-login-screen>Sign In</f7-button>
					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-login-screen>
	</div>
</template>
<script>
	export default {}
</script>