<script setup>
	import {useUserStore} from '@/stores'
	import {storeToRefs} from 'pinia'
    import {useRouter} from 'vue-router'
	import {onMounted} from 'vue'
	import {closeToast, showLoadingToast} from 'vant'
	import 'vant/es/toast/style'
	import 'vant/es/notify/style'
    
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
		showLoadingToast({
            message: '加载行程中...',
            forbidClick: true,
            duration: 0
        })
		try {
			if (currentUser.value.user.isPassenger) {
				window.location.href = '#/main/carpooling/passenger-order'
			} else {
				window.location.href = '#/main/carpooling/driver-carpooling'
			}
        } finally {
            closeToast()
		}
		
    })
</script>

<template>
    <van-tabs @click-tab="routerPush" sticky>
        <van-tab
            title="乘客-订单" v-if="currentUser.user.isPassenger"
            name="order"/>
        <van-tab title="司机-行程" v-if="currentUser.user.isDriver" name="carpooling" />
    </van-tabs>
    <router-view/>
</template>

<style scoped>
</style>
