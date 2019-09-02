const selectUser = {
    name: 'selectUser',
    path : '/selectUser', component : () => import( '@/views/selectUser' ),
    meta: {
      title: '筛选员工列表'
    }
  }
  
  export default selectUser