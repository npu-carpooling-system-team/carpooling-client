<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import { handleConfirmApplication, handleGetCarpoolingDetail, handleGetReserveList } from '@/api/driver'
    import { showNotify } from 'vant'
    
    const router = useRouter()
    const carpoolingId = ref()
    
    const reserveList = ref([])
    
    const carpooling = ref({})
    const getCarpoolingDetails = async () => {
        const data = await handleGetCarpoolingDetail(carpoolingId.value)
        if (data !== null && data.code === 2000) {
            carpooling.value = data.carpooling
        } else if (data !== null) {
            showNotify({
                type: 'danger',
                message: `加载行程具体信息失败,${data.msg}`
            })
        } else {
            showNotify({
                type: 'danger',
                message: '加载行程具体信息失败,请检查网络连接'
            })
        }
    }
    const getReserveList = async () => {
        const data = await handleGetReserveList(carpoolingId.value)
        if (data !== null) {
            if (data.code === 2000) {
                reserveList.value = data.result.list
            } else {
                showNotify({
                    type: 'danger',
                    message: '获取申请列表失败' + data.msg
                })
            }
        } else {
            showNotify({
                type: 'danger',
                message: '获取申请列表失败'
            })
        }
    }
    
    onMounted(async () => {
        // 查找页面是否有id为van-tab的元素 如果有则隐藏
        const tab = document.getElementById('van-tab')
        if (tab !== null) {
            tab.style.display = 'none'
        }
        carpoolingId.value = router.currentRoute.value.query.carpoolingId
        await getCarpoolingDetails()
        if (carpooling.value.leftPassengerNo === 0) {
            showNotify({
                type: 'warning',
                message: '当前行程已满员'
            })
        }
        await getReserveList()
    })
    
    const confirmApplication = async (orderId, pass) => {
        if (carpooling.value.leftPassengerNo === 0) {
            showNotify({
                type: 'warning',
                message: '当前行程已满员'
            })
            return
        }
        const confirmDto = {
            orderId: orderId,
            pass: pass
        }
        const data = await handleConfirmApplication(confirmDto)
        if (data !== null) {
            if (data.code === 2000) {
                showNotify({
                    type: 'success',
                    message: '操作成功'
                })
                await getCarpoolingDetails()
                await getReserveList()
            } else {
                showNotify({
                    type: 'danger',
                    message: '操作失败' + data.msg
                })
            }
        } else {
            showNotify({
                type: 'danger',
                message: '操作失败'
            })
        }
    }
</script>

<template>
    <van-nav-bar
        :title="'拼车申请列表'"
        left-text="返回"
        left-arrow
        @click-left="router.go(-1)"
    />
    <div style="text-align: center">
        <h5>当前行程剩余座位:{{carpooling.leftPassengerNo}}</h5>
    </div>
    <div class="reserve-list-container">
        <van-list finished finished-text="没有更多申请了">
            <van-cell-group
                inset
                v-for="apply in reserveList"
                :key="apply"
            >
                <van-cell class="apply-item">
                    <van-row>
                        <b>乘客用户名: {{ apply.passengerName }}</b>
                    </van-row>
                    <van-row>
                        申请时间: {{apply.applyTime}}
                    </van-row>
                    <van-row>
                        <van-col span="12">
                            订单号: {{ apply.orderId }}
                        </van-col>
                        <van-col span="12">
                            乘客号: {{ apply.passengerId }}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12">
                            <van-button
                                size="mini" type="success"
                                icon="success"
                                @click="confirmApplication(apply.orderId, true)"
                                v-if="carpooling.leftPassengerNo !== 0"
                            >
                                同意
                            </van-button>
                        </van-col>
                        <van-col span="12">
                            <van-button
                                size="mini" type="danger"
                                icon="cross"
                                @click="confirmApplication(apply.orderId, false)"
                            >
                                拒绝
                            </van-button>
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<style scoped lang="less">
    .reserve-list-container{
        margin-top: 5%;
        .van-cell-group {
            margin-top: 2%;
            
            .apply-item {
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
