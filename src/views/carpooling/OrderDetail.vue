<script setup>
    import {useRouter} from 'vue-router'
    import {onMounted, ref} from 'vue'
    import {
        getCancelTimes,
        getCarpoolingDetailsByDriver,
        handleCancelOrder,
        handleConfirmArrive,
        handleConfirmDeparture,
        handleStartPayment,
        handleSubmitScore
    } from '@/api/passenger'
    import {showConfirmDialog, showNotify} from 'vant'

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
    const rateValue = ref(0)
    
    onMounted(async () => {
		orderId.value = router.currentRoute.value.query.orderId
        await getOrderDetails()
        passingPoint.value = JSON.parse(order.value.passingPoint).join(' ')
        if (document.getElementById('van-tab') !== null) {
            // 移除van-tabs这一id所在的元素
            document.getElementById('van-tab').remove()
        }
        rateValue.value = order.value.score === 0 ? 1 : order.value.score
    })
    
    const jumpToPreviewMap = async () => {
        const passingPointArr = []
		if (order.value.passingPoint !== '') {
			// 解析途径地点
			passingPointArr.push(JSON.parse(order.value.passingPoint))
		}
        await router.push('/main/driver/preview-map?departurePoint='
			+ order.value.departurePoint
			+ '&arrivePoint=' + order.value.arrivePoint
			+ '&passingPoint=' + order.value.passingPoint
            + '&fromUrl=/main/carpooling/passenger-order')
	}
    
    const confirmDeparture = async () => {
        const data = await handleConfirmDeparture(orderId.value)
        if (data !== null && data.code === 2000) {
            showNotify({
                type: 'success',
                message: '确认发车成功'
            })
            await getOrderDetails()
        } else if (data !== null) {
            showNotify({
                type: 'danger',
                message: `确认发车失败,${data.msg}`
            })
        } else {
            showNotify({
                type: 'danger',
                message: '确认发车失败,请检查网络连接'
            })
        }
    }
    
	const checkAndConfirmDeparture = async () => {
        // 如果当前时间与出发时间之间大于一小时 则需要提醒
        const now = new Date()
        const departureTime = new Date(order.value.departureTime)
        if (departureTime.getTime() - now.getTime() > 3600000 ||
            now.getTime() - departureTime.getTime() > 3600000) {
            showConfirmDialog({
                title: '提示',
                message: '当前时间与出发时间相差较大,是否确认发车',
                confirmButtonText: '确认发车',
                cancelButtonText: '取消',
                confirmButtonColor: '#f00',
                showCancelButton: true
            }).then(async () => {
                await confirmDeparture()
            }).catch(() => {
                showNotify({
                    type: 'primary',
                    message: '您已放弃确认发车'
                })
            })
        } else {
            await confirmDeparture()
        }
    }

	const confirmCancelTimes = async () => {
		const data = await getCancelTimes()
		if (data !== null && data.code === 2000) {
			const cancelTimes = data.result.userCancelTimes
			if (cancelTimes >= 3) {
				showConfirmDialog({
					title: '提示',
					message: `您本年度已经取消了${cancelTimes}次订单,本次若强制取消订单将会直接进入收费流程`,
					confirmButtonText: '确认取消',
					cancelButtonText: '取消',
					confirmButtonColor: '#f00',
					showCancelButton: true
				}).then(() => {
					return true
				}).catch(() => {
					showNotify({
						type: 'warning',
						message: '您已放弃取消订单'
					})
					return false
				})
			} else if (cancelTimes !== 0) {
				showNotify({
					type: 'warning',
					message: `您在半年内一共取消了${cancelTimes}次订单,本次可直接取消`
				})
				return true
			}
			return true
		} else if (data !== null) {
			showNotify({
				type: 'danger',
				message: `获取取消次数失败,${data.msg}`
			})
			return false
		}
		showNotify({
			type: 'danger',
			message: '获取取消次数失败,请检查网络连接'
		})
		return false
	}
	
	const cancelOrder = async (orderId) => {
		const data = await handleCancelOrder(orderId)
        if (data !== null && data.code === 2000) {
            showNotify({
                type: 'success',
                message: '取消订单成功'
            })
            await getOrderDetails()
        } else if (data !== null) {
			showNotify({
                type: 'danger',
                message: `取消订单失败,${data.msg}`
            })
        } else {
            showNotify({
                type: 'danger',
                message: '取消订单失败,请检查网络连接'
            })
		}
    }
	
	const confirmAndCancelOrder = async () => {
		const result = await confirmCancelTimes()
        if (result) {
			await cancelOrder(orderId.value)
        }
    }
    
    const confirmArrive = async () => {
        const data = await handleConfirmArrive(orderId.value)
        if (data !== null && data.code === 2000) {
            showNotify({
                type: 'success',
                message: '确认到达成功'
            })
            await getOrderDetails()
        } else if (data !== null) {
            showNotify({
                type: 'danger',
                message: `确认到达失败,${data.msg}`
            })
        } else {
            showNotify({
                type: 'danger',
                message: '确认到达失败,请检查网络连接'
            })
        }
    }
    
    const showPayBar = ref(false)
    
    const handlePaymentSelect = async (index) => {
        if (index.name === '支付宝支付'){
            try {
                const data = await handleStartPayment(orderId.value)
                if (data !== null && data.code === 2000) {
                    showPayBar.value = false
                    // 执行data.payUrl中的<script>代码
                    document.write(data.payUrl)
                } else if (data !== null){
                    showNotify({
                        type: 'danger',
                        message: `支付失败,${data.msg}`
                    })
                } else {
                    showNotify({
                        type: 'danger',
                        message: '支付失败,请检查网络连接'
                    })
                }
            } catch (e) {
                console.log(e)
            } finally {
                showPayBar.value = false
                await getOrderDetails()
            }
        } else {
            showNotify({
                type: 'danger',
                message: '暂不支持该支付方式'
            })
        }
    }
    
    const actions = [
        {
            name: '支付宝支付'
        }
    ]
    
    const submitScore = async () => {
        const data = await handleSubmitScore(orderId.value, rateValue.value)
        if (data !== null && data.code === 2000) {
            showNotify({
                type: 'success',
                message: '评分成功'
            })
            await getOrderDetails()
        } else if (data !== null) {
            showNotify({
                type: 'danger',
                message: `评分失败,${data.msg}`
            })
        } else {
            showNotify({
                type: 'danger',
                message: '评分失败,请检查网络连接'
            })
        }
    }
</script>

<template>
    <div>
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
                readonly
                v-model="order.departureTime"
                name="出发时间"
                label="出发时间"
            />
            <van-field
                readonly
                v-model="order.arriveTime"
                name="到达时间"
                label="到达时间"
            />
            <van-field
                v-if="order.status === 'ORDER_NORMAL_CLOSED'"
                readonly
                v-model="order.score"
                name="行程评分"
                label="本次行程评分"
            />
        </van-cell-group>
        <!-- 行程按钮区 -->
        <div class="btn-area">
            <div v-if="order.status === 'PRE_ORDER_REQUEST_SUBMITTED'">正在等待司机确认</div>
            <div style="flex-direction: row" v-if="order.status === 'PRE_ORDER_REQUEST_PASSED'">
                <van-button plain type="success" @click="checkAndConfirmDeparture()">
                    确认发车
                </van-button>
                <van-button plain type="danger" @click="confirmAndCancelOrder()">
                    取消行程
                </van-button>
            </div>
            <div v-if="order.status === 'PRE_DEPARTURE_USER_CANCELLED'">订单已被用户取消</div>
            <van-button
                plain
                type="success"
                v-if="order.status === 'DRIVING_USER_CONFIRM_DEPARTURE'"
                @click="confirmArrive()"
            >
                确认到达
            </van-button>
            <div v-if="order.status === 'ARRIVED_USER_UNPAID'">请您支付订单</div>
            <van-button plain
                v-if="order.status === 'ARRIVED_USER_UNPAID'"
                @click="showPayBar=true"
                type="success"
            >
                开始支付
            </van-button>
            <div v-if="order.status === 'PAID_WAITING_CALLBACK'">已发起支付，正在等待回调</div>
            <div v-if="order.status === 'ORDER_NORMAL_CLOSED' && order.score === '0'">
                订单正常结束,请为本次行程评分
                <p />
            </div>
            <div v-if="order.status === 'ORDER_NORMAL_CLOSED' && order.score !== '0'">
                订单正常结束,您已经给出评分
            </div>
            <div>
                <div>
                    <van-rate
                        v-if="order.status === 'ORDER_NORMAL_CLOSED'"
                        v-model="rateValue"
                        color="#ffd21e"
                        void-icon="star"
                    />
                </div>
                <div>
                    <van-button plain
                        v-if="order.status === 'ORDER_NORMAL_CLOSED' && order.score === '0'"
                        @click="submitScore()"
                    >
                        确认提交评分
                    </van-button>
                </div>
            </div>
        </div>
    
        <!--  底部弹窗  -->
        <van-action-sheet
            v-model:show="showPayBar"
            :actions="actions"
            cancel-text="取消"
            close-on-click-action
            @cancel="showPayBar=false"
            description="请选择支付方式"
            @select="handlePaymentSelect"
        />
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
        margin-top: 5%;
      }
    }
</style>
