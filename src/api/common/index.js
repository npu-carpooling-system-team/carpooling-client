import axios from '../index.js'
import {closeToast, showLoadingToast, showNotify} from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'

const beginLoading = (message) => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: message
    })
}

export const handleGetPersonalInfo = async () => {
    beginLoading('正在加载您的个人信息')
    try{
        const {data} = await axios.get('/api/user/info')
        return data
    } catch (e) {
        showNotify({type: 'danger', message: `首页初始化失败,${e.message}`})
    } finally {
        closeToast()
    }
    return null
}
