const unsubmit = [{
  name: 'unsubmit.list',
  path: '/unsubmit/list',
  component: () => import('@/views/unsubmit/list')
}, {
  name: 'unsubmit.edit',
  path: '/unsubmit/edit',
  component: () => import('@/views/unsubmit/edit'),
  meta: {
    keepAlive: true
  }
}]

export default unsubmit