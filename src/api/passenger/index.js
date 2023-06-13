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

export const getCarpoolingDetailsByDriver = async (id) => {
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

export const handleConfirmDeparture = async (orderId) => {
	beginLoading('正在向服务器确认出发')
	try {
		const {data} = await axios.post(`/api/order/inprocess/passenger/departure/confirm/${orderId}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '确认出发失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}

export const getCancelTimes = async () => {
	beginLoading('正在确认您的取消行程次数')
	try {
		const {data} = await axios.get(`/api/order/predeparture/passenger/carpooling/canceltimes`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '确认您的取消行程次数失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}

export const handleCancelOrder = async (orderId) => {
	beginLoading('正在取消订单')
	try {
		const {data} = await axios.delete(`/api/order/predeparture/passenger/carpooling/${orderId}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '取消订单失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}

export const handleConfirmArrive = async (orderId) => {
	beginLoading('正在确认到达')
	try {
		const {data} = await axios.post(`/api/order/inprocess/passenger/arrive/confirm/${orderId}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '确认到达失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}

export const handleStartPayment = async (orderId) => {
	beginLoading('正在发起支付')
	try {
		const {data} = await axios.post(`/api/payment/passenger/pay/${orderId}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '发起支付失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}

export const handleRateDriver = async (orderId) => {
	beginLoading('正在发起评价')
	try {
		const {data} = await axios.post(`/api/order/finished/passenger/rate/${orderId}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '评价失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}

export const handleSubmitScore = async (orderId,score) => {
	beginLoading('正在提交评价')
	try {
		const {data} = await axios.post(`/api/order/finished/passenger/rate/${orderId}/${score}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '提交评价失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}

export const handlePutPaymentStatus = async (orderId) => {
	beginLoading('正在更新支付状态')
	try {
		const {data} = await axios.put(`/api/payment/passenger/pay/${orderId}`)
		return data
	} catch (e) {
		showNotify({
			type: 'danger',
			message: '更新支付状态失败,服务器异常,请重试'
		})
	} finally {
		closeToast()
	}
	return null
}
