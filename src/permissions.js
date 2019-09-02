import router from './router'
import { Indicator } from "mint-ui";
import {setRight} from '@/utils'

router.beforeEach((to, from, next) => {
    if(to.name !== from.name && to.meta.keepAlive) {
        if (to.meta.lastHistoryFullPath && to.meta.lastHistoryFullPath === to.fullPath || !to.meta.lastHistoryFullPath) {
            to.meta.keepAliveChange = false
        } else if (to.meta.lastHistoryFullPath && (to.meta.lastHistoryFullPath !== to.fullPath)) {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            })
            to.meta.keepAliveChange = true
        }
    }else {
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        })
    }
    to.meta.lastHistoryFullPath = to.fullPath

    // 通过进入不同的模块设置不同的moduleFlag
    if (to.path === '/userManage/list') {
        sessionStorage.setItem('moduleFlag', 'group_select')
    }

    if(to.path === '/journal/list'){
        sessionStorage.setItem('moduleFlag', 'daidy_select')
    }

    // 设置钉钉右侧按钮
    setRight()

    next()
})


router.afterEach(() => {
    setTimeout(() => {
        Indicator.close()
    }, 0)
})