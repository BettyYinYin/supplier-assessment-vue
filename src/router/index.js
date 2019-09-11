import Vue from 'vue'
import Router from 'vue-router'
import quota from './modules/quota'
import check from './modules/check'
import supplierList from './modules/supplierList'
import unsubmit from './modules/unsubmit'
import add from './modules/add'
import home from './modules/home'
import version from './modules/version'
import help from './modules/help'
Vue.use(Router)

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    quota,
    check,
    supplierList,
    {
      path: '/',
      redirect: '/home'
    },
    ...unsubmit,
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
