<script setup>
    import {onMounted, ref} from 'vue'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'
    import {useUserStore} from '../stores'
    import {storeToRefs} from "pinia";
    import {getPersonalInfo} from '../api/common'

    const active = ref(0)
    
    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const getUserBasic = async () => {
        const data = await getPersonalInfo()
        if (data.code === 2000){
            userStore.$patch((state) => {
                state.currentUser = data.result.result
            })
        } else {
            showNotify({ type: 'danger', message: `首页初始化失败,${data.msg},请刷新页面重试` });
        }
    }
    
    onMounted(async () => {
        await getUserBasic()
    })
</script>

<template>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="todo-list-o" to="/main/carpooling">我的行程</van-tabbar-item>
        <van-tabbar-item v-if="currentUser.user.isDeleted === 0" icon="shop-o" to="/main/passenger">
            我是乘客
        </van-tabbar-item>
        <van-tabbar-item v-if="currentUser.user.isDeleted === 0" icon="logistics" to="/main/driver">
            我是司机
        </van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/main/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>
</style>
