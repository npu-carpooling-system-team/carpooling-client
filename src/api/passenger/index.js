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

export const handleSubmitApplication = async (id) => {
	beginLoading('正在提交申请')
	try {
		const {data} = await axios.post(`/api/order/preorder/passenger/apply/${id}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '提交申请失败'
		})
	} finally {
		closeToast()
	}
	return null
}

export const getOrderListByPassenger = async () => {
	beginLoading('正在加载订单列表')
	try {
		const {data} = await axios.get(`/api/order/passenger/order/list`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '加载订单列表失败'
		})
	} finally {
		closeToast()
	}
	return null
}

export const getOrderDetailsByPassenger = async (id) => {
	beginLoading('正在加载订单详情')
	try {
		const {data} = await axios.get(`/api/order/passenger/order?orderId=${id}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '加载订单详情失败'
		})
	} finally {
		closeToast()
	}
	return null
}
