export default [
	{
		path: '/parcels/:token',
		component: require('./pages/parcels.vue')
	},
	{
		path: '/warehouses/',
		component: require('./pages/warehouses.vue')
	},
	{
		path: '/login/',
		component: require('./pages/login.vue')
	},
	{
		path: '/parcels-search/',
		component: require('./pages/search-parcels.vue')
	},
	{
		path: '/map/',
		component: require('./pages/google-map.vue')
	}
]