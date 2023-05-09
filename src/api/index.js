import axios from 'axios'
import Cookies from 'js-cookie'

import {showNotify} from 'vant'
import 'vant/es/notify/style'

const _axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

_axios.interceptors.request.use(
    (req) => {
        // 比如在这里添加统一的 headers
        if (Cookies.get('token') !== undefined) {
            req.headers.Authorization = 'Bearer ' + Cookies.get('token')
        }
        return req
    },
    (err) => {
        return Promise.reject(err)
    }
)

_axios.interceptors.response.use(
    (res) => {
        if (res !== null && res.code !== null){
            if (res.code === 4012) {
                Cookies.remove('token')
                showNotify({
                    type: 'danger',
                    message: '登录过期，请重新登录'
                })
                window.location.href = '/login'
            }
        }
        return res
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default _axios
