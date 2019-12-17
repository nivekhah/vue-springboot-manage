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
    },
    {
        path: '/table',
        name: 'Table',
        redirect: '/table/base-table',
        component: Layout,
        meta: {
            title: '通用查询',
            icon: 'el-icon-table iconfont'
        },
        children: [
            {
                path: 'chart-definition',
                name: 'chart-definition',
                component: () => import('../views/general-query/chart-definition-management'),
                meta: { title: '图表定义管理' }
            },
            {
                path: 'data-dictionary',
                name: 'data-dictionary',
                component: () => import('../views/general-query/data-dictionary-management'),
                meta: { title: '数据字典管理' }
            },
            {
                path: 'data-source',
                name: 'data-source',
                component: () => import('../views/general-query/data-source-management'),
                meta: { title: '数据源管理' }
            },
            {
                path: 'query-definition',
                name: 'query-definition',
                component: () => import('../views/general-query/query-definition-management'),
                meta: { title: '查询定义管理' }
            }
        ]
    },
    {
        path: '/echarts',
        component: Layout,
        name: 'Echarts',
        redirect: '/echarts/slide-chart',
        meta: { icon: 'el-icon-s-marketing', title: '数据源' },
        children: [
            {
                path: 'dynamic-chart',
                name: 'Dynamic-chart',
                component: () => import('../views/datasourceChart'),
                meta: { title: '测试' }
            }
        ]
    }
]
/*动态添加routers*/
export const asyncRoutes = [
    // {
    //     path: '/table',
    //     name: 'Table',
    //     redirect: '/table/base-table',
    //     component: Layout,
    //     meta: {
    //         title: '通用查询',
    //         icon: 'el-icon-table iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'chart-definition',
    //             name: 'ComplexTable',
    //             component: () => import('../views/general-query/chart-definition-management'),
    //             meta: { title: '图表定义管理' }
    //         },
    //         {
    //             path: 'data-dictionary',
    //             name: 'ComplexTable',
    //             component: () => import('../views/general-query/data-dictionary-management'),
    //             meta: { title: '数据字典管理' }
    //         },
    //         {
    //             path: 'data-source',
    //             name: 'ComplexTable',
    //             component: () => import('../views/general-query/data-source-management'),
    //             meta: { title: '数据源管理' }
    //         },
    //         {
    //             path: 'query-definition',
    //             name: 'ComplexTable',
    //             component: () => import('../views/general-query/query-definition-management'),
    //             meta: { title: '查询定义管理' }
    //         }
    //     ]
    // },
    // {
    //     path: '/echarts',
    //     component: Layout,
    //     name: 'Echarts',
    //     redirect: '/echarts/slide-chart',
    //     meta: { icon: 'el-icon-s-marketing', title: '数据源' },
    //     children: [
    //         {
    //             path: 'dynamic-chart',
    //             name: 'Dynamic-chart',
    //             component: () => import('../views/datasourceChart'),
    //             meta: { title: '测试' }
    //         }
    //     ]
    // },
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
