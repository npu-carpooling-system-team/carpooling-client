<script setup>
    import {onMounted, ref} from 'vue'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'
    import {useNavStore, useUserStore} from '@/stores'
    import {storeToRefs} from 'pinia'
    import {handleGetPersonalInfo} from '@/api/common'
    import {useRouter} from 'vue-router'

    const router = useRouter()
    const active = ref('carpooling')

    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const navStore = useNavStore()
    const {nav} = storeToRefs(navStore)

    const getUserBasic = async () => {
        const data = await handleGetPersonalInfo()
        if (data !== null && data.code === 2000) {
            userStore.$patch((state) => {
                state.currentUser = data.result.result
            })
        } else if (data !== null) {
            showNotify({type: 'danger', message: `首页初始化失败,${data.msg},请刷新页面重试`});
        } else {
            showNotify({type: 'danger', message: `首页初始化失败,请刷新页面重试`});
        }
    }
    
    const saveNavState = (navName,to) => {
        navStore.$patch((state) => {
            state.nav.currentNav = navName
            state.nav.to = to
        })
    }
    
    const isDriver = ref(false)
    const isPassenger = ref(false)

    onMounted(async () => {
        if (currentUser.value.user.isDeleted === 1 && currentUser.value.driver.isDeleted === 1) {
            // 首次登入 pinia为空 加载用户信息
            await getUserBasic()
        }
        isDriver.value = currentUser.value.user.isDriver
        isPassenger.value = currentUser.value.user.isPassenger
        // 从pinia读取当前active
        active.value = nav.value.currentNav
        await router.push(nav.value.to)
    })
</script>

<template>
    <van-tabbar v-model="active">
        <van-tabbar-item
            name="passenger" v-if="isPassenger"
            icon="shop-o" to="/main/passenger"
            @click="saveNavState('passenger', '/main/passenger')"
        >
            我要拼车
        </van-tabbar-item>
        <van-tabbar-item
            name="driver" v-if="isDriver"
            icon="logistics" to="/main/driver"
            @click="saveNavState('driver', '/main/driver')"
        >
            我要发车
        </van-tabbar-item>
        <van-tabbar-item
            name="carpooling" icon="todo-list-o"
            to="/main/carpooling/home"
            @click="saveNavState('carpooling', '/main/carpooling')"
        >
            我的行程
        </van-tabbar-item>
        <van-tabbar-item
            name="my" icon="user-o"
            to="/main/my"
            @click="saveNavState('my', '/main/my')"
        >
            我的
        </van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>
</style>
