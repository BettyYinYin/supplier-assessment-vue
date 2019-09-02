const userList = {
    name: 'userList',
    path : '/userList', component : () => import( '@/views/userList' ),
    meta: {
      title: '员工列表'
    }
  }
  
  export default userList