export default [
  {
      path: '/parcels/',
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
      path: '/dynamic-route/blog/:blogId/post/:postId/',
      component: require('./pages/dynamic-route.vue')
  }
]