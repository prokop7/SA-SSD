<template>
	<div id="login-screen">
		<div v-if="!token">
			<f7-login-screen opened>
				<f7-view>
					<f7-pages>
						<f7-page login-screen>
							<f7-login-screen-title>Login</f7-login-screen-title>
							<f7-list form>
								<f7-list-item>
									<f7-label floating>Email</f7-label>
									<f7-input v-model="email" :email="email" type="text" placeholder="Email"></f7-input>
								</f7-list-item>
								<f7-list-item>
									<f7-label floating>Password</f7-label>
									<f7-input v-model="password" :password="password" type="password"
									          placeholder="Password"></f7-input>
								</f7-list-item>
							</f7-list>
							<f7-button class="button-size center-my" fill @click="signIn()">Sign In</f7-button>
							<div v-if="error">
								<f7-list>
									<f7-list-label>
										{{error.message}}
									</f7-list-label>
									<f7-list-label v-for="message in error.errors" :key=message>
										<p>{{message[0]}}</p>
									</f7-list-label>
								</f7-list>
							</div>
						</f7-page>
					</f7-pages>
				</f7-view>
			</f7-login-screen>
		</div>
	</div>
</template>
<script>
	import api from '@/api'
	import vue from '@/main'

	var data = {
		password: "",
		email: "",
		error: undefined,
		confirm_img: require('@/images/Untitled-183.png')
	}

	function errorSignIn(error_code, error) {
		data.error = error
		data.error_message = error_code + ": " + error['errors'].email[0]
	}

	export default {
		props: {
			token: {
				required: true
			}
		},
		data: function () {
			return data
		},
		methods: {
			signIn() {
				var obj = {"email": data.email, "password": data.password};
				api.signIn(obj, this.successSignIn, errorSignIn);
			},
			successSignIn(e) {
				data.error = undefined
				localStorage.setItem('token', e.api_token)
				localStorage.setItem('name', e.name)
				localStorage.setItem('email', e.email)
				this.$emit("setToken", e.api_token)
			}
		}
	}
</script>