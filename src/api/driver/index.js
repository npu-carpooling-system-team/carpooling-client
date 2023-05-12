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

export const addCarpooling = async (carpoolingDto) => {
    beginLoading('正在上传拼车信息')
    try{
        const {data} = await axios.post('/api/carpooling/driver/carpooling', carpoolingDto)
        return data
    } catch (e) {
        showNotify({type: 'danger', message: `上传拼车信息失败,${e.message}`})
    } finally {
        closeToast()
    }
    return false
}
