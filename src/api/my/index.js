import axios from '../index.js'
import {closeToast, showLoadingToast, showNotify} from 'vant'
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
        showNotify({type: 'danger', message: `检查新消息失败,${e.message}`})
    }
    return null
}

export const handleGetChat = async () => {
    beginLoading('正在获取聊天记录')
    try{
        return await handleCheckHasNewChat()
    } catch (e) {
        showNotify({type: 'danger', message: `获取聊天记录失败,${e.message}`})
    } finally {
        closeToast()
    }
    return null
}

export const handleSendChat = async (messageDto) => {
    beginLoading('正在发送消息')
    try {
        const {data} = await axios.post('/api/order/preorder/message', messageDto)
        return data
    } catch (e) {
        showNotify({type: 'danger', message: `发送消息失败,${e.message}`})
    } finally {
        closeToast()
    }
    return null
}
