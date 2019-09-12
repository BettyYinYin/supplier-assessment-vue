const add = {
    name: 'add',
    path : '/add', 
    component : () => import( '@/views/add' ),
    meta: {
        keepAlive: true
    }
}
  
export default add