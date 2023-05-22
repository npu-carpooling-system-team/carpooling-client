<script setup>
import {onMounted, ref} from 'vue'
	import {getOrderListByPassenger} from '@/api/passenger'
	import {showNotify} from 'vant'
	import 'vant/es/notify/style'
	import router from "@/router";
	
    const orderList = ref([])
	const getOrderList = async () => {
		const data = await getOrderListByPassenger()
        if (data !== null && data.code === 2000) {
			orderList.value = data.result.list
        } else if (data !== null) {
			showNotify({
                type: 'danger',
                message: `获取订单列表失败, ${data.msg}`
            })
        } else {
			showNotify({
                type: 'danger',
                message: '获取订单列表失败'
            })
        }
    }
	
	const statusI18nList = new Map()
    statusI18nList.set('ORDER_FORCE_CLOSED', '订单强制结束')
    statusI18nList.set('PRE_ORDER_REQUEST_SUBMITTED', '订单已提交')
    statusI18nList.set('PRE_ORDER_REQUEST_PASSED', '订单已通过')
    statusI18nList.set('PRE_DEPARTURE_USER_CANCELLED', '订单已被用户取消')
    statusI18nList.set('DRIVING_USER_CONFIRM_DEPARTURE', '用户确认发车')
    statusI18nList.set('DRIVING_USER_CONFIRM_ARRIVED', '用户确认到达')
    statusI18nList.set('ARRIVED_USER_UNPAID', '用户未支付')
    statusI18nList.set('ORDER_NORMAL_CLOSED', '订单正常结束')
	
	onMounted(async () => {
		await getOrderList()
    })
    
    const checkOrderDetails = async (order) => {
		await router.push(`/main/carpooling/order-detail?orderId=${order.id}`)
    }
</script>

<template>
    <h1>司机行程</h1>
</template>

<style scoped>
</style>
