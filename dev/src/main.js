// Import Vue and F7
import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import AppStyles from './css/app.css'


// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app.vue'

//image in login page

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

//signature
import vueSignature from "./lib/index.js"
Vue.use(vueSignature)

// Init App
export var mainVue = new Vue({
	el: '#app',
	template: '<app/>',
	// Init Framework7 by passing parameters here
	framework7: {
		root: '#app',
		/* Uncomment to enable Material theme: */
		material: true,
		routes: Routes,
		swipePanel: 'left',
		swipePanelActiveArea: 100,
	},
	// Register App Component
	components: {
		'app': App
	},
});

export const bus = new Vue();

export default {
	vue: mainVue,
	bus: bus
}



