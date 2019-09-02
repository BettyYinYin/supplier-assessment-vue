import Vue from 'vue'
import Router from 'vue-router'
// import userMangage from './modules/userManage'
// import userList from './modules/userList'
// import journal from './modules/journal'
// import selectUser from './modules/selectUser'
import add from './modules/add'
import home from './modules/home'
import version from './modules/version'
import help from './modules/help'
Vue.use(Router)

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // userMangage,
    // userList,
    // journal,
    // selectUser,
    add,
    home,
    version,
    help
  ]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}



export default router
