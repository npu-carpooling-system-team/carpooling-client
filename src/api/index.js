import axios from 'axios'
import Cookies from 'js-cookie'

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

export default _axios
