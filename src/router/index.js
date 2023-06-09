import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'
import { showNotify } from 'vant'
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
        redirect: '/main/carpooling/home',
        children: [
            {
                path: '/main/carpooling/home',
                name: 'main-carpooling',
                component: () => import('../views/carpooling/CarpoolingMain.vue'),
                meta: {
                    title: '西工大拼车系统-拼车大厅'
                },
                children: [
                    {
                        path: '/main/carpooling/passenger-order',
                        name: 'main-carpooling-passenger-order',
                        component: () => import('../views/carpooling/PassengerOrder.vue')
                    },
                    {
                        path: '/main/carpooling/driver-carpooling',
                        name: 'main-carpooling-driver-carpooling',
                        component: () => import('../views/carpooling/DriverCarpooling.vue')
                    },
                    {
                        path: '/main/carpooling/order-detail',
                        name: 'main-carpooling-order-detail',
                        component: () => import('../views/carpooling/OrderDetail.vue')
                    },
                    {
                        path: '/main/carpooling/carpooling-detail-driver',
                        name: 'main-carpooling-detail-driver',
                        component: () => import('../views/carpooling/CarpoolingDetail.vue')
                    },
                    {
                        path: '/main/carpooling/carpooling-reserve-list',
                        name: 'main-carpooling-reserve-list',
                        component: () => import('../views/carpooling/ReserveList.vue')
                    },
                    {
                        path: '/main/carpooling/pay/failure',
                        name: 'main-carpooling-pay-failure',
                        component: () => import('../views/carpooling/payment/PayFailure.vue')
                    },
                    {
                        path: '/main/carpooling/pay/success',
                        name: 'main-carpooling-pay-success',
                        component: () => import('../views/carpooling/payment/PaySuccess.vue')
                    }
                ]
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
                        path: 'passenger-home',
                        name: 'main-passenger-home',
                        component: () => import('../views/passenger/PassengerHome.vue')
                    },
                    {
                        path: 'carpooling-detail',
                        name: 'main-carpooling-detail',
                        component: () => import('../views/passenger/CarpoolingDetail.vue')
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
                        path: 'driver-home',
                        name: 'main-driver-home',
                        component: () => import('../views/driver/DriverHome.vue')
                    },
                    {
                        path: 'preview-map',
                        name: 'main-preview-map',
                        component: () => import('../views/driver/PreviewMap.vue')
                    },
                    {
                        path: 'fee-policy',
                        name: 'main-fee-policy',
                        component: () => import('../views/common/FeePolicy.vue')
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
                        path: 'my-home',
                        name: 'main-my-home',
                        component: () => import('../views/my/MyHome.vue')
                    },
                    {
                        path: 'my-chats/list',
                        name: 'main-my-chats-list',
                        component: () => import('../views/my/chat/ChatsList.vue')
                    },
                    {
                        path: 'my-chats/detail',
                        name: 'main-my-chats-detail',
                        component: () => import('../views/my/chat/ChatDetail.vue')
                    },
                    {
                        path: 'revise-info',
                        name: 'main-revise-info',
                        component: () => import('../views/my/ReviseInfo.vue')
                    },
                    {
                        path: 'bind-alipay/success',
                        name: 'main-handle-alipay',
                        component: () => import('../views/my/BindAlipaySuccess.vue')
                    },
                    {
                        path: 'bind-alipay/failure',
                        name: 'main-handle-alipay-failure',
                        component: () => import('../views/my/BindAlipayFailure.vue')
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

const whiteList = [
    '/',
    '/login',
    '/register',
    '/oauth/alipay/success',
    '/oauth/alipay/failure',
    '/privacy',
    '/main/my/bind-alipay/success',
    '/main/my/bind-alipay/failure',
    '/404'
]

// 挂载路由守卫 若请求头中没有access-token或refresh-token则跳转到登录页
router.beforeEach((to, from, next) => {
    // 挂载页面名称
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (whiteList.includes(to.path)) {
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
    return next()
})

export default router
