import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Layout from '../layout'
import generalQuery from "./modules/general-query";
import {Message} from "element-ui";

Vue.use(Router)


//通用框架
export const currencyRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index'),
        hidden:true
    },
    {
        path: '/404',
        component: () => import('../views/error-page/404.vue'),
        hidden: true
    },
    {
        path: '/',
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
            icon: 'el-icon-lock',
            roles: ['admin', 'user']
        },
        children: [
            {
                path: 'page-use',
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
                    icon: 'el-icon-user-solid',
                    roles: ['admin']
                }
            },
            {
                path: 'roles',
                name: 'Roles',
                component: () => import('../views/permission/roles'),
                meta: { title: '权限设置', icon: 'el-icon-s-tools', roles: ['admin'] }
            }
        ]
    },
    {
        path: '/error',
        component: Layout,
        name: '404',
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
    generalQuery,
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const router = new Router({
    routes: currencyRoutes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})

// 导航守卫
router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        if (store.getters.token) {
            const hasRoles = store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    const { roles } = await store.dispatch('user/getInfo')
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
