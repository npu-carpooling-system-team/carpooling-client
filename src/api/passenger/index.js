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

export const handleGetCarpoolingList = async (queryDto) => {
	beginLoading('正在加载拼车信息列表')
	try {
		const {data} = await axios.get(
			'/api/carpooling/passenger/carpooling',
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
