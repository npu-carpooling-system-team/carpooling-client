<script setup>
    import {useRouter} from 'vue-router'
    import {showLoadingToast} from 'vant'
    import Cookies from 'js-cookie'
    import 'vant/es/toast/style'
    import axios from '../../api/index'

    const router = useRouter()
    
    const handleLogout = async () => {
        // 开始退出
        showLoadingToast({
            duration: 3,
            forbidClick: true,
            message: '正在退出登录'
        })
        try {
            clearSession()
            await axios.post('/api/auth/loginuser/logout')
        } catch (e) {
            // 不用管异常
        }
        // 清除token信息
        Cookies.remove('token')
        // 跳转到登录页面
        await router.push('/login')
    }
    
    const clearSession = () => {
        window.sessionStorage.removeItem('carpoolingCache')
        window.sessionStorage.removeItem('currentUser')
    }
</script>

<template>
    <h3>使用van-row做的用户信息card</h3>
    <h2>用户信息在pinia里</h2>
    <van-list>
        <van-cell :key="1" :title="'我的聊天'" @click="router.push('/main/my/my-chats')" />
        <van-cell :key="2" :title="'个人信息维护'" @click="router.push('/main/my/revise-info')" />
        <van-cell :key="3" :title="'支付宝与解绑'" @click="router.push('/main/my/handle-alipay')" />
        <van-cell :key="4" :title="'退出登录'" @click="handleLogout"/>
    </van-list>
</template>

<style lang="less" scoped>
</style>
