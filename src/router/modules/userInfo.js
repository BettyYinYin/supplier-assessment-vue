const userInfo = {
    name: 'userInfo',
    path : '/userInfo', component : () => import( '@/views/userInfo' ),
    meta: {
      title: '员工信息',
      keepAlive: true
    }
  }
  
  export default userInfo