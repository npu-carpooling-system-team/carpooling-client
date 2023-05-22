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
    
    statusI18nList.set('ARRIVED_USER_UNPAID', '用户未支付')
	statusI18nList.set('PAID_WAITING_CALLBACK', '已支付，等待回调')
    statusI18nList.set('ORDER_NORMAL_CLOSED', '订单正常结束')
	
	onMounted(async () => {
        await getOrderList()
    })
    
    const checkOrderDetails = async (order) => {
		await router.push(`/main/carpooling/order-detail?orderId=${order.id}`)
    }
</script>

<template>
    <div class="passenger-order-list-container">
        <van-list
            finished
            finished-text="没有更多订单了"
        >
            <van-cell-group inset v-for="order in orderList" :key="order" @click="checkOrderDetails(order)">
                <van-cell class="orderItem">
                    <van-row>
                        <van-col span="12">
                            {{order.departurePoint}}
                        </van-col>
                        <van-col span="12">
                            {{order.arrivePoint}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="11">
                            {{order.departureTime}}
                        </van-col>
                        <van-col span="2">
                            <span>--></span>
                        </van-col>
                        <van-col span="11">
                            {{order.arriveTime}}
                        </van-col>
                    </van-row>
                    <hr/>
                    <van-row>
                        <van-col span="8">
                            下单时间
                        </van-col>
                        <van-col span="16">
                            {{order.createTime}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="8">
                            订单更新时间
                        </van-col>
                        <van-col span="16">
                            {{order.updateTime}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="8">
                            订单状态
                        </van-col>
                        <van-col span="16">
                            {{statusI18nList.get(order.status)}}
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<style lang="less" scoped>
    .passenger-order-list-container{
      margin-top: 5%;
      .van-cell-group{
        margin-top: 2%;
        .orderItem {
          .van-cell__value {
            min-width: 80%;
            .van-row{
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
          }
        }
      }
    }
</style>
