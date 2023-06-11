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

    const carpoolingHomeList = [
        '/main/carpooling/home',
        '/main/carpooling/passenger-order',
        '/main/carpooling/driver-carpooling'
    ]

    onMounted(async () => {
        if (router.currentRoute.value.path === '/main/carpooling/home') {
            if (currentUser.value.user.isPassenger) {
                window.location.href = '#/main/carpooling/passenger-order'
            } else {
                window.location.href = '#/main/carpooling/driver-carpooling'
            }
        }
    })
    
    const showVanTabs = ref(true)
    
	watch(() => router.currentRoute.value.path, async (path) => {
		showVanTabs.value = carpoolingHomeList.indexOf(path) !== -1
        if (router.currentRoute.value.path === '/main/carpooling/home') {
            if (currentUser.value.user.isPassenger) {
                window.location.href = '#/main/carpooling/passenger-order'
            } else {
                window.location.href = '#/main/carpooling/driver-carpooling'
            }
        }
	})
</script>

<template>
    <div>
        <van-tabs id="van-tab" @click-tab="routerPush" sticky v-if="showVanTabs">
            <van-tab
                title="乘客-订单" v-if="currentUser.user.isPassenger"
                name="order"/>
            <van-tab title="司机-行程" v-if="currentUser.user.isDriver" name="carpooling" />
        </van-tabs>
        <router-view/>
    </div>
</template>

<style scoped>
</style>
