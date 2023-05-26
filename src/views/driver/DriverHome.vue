<script setup>
    import {onBeforeUnmount, onMounted, ref} from 'vue'
    import {useRouter} from 'vue-router'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    import {useUserStore} from '@/stores'
    import {useCarpoolingDtoStore} from '@/stores/driver'
    import {storeToRefs} from 'pinia'
    
    import {addCarpooling} from '@/api/driver'
    
    
    const carpoolingDtoStore = useCarpoolingDtoStore()
    const {carpoolingCache} = storeToRefs(carpoolingDtoStore)
    
    const router = useRouter()
    const addCarpoolingDto = ref({
        departureTime: '',
        arriveTime: '',
        departurePoint: '',
        arrivePoint: '',
        passingPoint: '',
        description: '',
        totalPassengerNo: '',
        leftPassengerNo: '',
        price: ''
    })
    const passingPoint = ref('')
    
    // 获取当前日期 yyyy-MM-dd
    const today = new Date()
    
    const jumpToPreviewMap = async () => {
        if (addCarpoolingDto.value.departurePoint === ''
            || addCarpoolingDto.value.arrivePoint === ''
        ) {
            showNotify({type: 'danger', message: '请输入出发与到达地点'})
            return
        }
        const passingPointArr = []
        if (passingPoint.value !== '') {
            // 解析途径地点
            passingPointArr.push(passingPoint.value.split(' '))
        }
        await router.push('/main/driver/preview-map?departurePoint='
            + addCarpoolingDto.value.departurePoint
            + '&arrivePoint=' + addCarpoolingDto.value.arrivePoint
            + '&passingPoint=' + passingPointArr)
    }
    
    const showDatePicker1 = ref(false)
    const showDatePicker2 = ref(false)
    const showTimePicker1 = ref(false)
    const showTimePicker2 = ref(false)
    const departureDate = ref('')
    const departureTime = ref('')
    const arriveDate = ref('')
    const arriveTime = ref('')
    const onDepartureDateConfirm = ({selectedValues}) => {
        departureDate.value = selectedValues.join('-')
        // 默认arriveDate与departureDate相同
        arriveDate.value = selectedValues.join('-')
        showDatePicker1.value = false
    }
    const onDepartureTimeConfirm = ({selectedValues}) => {
        departureTime.value = selectedValues.join(':')
        showTimePicker1.value = false
    }
    const onArriveDateConfirm = ({selectedValues}) => {
        arriveDate.value = selectedValues.join('-')
        showDatePicker2.value = false
    }
    const onArriveTimeConfirm = ({selectedValues}) => {
        arriveTime.value = selectedValues.join(':')
        showTimePicker2.value = false
    }
    
    const preCheck = () => {
        // 从pinia中获取当前用户信息
        const userStore = useUserStore()
        const {currentUser} = storeToRefs(userStore)
        // 校验司机是否已经绑定支付宝
        if (currentUser.value.user.alipayId === '' || currentUser.value.user.alipayId === null) {
            showNotify({type: 'danger', message: '请先绑定支付宝'})
            return false
        }
        // 到达时间应在出发时间之后
        if (addCarpoolingDto.value.departureTime >= addCarpoolingDto.value.arriveTime) {
            showNotify({type: 'danger', message: '到达时间应在出发时间之后'})
            return false
        }
        // 出发时间应当在当前时间之后 2023/5/12 21:18:15
        let currentTimeStr = new Date().toLocaleString('zh', {hour12: false})
        // 转成yyyy-MM-dd HH:mm
        currentTimeStr = currentTimeStr.replace(/\//g, '-')
        // 如果月份是个位数的 补0
        if (currentTimeStr.split('-')[1].length === 1) {
            currentTimeStr = currentTimeStr.replace(/-/, '-0')
        }
        if (addCarpoolingDto.value.departureTime <= currentTimeStr) {
            showNotify({type: 'danger', message: '出发时间应当在当前时间之后'})
            return false
        }
        // 司机的驾照类型 currentUser.value.driver.driversLicenseType
        if ((currentUser.value.driver.driversLicenseType === 'C1' ||
                currentUser.value.driver.driversLicenseType === 'C2') &&
            addCarpoolingDto.value.totalPassengerNo > 5) {
            showNotify({type: 'danger', message: '您的驾照类型不支持超过5人的拼车'})
            return false
        }
        // 总乘客人数大于等于剩余乘客人数
        if (addCarpoolingDto.value.totalPassengerNo < addCarpoolingDto.value.leftPassengerNo) {
            showNotify({type: 'danger', message: '总乘客人数应大于等于剩余乘客人数'})
            return false
        }
        return true
    }
    
    const clearAddCarpoolingDto = () => {
        addCarpoolingDto.value = {
            departureTime: '',
            arriveTime: '',
            departurePoint: '',
            arrivePoint: '',
            passingPoint: '',
            description: '',
            totalPassengerNo: '',
            leftPassengerNo: '',
            price: ''
        }
        passingPoint.value = ''
        departureDate.value = ''
        departureTime.value = ''
        arriveDate.value = ''
        arriveTime.value = ''
        // setup的组合式语法下pinia的reset方法失效 无法使用 因此手动执行state更新
        carpoolingDtoStore.$patch((state) => {
            state.carpoolingCache = addCarpoolingDto.value
        })
    }
    
    // 提交行程信息
    const submitCarpooling = async () => {
        addCarpoolingDto.value.passingPoint = JSON.stringify(passingPoint.value.split(' '))
        // yyyy-MM-dd HH:mm
        addCarpoolingDto.value.departureTime =
            departureDate.value + ' ' + departureTime.value
        // yyyy-MM-dd HH:mm
        addCarpoolingDto.value.arriveTime =
            arriveDate.value + ' ' + arriveTime.value
        // 自定义preCheck
        if (!preCheck()) {
            return
        }
        const data = await addCarpooling(addCarpoolingDto.value)
        if (data.code === 2000) {
            showNotify({type: 'success', message: '发布成功,请到详情页查看'})
            clearAddCarpoolingDto()
        } else if (data.msg !== null) {
            showNotify({type: 'danger', message: `发布失败,${data.msg}`})
        } else {
            showNotify({type: 'danger', message: '发布失败'})
        }
    }
    
    onMounted(() => {
        // 从pinia中读取行程信息
        if (carpoolingCache.value.departurePoint !== '') {
            addCarpoolingDto.value = carpoolingCache.value
            // 将passingPoint.value转换为字符串
            passingPoint.value = carpoolingCache.value.passingPoint === '' ?
                '' : JSON.parse(carpoolingCache.value.passingPoint).join(' ')
            // 时间与日期解析
            departureDate.value = carpoolingCache.value.departureTime.split(' ')[0]
            departureTime.value = carpoolingCache.value.departureTime.split(' ')[1]
            arriveDate.value = carpoolingCache.value.arriveTime.split(' ')[0]
            arriveTime.value = carpoolingCache.value.arriveTime.split(' ')[1]
        }
    })
    
    onBeforeUnmount(() => {
        addCarpoolingDto.value.passingPoint = passingPoint.value === '' ?
            '' : JSON.stringify(passingPoint.value.split(' '))
        // 将addCarpoolingDto.value存入pinia
        carpoolingDtoStore.$patch((state) => {
            state.carpoolingCache = addCarpoolingDto.value
        })
    })
</script>

<template>
    <div class="driver-home-container">
        <h2>添加您的行程</h2>
        <van-form @submit="submitCarpooling()">
            <van-cell-group inset>
                <van-field
                    v-model="addCarpoolingDto.departurePoint"
                    name="出发地"
                    label="出发地"
                    placeholder="请输入出发地点"
                    :rules="[{ required: true, message: '请输入出发地点' }]"
                />
                <van-field
                    v-model="addCarpoolingDto.arrivePoint"
                    name="到达地"
                    label="到达地"
                    placeholder="请输入到达地点"
                    :rules="[{ required: true, message: '请输入到达地点' }]"
                />
                <van-field
                    v-model="passingPoint"
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
                    v-model="departureDate"
                    is-link
                    readonly
                    name="departureDatePicker"
                    label="出发日期"
                    placeholder="点击选择出发日期"
                    @click="showDatePicker1 = true"
                    :rules="[{ required: true, message: '请选择出发日期' }]"
                />
                <van-popup v-model:show="showDatePicker1" position="bottom">
                    <van-date-picker
                        :min-date="today"
                        @confirm="onDepartureDateConfirm"
                        @cancel="showDatePicker1 = false"/>
                </van-popup>
                <van-field
                    v-model="departureTime"
                    is-link
                    readonly
                    name="departureTimePicker"
                    label="出发时间"
                    placeholder="点击选择出发时间"
                    @click="showTimePicker1 = true"
                    :rules="[{ required: true, message: '请输入出发时间' }]"
                />
                <van-popup v-model:show="showTimePicker1" position="bottom">
                    <van-time-picker @cancel="showTimePicker1 = false" @confirm="onDepartureTimeConfirm"/>
                </van-popup>
                <van-field
                    v-model="arriveDate"
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
                        @cancel="showDatePicker2 = false"/>
                </van-popup>
                <van-field
                    v-model="arriveTime"
                    is-link
                    readonly
                    name="arriveTimePicker"
                    label="到达时间"
                    placeholder="选择到达时间"
                    @click="showTimePicker2 = true"
                    :rules="[{ required: true, message: '请选择到达时间' }]"
                />
                <van-popup v-model:show="showTimePicker2" position="bottom">
                    <van-time-picker @cancel="showTimePicker2 = false" @confirm="onArriveTimeConfirm"/>
                </van-popup>
                <van-field
                    v-model="addCarpoolingDto.description"
                    name="行程描述"
                    label="行程描述"
                    placeholder="请输入行程描述"
                    :rules="[{ required: true, message: '请输入行程描述' }]"
                />
                <van-field
                    v-model="addCarpoolingDto.totalPassengerNo"
                    name="总座位数"
                    label="总座位数"
                    placeholder="请输入总座位数"
                    type="digit"
                    :rules="[{ required: true, message: '请输入总座位数' }]"
                />
                <van-field
                    v-model="addCarpoolingDto.leftPassengerNo"
                    name="剩余座位数"
                    label="剩余座位数"
                    placeholder="一般与总座位数一致"
                    type="digit"
                    :rules="[{ required: true, message: '请输入剩余座位数' }]"
                />
                <van-field
                    v-model="addCarpoolingDto.price"
                    name="价格"
                    label="价格"
                    placeholder="您期望收取乘客的价格"
                    type="digit"
                    :rules="[{ required: true, message: '请输入价格' }]"
                />
                <div>
                    <p>您确认添加行程则代表您认可我们的</p>
                    <p style="color: #5CA0FF"
                       @click="router.push('/main/driver/fee-policy')">
                        服务费率政策
                    </p>
                </div>
                <div class="submit-carpooling-btn">
                    <van-button plain block type="primary" native-type="submit">
                        添加行程
                    </van-button>
                    <van-button plain block type="success" @click="clearAddCarpoolingDto()">
                        清空数据
                    </van-button>
                </div>
            </van-cell-group>
        </van-form>
    </div>
</template>

<style lang="less" scoped>
.driver-home-container {
    width: 100%;
    height: 100%;
    text-align: center;

    .submit-carpooling-btn {
        display: flex;
        justify-content: space-around;
        margin: 5% auto 5%;

        .van-button {
            width: 40%;
        }
    }
}
</style>
