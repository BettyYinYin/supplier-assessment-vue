const help = {
  name: 'help',
  path : '/help', component : () => import( '@/views/help' ),
  meta: {
    title: '帮助',
    keepAlive: false
  }
}

export default help