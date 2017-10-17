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
  }
]