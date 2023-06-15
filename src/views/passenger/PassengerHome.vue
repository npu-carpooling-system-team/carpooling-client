<script setup>
    import {onMounted, ref} from 'vue'
    import {handleGetCarpoolingList} from '@/api/passenger'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'
    import {useRouter} from 'vue-router'

    const router = useRouter()
    const departureDate = ref('')
    const departureTime = ref('')
    
    const queryDto = ref({
		pageNum: 1,
        pageSize: 10,
		query: '',
		departureTime: '',
        arriveTime: ''
    })
    
    // 获取当前日期 yyyy-MM-dd
    const today = new Date()
    // 后天
    let afterTomorrow = new Date()
    afterTomorrow.setDate(new Date().getDate() + 2)
    
    const showDatePicker = ref(false)
    const showTimePicker = ref(false)
    
    const carpoolingList = ref([])

	const loading = ref(false)
	const finished = ref(false)
    
    let oldQueryDto = {
		query: '',
		departureTime: '',
		arriveTime: ''
	}
    // eslint-disable-next-line complexity
    const getCarpoolingList = async () => {
        loading.value = true
        // 处理carpoolingDto中的数据
        if (departureDate.value !== '') {
            queryDto.value.departureTime = departureDate.value
            if (departureTime.value !== '') {
                queryDto.value.departureTime = queryDto.value.departureTime + ' ' + departureTime.value
            } else {
                // 拼接00:01
                queryDto.value.departureTime = queryDto.value.departureTime + ' 00:01'
            }
        }
        
		if (oldQueryDto.query !== queryDto.value.query
            || oldQueryDto.departureTime !== queryDto.value.departureTime
            || oldQueryDto.arriveTime !== queryDto.value.arriveTime) {
            console.log("new query")
            queryDto.value.pageNum = 1
            finished.value = false
        }
        
        console.log(queryDto.value)
        
		if (departureDate.value === '' && departureTime.value !== ''){
			showNotify({
                type: 'danger',
                message: '请选择出发日期'
            })
            return
        }
        
		const data = await handleGetCarpoolingList(queryDto.value)
        if (data === null) {
			showNotify({
                type: 'danger',
                message: '获取拼车列表失败: 服务器错误'
            })
        }
        if (data.code === 2000) {
			// 后端已经处理过了 但以防万一
			// 删除data.data中departureTime小于当前时间的实例
			// 转换为yyyy-MM-dd HH:mm
            const now = new Date().toISOString().slice(0,19).replace('T', ' ')
            for (let i = 0; i < data.data.length; i++) {
				if (data.data[i].departureTime < now) {
					data.data.splice(i, 1)
                    i--
				}
            }
            
			if (oldQueryDto.query !== queryDto.value.query
				|| oldQueryDto.departureTime !== queryDto.value.departureTime
				|| oldQueryDto.arriveTime !== queryDto.value.arriveTime) {
				carpoolingList.value = []
				carpoolingList.value.push(...data.data)
                oldQueryDto = {
					query: queryDto.value.query,
                    departureTime: queryDto.value.departureTime,
                    arriveTime: queryDto.value.arriveTime
                }
            } else {
				carpoolingList.value.push(...data.data)
            }
            queryDto.value.pageNum ++
            if (data.total !== queryDto.value.pageSize) {
				finished.value = true
			}
        } else {
			showNotify({
				type: 'danger',
				message: `获取拼车列表失败：${data.msg}`
			})
        }
		loading.value = false
	}
    
    onMounted(async () => {
		await getCarpoolingList(true)
    })

	const onDepartureDateConfirm = ({ selectedValues }) => {
		departureDate.value = selectedValues.join('-')
		showDatePicker.value = false
	}
	const onDepartureTimeConfirm = ({ selectedValues }) => {
		departureTime.value = selectedValues.join(':')
		showTimePicker.value = false
	}
	
	const clearDate = () => {
		departureDate.value = ''
		showDatePicker.value = false
    }
	
	const clearTime = () => {
		departureTime.value = ''
		showTimePicker.value = false
    }
	
	const showCarpoolingDetail = async (carpooling) => {
		await router.push(`/main/passenger/carpooling-detail?id=${carpooling.id}`)
    }
</script>

<template>
    <!-- 搜索条 -->
    <van-form class="searchForm">
        <van-cell-group inset>
            <van-search
                label="搜索"
                v-model="queryDto.query"
                show-action
                placeholder="请输入搜索关键词"
                @clear="getCarpoolingList()"
            >
                <template #action>
                    <van-button plain block type="primary"
                        size="mini" @click="getCarpoolingList()"
                    >
                        搜索
                    </van-button>
                </template>
            </van-search>
            <van-field
                v-model="departureDate"
                is-link
                readonly
                name="departureDatePicker"
                label="出发日期"
                placeholder="点击选择出发日期(可空)"
                @click="showDatePicker = true"
                clearable
            />
            <van-popup v-model:show="showDatePicker" position="bottom">
                <van-date-picker
                    :min-date="today"
                    :max-date="afterTomorrow"
                    @confirm="onDepartureDateConfirm"
                    @cancel="clearDate" />
            </van-popup>
            <van-field
                v-model="departureTime"
                is-link
                readonly
                name="departureTimePicker"
                label="出发时间"
                placeholder="点击选择出发时间(可空)"
                @click="showTimePicker = true"
            />
            <van-popup v-model:show="showTimePicker" position="bottom">
                <van-time-picker @confirm="onDepartureTimeConfirm" @cancel="clearTime" />
            </van-popup>
        </van-cell-group>
    </van-form>
    <!-- 内容部分 始终位于搜索条下方-->
    <div class="carpooling-card-container">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多行程了"
            @load="getCarpoolingList"
        >
            <van-cell-group inset style="margin-top:2%" v-for="carpooling in carpoolingList" :key="carpooling">
                <van-cell class="carpoolingItem" @click="showCarpoolingDetail(carpooling)">
                    <van-row>
                        <van-col span="12">
                            {{carpooling.departurePoint}}
                        </van-col>
                        <van-col span="12">
                            {{carpooling.arrivePoint}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="11">
                            {{carpooling.departureTime}}
                        </van-col>
                        <van-col span="2">
                            <span>--></span>
                        </van-col>
                        <van-col span="11">
                            {{carpooling.arriveTime}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="11">
                            价格: {{carpooling.price}}
                        </van-col>
                        <van-col span="2"/>
                        <van-col span="11">
                            余座: {{carpooling.leftPassengerNo}}
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<style lang="less" scoped>
    .searchForm{
      // 无论页面如何滑动如何处于页面顶部
        width:100%;
        position: sticky;
        top: 2%;
        z-index: 999;
        text-align: center;
        .v-search{
            display: block;
            float: left;
        }
    }
    .carpooling-card-container{
        // 无论加载成什么样都位于searchForm下方
        margin-top: 7%;
        .carpoolingItem {
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
</style>
