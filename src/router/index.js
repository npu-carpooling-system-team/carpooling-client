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
        path: '/privacy',
        name: 'privacy',
        component: () => import('../views/common/PrivacyPolicy.vue'),
        meta: {
            title: '西工大拼车系统-隐私政策'
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
        path: '/main/home',
        name: 'main-home',
        component: () => import('../views/main/MainPage.vue'),
        meta: {
            title: '西工大拼车系统-主页'
        },
        redirect: '/main/carpooling',
        children: [
            {
                path: '/main/carpooling',
                name: 'main-carpooling',
                component: () => import('../views/carpooling/MyCarpooling.vue'),
                meta: {
                    title: '西工大拼车系统-拼车大厅'
                }
            },
            {
                path: '/main/passenger',
                name: 'main-passenger-main',
                component: () => import('../views/passenger/PassengerMain.vue'),
                meta: {
                    title: '西工大拼车系统-乘客主页'
                },
                redirect: '/main/passenger/passenger-home',
                children: [
                    {
                        path: '/main/passenger/passenger-home',
                        name: 'main-passenger-home',
                        component: () => import('../views/passenger/PassengerHome.vue')
                    }
                ]
            },
            {
                path: '/main/driver',
                name: 'main-driver-main',
                component: () => import('../views/driver/DriverMain.vue'),
                meta: {
                    title: '西工大拼车系统-司机主页'
                },
                redirect: '/main/driver/driver-home',
                children: [
                    {
                        path: '/main/driver/driver-home',
                        name: 'main-driver-home',
                        component: () => import('../views/driver/DriverHome.vue')
                    },
                    {
                        path: '/main/driver/preview-map',
                        name: 'main-preview-map',
                        component: () => import('../views/driver/PreviewMap.vue')
                    }
                ]
            },
            {
                path: "/main/my",
                name: "main-my-main",
                component: () => import('../views/my/MyMain.vue'),
                meta: {
                    title: '西工大拼车系统-我的主页'
                },
                redirect: '/main/my/my-home',
                children: [
                    {
                        path: '/main/my/my-home',
                        name: 'main-my-home',
                        component: () => import('../views/my/MyHome.vue')
                    },
                    {
                        path: '/main/my/my-chats',
                        name: 'main-my-chats',
                        component: () => import('../views/my/MyChats.vue')
                    },
                    {
                        path: '/main/my/revise-info',
                        name: 'main-revise-info',
                        component: () => import('../views/my/ReviseInfo.vue')
                    },
                    {
                        path: '/main/my/handle-alipay',
                        name: 'main-handle-alipay',
                        component: () => import('../views/my/HandleAlipay.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('../views/common/NotFound.vue'),
        meta: {
            title: '您访问的页面不存在'
        }
    },
    // 所有未定义路由，全部重定向到404页，必须放在最后
    {
        path: '/:catchAll(.*)',
        redirect: '/404'
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
        to.path === '/oauth/alipay/failure' ||
        to.path === '/privacy'
    ) {
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
