import {createRouter, createWebHashHistory} from 'vue-router'
import Cookies from 'js-cookie'
import {showNotify} from 'vant'
import 'vant/es/notify/style'

const routes = [
    {
        path: '/',
        name: 'default',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/UserLogin.vue'),
        meta: {
            title: '西工大拼车系统-登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/UserRegister.vue'),
        meta: {
            title: '西工大拼车系统-注册'
        }
    },
    {
        path: '/oauth/alipay/success',
        name: 'oauth-success',
        component: () => import('../views/auth/OAuthSuccess.vue'),
        meta: {
            title: '西工大拼车系统-支付宝登陆成功'
        }
    },
    {
        path: '/oauth/alipay/failure',
        name: 'oauth-failure',
        component: () => import('../views/auth/OAuthFailure.vue'),
        meta: {
            title: '西工大拼车系统-支付宝登陆失败'
        }
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../views/main/MainPage.vue'),
        meta: {
            title: '西工大拼车系统-主页'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 挂载路由守卫 若请求头中没有access-token或refresh-token则跳转到登录页
router.beforeEach((to, from, next) => {
    // 挂载页面名称
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path === '/login' ||
        to.path === '/register' ||
        to.path === '/oauth/alipay/success' ||
        to.path === '/oauth/alipay/failure') {
        return next()
    }
    const token = Cookies.get('token')
    if (!token) {
        showNotify({
            type: 'danger',
            message: '请先登录'
        })
        return next('/login')
    }
    next()
})

export default router
