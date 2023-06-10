<script setup>
    import {onMounted, ref} from 'vue'
    import {handleGetDriversCarpoolingList} from '@/api/driver'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'
    import router from '@/router'

    const carpoolingList = ref([])

	const queryDto = ref({
		pageNum: 1,
		pageSize: 10,
		query: '',
		departureTime: '',
		arriveTime: ''
	})

	const getCarpoolingList = async () => {
		const data = await handleGetDriversCarpoolingList(queryDto.value)
		if (data !== null && data.code === 2000) {
			carpoolingList.value = data.data
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
		await getCarpoolingList()
	})

	const checkCarpoolingDetails = async (carpooling) => {
		await router.push(`/main/carpooling/carpooling-detail-driver?carpoolingId=${carpooling.id}`)
	}
</script>

<template>
    <div class="passenger-order-list-container">
        <van-list finished finished-text="没有更多订单了">
            <van-cell-group
                inset
                v-for="carpooling in carpoolingList"
                :key="carpooling"
                @click="checkCarpoolingDetails(carpooling)">
                <van-cell class="order-item">
                    <van-row>
                        <van-col span="12">
                            {{ carpooling.departurePoint }}
                        </van-col>
                        <van-col span="12">
                            {{ carpooling.arrivePoint }}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="11">
                            {{ carpooling.departureTime }}
                        </van-col>
                        <van-col span="2">
                            <span>--></span>
                        </van-col>
                        <van-col span="11">
                            {{ carpooling.arriveTime }}
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<style lang="less" scoped>
  .passenger-order-list-container {
    margin-top: 5%;

    .van-cell-group {
      margin-top: 2%;

      .order-item {
        .van-cell__value {
          min-width: 80%;

          .van-row {
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
