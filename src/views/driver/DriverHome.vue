<script setup>
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'

    const router = useRouter()
    const addCarpoolingDto = ref({
        id: '',
        departureTime: '',
        arriveTime: '',
        departurePoint: '',
        arrivePoint: '',
        passingPoint: '',
        description: '',
        totalPassengerNo: 0,
        leftPassengerNo: 0,
        price: 0
    })
    const passingPoint = ref('')
    
    const jumpToPreviewMap = async () => {
        if (addCarpoolingDto.value.departurePoint === ''
            || addCarpoolingDto.value.arrivePoint === ''
        ) {
            showNotify({type: 'danger', message: '请输入出发与到达地点'})
            return
        }
        const passingPointArr = []
        if (passingPoint.value !== ''){
            // 解析途径地点
            passingPointArr.push(passingPoint.value.split(' '))
        }
        await router.push('/main/driver/preview-map?departurePoint='
            + addCarpoolingDto.value.departurePoint
            + '&arrivePoint=' + addCarpoolingDto.value.arrivePoint
            + '&passingPoint=' + passingPointArr)
    }
</script>

<template>
    <div class="driver-home-container">
        <h2>添加您的行程</h2>
        <van-form>
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
                    size="small" style="width: 40%;
                    margin: 1% auto" @click="jumpToPreviewMap()">
                    预览路线
                </van-button>
            </van-cell-group>
        </van-form>
    </div>
</template>

<style lang="less" scoped>
    .driver-home-container{
        width: 100%;
        height: 100%;
        text-align: center;
    }
</style>
