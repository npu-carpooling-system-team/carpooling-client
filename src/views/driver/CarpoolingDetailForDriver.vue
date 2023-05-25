<script setup>
    import {useRouter} from 'vue-router'
	import {onMounted, ref} from 'vue'
    import {addCarpooling, handleGetCarpoolingDetail, updateCarpooling} from '@/api/driver'
    import {closeToast, showNotify} from 'vant'
	import 'vant/es/toast/style'
	import 'vant/es/notify/style'
    import axios from "@/api";
    
    const orderId = ref('')
    
    const router = useRouter()
    const order = ref({})
    const updateCarpoolingDto = ref({
        departurePoint: '',
        arrivePoint: '',
        passingPoint: '',
        departureDate: '',
        departureTime: '',
        arriveDate: '',
        arriveTime: '',
        description: '',
        totalPassengerNo: '',
        leftPassengerNo: '',
        price: ''
    })

	const statusI18nList = new Map()
	statusI18nList.set('ORDER_FORCE_CLOSED', '订单强制结束')
	statusI18nList.set('PRE_ORDER_REQUEST_SUBMITTED', '订单已提交')
	statusI18nList.set('PRE_ORDER_REQUEST_PASSED', '订单已通过')
	statusI18nList.set('PRE_DEPARTURE_USER_CANCELLED', '订单已被用户取消')
	statusI18nList.set('DRIVING_USER_CONFIRM_DEPARTURE', '用户确认发车')
	statusI18nList.set('DRIVING_USER_CONFIRM_ARRIVED', '用户确认到达')
	statusI18nList.set('ARRIVED_USER_UNPAID', '用户未支付')
	statusI18nList.set('ORDER_NORMAL_CLOSED', '订单正常结束')

    const showDatePicker1 = ref(false)
    const showDatePicker2 = ref(false)
    const showTimePicker1 = ref(false)
    const showTimePicker2 = ref(false)
    const departureDate = ref('')
    const departureTime = ref('')
    const arriveDate = ref('')
    const arriveTime = ref('')

    const getCarpoolingDetails = async () => {
		const data = await handleGetCarpoolingDetail(orderId.value)
        if (data !== null && data.code === 2000) {
			// console.log(data.carpooling)
            order.value = data.carpooling
            console.log(order.value)
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

    const initUpdateInfo = async () => {
        updateCarpoolingDto.value = order.value
        updateCarpoolingDto.value.departureDate = order.value.departureTime.split(' ')[0]
        updateCarpoolingDto.value.departureTime = order.value.departureTime.split(' ')[1]
        updateCarpoolingDto.value.arriveDate = order.value.arriveTime.split(' ')[0]
        updateCarpoolingDto.value.arriveTime = order.value.arriveTime.split(' ')[1]
        updateCarpoolingDto.value.passingPoint = JSON.parse(order.value.passingPoint).join(' ')
        console.log(updateCarpoolingDto)
    }

	const passingPoint = ref('')

    onMounted(async () => {
		orderId.value = router.currentRoute.value.query.carpoolingId
        await getCarpoolingDetails()
        passingPoint.value = JSON.parse(order.value.passingPoint).join(' ')
        await initUpdateInfo()
        // console.log(order.value)

    })

    const jumpToPreviewMap = async () => {
        const passingPointArr = []
        // console.log(order.value)
		if (order.value.passingPoint !== '') {
			// 解析途径地点
			passingPointArr.push(updateCarpoolingDto.value.passingPoint)
		}
		window.location.href = '#/main/driver/preview-map?departurePoint='
			+ order.value.departurePoint
			+ '&arrivePoint=' + order.value.arrivePoint
			+ '&passingPoint=' + order.value.passingPoint
	}

    const update = async () =>{
        updateCarpoolingDto.value.passingPoint = JSON.stringify(passingPoint.value.split(' '))
        // yyyy-MM-dd HH:mm
        updateCarpoolingDto.value.departureTime =
            departureDate.value + ' ' + departureTime.value
        // yyyy-MM-dd HH:mm
        updateCarpoolingDto.value.arriveTime =
            arriveDate.value + ' ' + arriveTime.value
        // 自定义preCheck
        if (!preCheck()){
            return
        }
        const data = await addCarpooling(updateCarpoolingDto.value)
        if (data.code === 2000){
            showNotify({type: 'success', message: '发布成功,请到详情页查看'})
            clearAddCarpoolingDto()
        } else if(data.msg !== null){
            showNotify({type: 'danger', message: `发布失败,${data.msg}`})
        } else {
            showNotify({type: 'danger', message: '发布失败'})
        }
    }
    // eslint-disable-next-line no-warning-comments
    //TODO 表单校验
    // eslint-disable-next-line no-warning-comments
    //TODO 修改行程put
    // eslint-disable-next-line no-warning-comments
    //TODO 删除行程delete

</script>

<!-- TODO 返回时不显示订单，可能是go(-1)的问题?具体界面修改 -->
<template>
    <van-nav-bar
        :title="'订单详情'"
        left-text="返回"
        left-arrow
        @click-left="router.go(-1)"
    />
    <!-- 订单详情 -->
    <van-form @submit="update()">
        <van-cell-group inset>
            <van-field
                v-model="updateCarpoolingDto.departurePoint"
                name="出发地"
                label="出发地"
                placeholder="请输入出发地点"
                :rules="[{ required: true, message: '请输入出发地点' }]"
            />
            <van-field
                v-model="updateCarpoolingDto.arrivePoint"
                name="到达地"
                label="到达地"
                placeholder="请输入到达地点"
                :rules="[{ required: true, message: '请输入到达地点' }]"
            />
            <van-field
                v-model="updateCarpoolingDto.passingPoint"
                name="途径地"
                label="途径地"
                placeholder="多个途径地点之间请用空格隔开"
            />
            <van-button plain block type="primary"
                        size="small" style="width: 40%;margin: 2% auto"
                        @click="jumpToPreviewMap()">
                预览行程路线
            </van-button>
            <van-field
                v-model="updateCarpoolingDto.departureDate"
                is-link
                readonly
                name="departureDatePicker"
                label="出发日期"
                placeholder="点击选择出发日期"
                @click="showDatePicker1 = true"
                :rules="[{ required: true, message: '请选择出发日期' }]"
            />
            <van-popup v-model:show="showDatePicker1" position="bottom">
<!--                TODO 这里定位到了2013年，有bug-->
                <van-date-picker
                    :min-date="today"
                    @confirm="onDepartureDateConfirm"
                    @cancel="showDatePicker1 = false" />
            </van-popup>
            <van-field
                v-model="updateCarpoolingDto.departureTime"
                is-link
                readonly
                name="departureTimePicker"
                label="出发时间"
                placeholder="点击选择出发时间"
                @click="showTimePicker1 = true"
                :rules="[{ required: true, message: '请输入出发时间' }]"
            />
            <van-popup v-model:show="showTimePicker1" position="bottom">
                <van-time-picker @confirm="onDepartureTimeConfirm" @cancel="showTimePicker1 = false" />
            </van-popup>
            <van-field
                v-model="updateCarpoolingDto.arriveDate"
                is-link
                readonly
                name="arriveDatePicker"
                label="到达日期"
                placeholder="选择到达日期(默认当日到达)"
                @click="showDatePicker2 = true"
                :rules="[{ required: true, message: '请选择到达日期' }]"
            />
            <van-popup v-model:show="showDatePicker2" position="bottom">
                <van-date-picker
                    :min-date="today"
                    @confirm="onArriveDateConfirm"
                    @cancel="showDatePicker2 = false" />
            </van-popup>
            <van-field
                v-model="updateCarpoolingDto.arriveTime"
                is-link
                readonly
                name="arriveTimePicker"
                label="到达时间"
                placeholder="选择到达时间"
                @click="showTimePicker2 = true"
                :rules="[{ required: true, message: '请选择到达时间' }]"
            />
            <van-popup v-model:show="showTimePicker2" position="bottom">
                <van-time-picker @confirm="onArriveTimeConfirm" @cancel="showTimePicker2 = false" />
            </van-popup>
            <van-field
                v-model="updateCarpoolingDto.description"
                name="行程描述"
                label="行程描述"
                placeholder="请输入行程描述"
                :rules="[{ required: true, message: '请输入行程描述' }]"
            />
            <van-field
                v-model="updateCarpoolingDto.totalPassengerNo"
                name="总座位数"
                label="总座位数"
                placeholder="请输入总座位数"
                type="digit"
                :rules="[{ required: true, message: '请输入总座位数' }]"
            />
            <van-field
                v-model="updateCarpoolingDto.leftPassengerNo"
                name="剩余座位数"
                label="剩余座位数"
                placeholder="一般与总座位数一致"
                type="digit"
                :rules="[{ required: true, message: '请输入剩余座位数' }]"
            />
            <van-field
                v-model="updateCarpoolingDto.price"
                name="价格"
                label="价格"
                placeholder="您期望收取乘客的价格"
                type="digit"
                :rules="[{ required: true, message: '请输入价格' }]"
            />
            <div class="submit-carpooling-btn">
<!--                TODO:记得加上修改与删除的提示框-->
                <van-button plain block type="primary" native-type="submit">
                    修改行程
                </van-button>
                <van-button plain block type="danger" @click="clearAddCarpoolingDto()">
                    删除行程
                </van-button>
            </div>
        </van-cell-group>
    </van-form>
    <!-- 行程按钮区 -->
    
</template>

<style lang="less" scoped>
    .van-cell-group{
      margin-top: 5%;
    }
    .submit-carpooling-btn{
        display: flex;
        justify-content: space-around;
        margin: 5% auto 5%;
        .van-button{
            width: 40%;
        }
    }
</style>
