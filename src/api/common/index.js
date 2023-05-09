import axios from '../index.js'
import {closeToast, showLoadingToast, showNotify} from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'

export const getPersonalInfo = async () => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: '正在加载您的个人信息',
    })
    try{
        const {data} = await axios.get('/api/user/info')
        return data
    } catch (e) {
        showNotify({type: 'danger', message: `首页初始化失败,${e.message}`})
    } finally {
        closeToast()
    }
}
