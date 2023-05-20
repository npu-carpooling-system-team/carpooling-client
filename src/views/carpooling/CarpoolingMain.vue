<script setup>
	import {useUserStore} from '@/stores'
	import {storeToRefs} from 'pinia'
    import {useRouter} from 'vue-router'
	import {onMounted, ref, watch} from 'vue'
    
    const router = useRouter()
	const userStore = useUserStore()
	// 直接从中提取currentUser是非响应式的 所以需要使用storeToRefs
	const {currentUser} = storeToRefs(userStore)
    
    const routerPush = async ({title}) => {
		if (title === '乘客-订单') {
			await router.push('/main/carpooling/passenger-order')
        } else {
			await router.push('/main/carpooling/driver-carpooling')
        }
    }
	
	onMounted(async () => {
		await routerPush(currentUser.value.user.isPassenger ?
            {title: '乘客-订单'} : {title: '司机-行程'})
    })

    const carpoolingHomeList = [
		'/main/carpooling',
        '/main/carpooling/passenger-order',
        '/main/carpooling/driver-carpooling'
    ]
    
    const showVanTabs = ref(true)
    
	watch(() => router.currentRoute.value.path, (path) => {
		// 修正跳转到其他页面后转回的操作执行两次之后verbTop定位错误的问题
		showVanTabs.value = carpoolingHomeList.indexOf(path) !== -1
	})
 
</script>

<template>
    <van-tabs @click-tab="routerPush" sticky v-if="showVanTabs">
        <van-tab
            title="乘客-订单" v-if="currentUser.user.isPassenger"
            name="order"/>
        <van-tab title="司机-行程" v-if="currentUser.user.isDriver" name="carpooling" />
    </van-tabs>
    <router-view/>
</template>

<style scoped>
</style>
