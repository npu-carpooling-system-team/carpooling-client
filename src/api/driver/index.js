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

export const updateCarpooling = async (carpoolingDto) => {
	beginLoading('正在上传拼车信息')
	try{
		const {data} = await axios.put(`/api/carpooling/driver/carpooling/${carpoolingDto.id}}`, carpoolingDto)
		return data
	} catch (e) {
		showNotify({type: 'danger', message: `修改拼车信息失败,${e.message}`})
	} finally {
		closeToast()
	}
	return false
}

export const handleGetDriversCarpoolingList = async (queryDto) => {
	beginLoading('正在加载拼车信息列表')
	try {
		const {data} = await axios.get(
			'/api/carpooling/driver/carpooling',
			{
				params: queryDto
			}
		)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '加载拼车信息列表失败'
		})
	} finally {
		closeToast()
	}
	return null
}


export const handleGetCarpoolingDetail = async (id) => {
	beginLoading('正在加载拼车信息详情')
	try {
		const {data} = await axios.get(`/api/carpooling/frontend/${id}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '加载拼车信息详情失败'
		})
	} finally {
		closeToast()
	}
	return null
}
