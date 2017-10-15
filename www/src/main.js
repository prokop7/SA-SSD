// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app.vue'

import LeftPanel from './pages/left-panel.vue'
import Parcels from './pages/parcels.vue'
import LoginScreen from './pages/login.vue'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)


Vue.component('left-panel', LeftPanel)
Vue.component('parcels', Parcels)
Vue.component('login-screen', LoginScreen)


// Init App
var mainVue = new Vue({
	el: '#app',
	template: '<app/>',
	// Init Framework7 by passing parameters here
	framework7: {
		root: '#app',
		/* Uncomment to enable Material theme: */
		material: true,
		routes: Routes,
		swipePanel: 'left',
		page: Parcels
	},
	// Register App Component
	components: {
		'app': App
	}
});

new Vue({
	el:"#parcels",
	template: '<parcels/>'
})

new Vue({
	el:"#login-screen",
	template: '<login-screen/>'
})

new Vue({
	el: "#left-panel",
	template: '<left-panel/>'
})





