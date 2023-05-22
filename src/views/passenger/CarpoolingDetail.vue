<script setup>
    import {useRouter} from 'vue-router'
	import {onMounted, ref} from 'vue'
	import {handleGetCarpoolingDetail, handleSubmitApplication} from '@/api/passenger'
	import {showNotify} from 'vant'
	import 'vant/es/notify/style'
	import {useUserStore} from '@/stores'
	import {storeToRefs} from 'pinia'
    
    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const navTitle = ref('')
    const router = useRouter()
    const carpoolingDetail = ref({
		id: 1,
		driverId: 1,
		departureTime: '',
		arriveTime: '',
		departurePoint: '',
		arrivePoint: '',
		passingPoint: '',
		description: '',
		totalPassengerNo: 1,
		leftPassengerNo: 1,
		price: 0
    })
    
    const passingPoint = ref('')
    
    onMounted(async () => {
		const carpoolingId = router.currentRoute.value.query.id
		const data = await handleGetCarpoolingDetail(carpoolingId)
        if (data !== null && data.code === 2000) {
			carpoolingDetail.value = data.carpooling
            navTitle.value = '到达: ' + carpoolingDetail.value.arrivePoint
            passingPoint.value = JSON.parse(carpoolingDetail.value.passingPoint).join(' ')
        } else {
			showNotify({
                type: 'danger',
                message: '获取拼车信息失败'
            })
        }
    })
    
    const openChatDetail = () => {
		if (currentUser.value.user.id === carpoolingDetail.value.driverId) {
			showNotify({
                type: 'warning',
                message: '不能和自己聊天'
            })
		} else {
			window.location.href = `#/main/my/my-chats/detail?toUserId=${carpoolingDetail.value.driverId}`
        }
    }

	const jumpToPreviewMap = async () => {
		const passingPointArr = []
		if (passingPoint.value !== '') {
			// 解析途径地点
			passingPointArr.push(passingPoint.value.split(' '))
		}
		window.location.href = '#/main/driver/preview-map?departurePoint='
			+ carpoolingDetail.value.departurePoint
			+ '&arrivePoint=' + carpoolingDetail.value.arrivePoint
			+ '&passingPoint=' + passingPointArr
	}
	
	const submitApplication = async () => {
		const data = await handleSubmitApplication(carpoolingDetail.value.id)
        if (data !== null && data.code === 2000) {
			showNotify({
                type: 'success',
                message: '申请成功,3秒后跳转回主页'
            })
            setTimeout(() => {
				window.location.href = '/main/passenger/passenger-home'
			}, 3000)
        } else if (data !== null) {
			showNotify({
                type: 'danger',
                message: `申请失败,${data.msg}`
            })
        } else {
			showNotify({
                type: 'danger',
                message: '申请失败'
            })
        }
    }
</script>

<template>
    <van-nav-bar
        :title="navTitle"
        left-text="返回"
        left-arrow
        right-text="联系司机"
        @click-left="router.go(-1)"
        @click-right="openChatDetail()"
    />
    <div class="carpooling-detail-container">
        <van-form readonly>
            <van-cell-group inset>
                <van-field
                    v-model="carpoolingDetail.departurePoint"
                    name="出发地"
                    label="出发地"
                />
                <van-field
                    v-model="carpoolingDetail.arrivePoint"
                    name="到达地"
                    label="到达地"
                />
                <van-field
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
                    v-model="carpoolingDetail.departureTime"
                    name="出发时间"
                    label="出发时间"
                />
                <van-field
                    v-model="carpoolingDetail.arriveTime"
                    name="到达时间"
                    label="到达时间"
                />
                <van-field
                    v-model="carpoolingDetail.description"
                    name="行程描述"
                    label="行程描述"
                />
                <van-field
                    v-model="carpoolingDetail.totalPassengerNo"
                    name="总座位数"
                    label="总座位数"
                />
                <van-field
                    v-model="carpoolingDetail.leftPassengerNo"
                    name="剩余座位数"
                    label="剩余座位数"
                />
                <van-field
                    v-model="carpoolingDetail.price"
                    name="价格"
                    label="价格"
                />
            </van-cell-group>
        </van-form>

        <div class="submit-order-btn">
            <van-button plain block type="primary" @click="submitApplication()">
                申请乘车
            </van-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .carpooling-detail-container{
        margin-top: 5%;
        width: 100%;
        height: 100%;
        text-align: center;
        .submit-order-btn{
            display: flex;
            justify-content: space-around;
            margin: 5% auto 5%;
            .van-button{
                width: 40%;
            }
        }
    }
    .van-cell-group{
      // 阴影
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }
</style>
