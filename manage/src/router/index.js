import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

import Layout from '@/layout'
import { Message } from 'element-ui'
import getTitle from '../utils/getTitle'

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * meta{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login'),
        meta: { title: '登录页' },
        hidden: true
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/error-page/404.vue'),
        hidden: true
    },
    {
        path: '/',
        name: 'Home',
        component: Layout,
        redirect: '/dashbord',
        children: [
            {
                path: 'dashbord',
                name: 'Dashbord',
                component: () => import('../views/dashboard'),
                meta: { title: '首页', icon: 'el-icon-s-data' }
            }
        ]
    }
]
/*动态添加routers*/
export const asyncRoutes = [
    {
        path: '/permission',
        name: 'Permission',
        component: Layout,
        redirect: '/permission/page-use',
        meta: {
            title: '权限许可',
            icon: 'el-icon-lock'
        },
        children: [
            {
                path: 'page-user',
                name: 'PageUser',
                component: () => import('../views/permission/page-user'),
                meta: { title: '用户页面', icon: 'el-icon-user' }
            },
            {
                path: 'page-admin',
                name: 'PageAdmin',
                component: () => import('../views/permission/page-admin'),
                meta: {
                    title: '管理员页面',
                    icon: 'el-icon-user-solid'
                }
            },
            {
                path: 'roles',
                name: 'Roles',
                component: () => import('../views/permission/roles'),
                meta: { title: '权限设置', icon: 'el-icon-s-tools' }
            }
        ]
    },
    {
        path: '/table',
        name: 'Table',
        redirect: '/table/base-table',
        component: Layout,
        meta: {
            title: 'Table',
            icon: 'el-icon-table iconfont'
        },
        children: [
            {
                path: 'complex-table',
                name: 'ComplexTable',
                component: () => import('../views/table/complex-table'),
                meta: { title: '复杂表格' }
            },
            {
                path: 'complex-table2',
                name: 'ComplexTable2',
                component: () => import('../views/table/complex-table'),
                meta: { title: '复杂表格' }
            }
        ]
    },
    {
        path: '/error',
        component: Layout,
        name: 'Error',
        redirect: '/error/404',
        children: [
            {
                path: '404',
                name: 'Page404',
                component: () => import('../views/error-page/404'),
                meta: { title: '404', icon: 'el-icon-s-release' }
            }
        ]
    },
    {
        path: '*',
        name: '*404',
        redirect: '/404',
        hidden: true
    }
]
const creatRouter = () => {
    return new Router({
        routes: currencyRoutes,
        scrollBehavior() {
            return { x: 0, y: 0 }
        }
    })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
    const reset = creatRouter()
    router.matcher = reset.matcher
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
    document.title = getTitle(to.meta.title)
    if (to.path === '/login') {
        next()
    } else {
        if (store.getters.token) {
            const hasRoles = store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await store.dispatch('user/_getInfo')
                    const addRoutes = await store.dispatch(
                        'permission/getAsyncRoutes',
                        roles
                    )
                    router.addRoutes(addRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (error) {
                    Message.error(error)
                }
            }
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
})
export default router
