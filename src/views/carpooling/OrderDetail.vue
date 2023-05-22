<script setup>
    import {useRouter} from 'vue-router'
	import {onMounted, ref} from 'vue'
	import {getCarpoolingDetailsByDriver} from '@/api/passenger'
	import {showNotify} from 'vant'
	import 'vant/es/toast/style'
	import 'vant/es/notify/style'
    
    const orderId = ref('')
    
    const router = useRouter()
    const order = ref({})

	const statusI18nList = new Map()
	statusI18nList.set('ORDER_FORCE_CLOSED', '订单强制结束')
	statusI18nList.set('PRE_ORDER_REQUEST_SUBMITTED', '订单已提交')
	statusI18nList.set('PRE_ORDER_REQUEST_PASSED', '订单已通过')
	statusI18nList.set('PRE_DEPARTURE_USER_CANCELLED', '订单已被用户取消')
	statusI18nList.set('DRIVING_USER_CONFIRM_DEPARTURE', '用户确认发车')
	statusI18nList.set('ARRIVED_USER_UNPAID', '用户未支付')
    statusI18nList.set('PAID_WAITING_CALLBACK', '已支付，等待回调')
	statusI18nList.set('ORDER_NORMAL_CLOSED', '订单正常结束')
    
    const getOrderDetails = async () => {
		const data = await getCarpoolingDetailsByDriver(orderId.value)
        if (data !== null && data.code === 2000) {
			order.value = data.result.result
        } else if (data !== null) {
			showNotify({
                type: 'danger',
                message: `加载订单具体信息失败,${data.msg}`
            })
        } else {
			showNotify({
                type: 'danger',
                message: '加载订单具体信息失败,请检查网络连接'
            })
        }
    }

	const passingPoint = ref('')
	
    onMounted(async () => {
		orderId.value = router.currentRoute.value.query.orderId
        await getOrderDetails()
        passingPoint.value = JSON.parse(order.value.passingPoint).join(' ')
		console.log(order.value.status)
    })
    
    const jumpToPreviewMap = async () => {
        const passingPointArr = []
        console.log(order.value)
		if (order.value.passingPoint !== '') {
			// 解析途径地点
			passingPointArr.push(JSON.parse(order.value.passingPoint))
		}
		window.location.href = '#/main/driver/preview-map?departurePoint='
			+ order.value.departurePoint
			+ '&arrivePoint=' + order.value.arrivePoint
			+ '&passingPoint=' + order.value.passingPoint
            + '&fromUrl=/main/carpooling/passenger-order'
	}

</script>

<template>
    <van-nav-bar
        :title="'订单详情'"
        left-text="返回"
        left-arrow
        @click-left="router.go(-1)"
    />
    <!-- 订单详情 -->
    <van-cell-group inset>
        <van-field
            readonly
            v-model="order.departurePoint"
            name="出发地"
            label="出发地"
        />
        <van-field
            readonly
            v-model="order.arrivePoint"
            name="到达地"
            label="到达地"
        />
        <van-field
            readonly
            v-model="passingPoint"
            name="途径地"
            label="途径地"
        />
        <van-button plain block type="primary"
            size="small" style="width: 40%;margin: 2% auto"
            @click="jumpToPreviewMap()">
            预览行程路线
        </van-button>
        <van-field
            v-model="order.departureTime"
            name="出发时间"
            label="出发时间"
        />
        <van-field
            v-model="order.arriveTime"
            name="到达时间"
            label="到达时间"
        />
    </van-cell-group>
    <!-- 行程按钮区 -->
    <div class="btn-area">
        <div v-if="order.status === 'PRE_ORDER_REQUEST_SUBMITTED'">正在等待司机确认</div>
        <div style="flex-direction: row" v-if="order.status === 'PRE_ORDER_REQUEST_PASSED'">
            <van-button plain>
                确认发车
            </van-button>
            <van-button plain type="danger">
                取消行程
            </van-button>
        </div>
        <div v-if="order.status === 'PRE_DEPARTURE_USER_CANCELLED'">订单已被用户取消</div>
        <van-button plain v-if="order.status === 'DRIVING_USER_CONFIRM_DEPARTURE'">
            确认到达
        </van-button>
        <div v-if="order.status === 'ARRIVED_USER_UNPAID'">请您支付订单</div>
        <van-button plain v-if="order.status === 'ARRIVED_USER_UNPAID'">
            开始支付
        </van-button>
        <div v-if="order.status === 'PAID_WAITING_CALLBACK'">已支付，等待回调</div>
        <div v-if="order.status === 'ORDER_NORMAL_CLOSED'">订单正常结束</div>
    </div>
</template>

<style lang="less" scoped>
    .van-cell-group{
      margin-top: 5%;
    }
    .btn-area{
      display: flex;
      margin-top:5%;
      justify-content: center;
      // 纵向
      flex-direction: column;
      align-items: center;
      text-align: center;
      .van-button .div {
        margin-top:1%;
      }
    }
</style>
