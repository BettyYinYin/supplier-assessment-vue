const version = {
  name: 'version',
  path: '/version',
  redirect: '/version/list',
  component: () => import('@/views/version'),
  meta: {
    keepAlive: false
  },
  children: [
    {
      name: 'version.list',
      path: 'list',
      component: ()=>import('@/views/version/list')
    },
    {
      name: 'version.add',
      path: 'add',
      component: ()=>import('@/views/version/add')
    }
  ]
}

export default version