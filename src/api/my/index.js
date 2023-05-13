import axios from '../index.js'
import {showLoadingToast, showNotify} from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'

const clearSession = () => {
    window.sessionStorage.removeItem('carpoolingCache')
    window.sessionStorage.removeItem('currentUser')
}

const beginLoading = (message) => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: message
    })
}

export const handleLogoutReq = async () => {
    // 开始退出
    showLoadingToast({
        duration: 3,
        forbidClick: true,
        message: '正在退出登录'
    })
    try {
        clearSession()
        await axios.post('/api/auth/loginuser/logout')
    } catch (e) {
        // 不用管异常
    }
}

export const handleCheckHasNewChat = async () => {
    try {
        const {data} = await axios.get('/api/order/preorder/message')
        return data
    } catch (e) {
        showNotify({type: 'danger', message: `检查是否有新消息失败,${e.message}`})
    }
}
