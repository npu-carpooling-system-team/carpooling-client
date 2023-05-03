<script setup>
    import {onMounted, ref} from 'vue'
    import {closeToast, showLoadingToast, showNotify} from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    import axios from '@/api/index'
    import {useUserStore} from '@/stores'
    import {storeToRefs} from "pinia";

    const active = ref(0)
    
    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const getUserBasic = async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在加载您的个人信息',
        })
        try{
            const {data} = await axios.get('/api/user/info')
            if (data.code === 2000){
                userStore.$patch((state) => {
                    state.currentUser = data.result.result
                })
            } else {
                showNotify({ type: 'danger', message: `首页初始化失败,${data.msg},请刷新页面重试` });
            }
        } catch (e) {
            showNotify({type: 'danger', message: `首页初始化失败,${e.message}`})
        } finally {
            closeToast()
        }
    }
    
    onMounted(async () => {
        await getUserBasic()
    })
</script>

<template>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="shop-o">拼车大厅</van-tabbar-item>
        <van-tabbar-item v-if="currentUser.user.isDeleted === 0" icon="logistics">我要拼车</van-tabbar-item>
        <van-tabbar-item v-if="currentUser.driver.isDeleted === 0" icon="records">我有空车</van-tabbar-item>
        <van-tabbar-item icon="user-o">我</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>
</style>
