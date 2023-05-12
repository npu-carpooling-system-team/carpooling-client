<script setup>
    import {useRouter} from 'vue-router'
    import {onMounted} from 'vue'
    import Cookies from 'js-cookie'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'

    const router = useRouter()
    
    onMounted(() => {
        // 从当前页面URL参数中解析出token
        const token = router.currentRoute.value.query.token
        if(token === undefined){
            showNotify({
                type: 'danger',
                message: '登录失败,3s后跳转回登录页面',
                duration: 3000
            })
            setTimeout(() => {
                router.push('/login')
            }, 3000)
        } else {
            // 设置Cookies
            Cookies.set('token', token)
            // 展示正确登录的提醒
            showNotify({
                type: 'success',
                message: '登录成功,3s后执行跳转',
                duration: 3000
            })
            setTimeout(() => {
                router.push('/main/home')
            }, 3000)
        }
    })
</script>

<template>
    <div class="welcome-banner">
        <h1>正在处理登录信息</h1>
    </div>
</template>

<style lang="less" scoped>
    .welcome-banner{
        // 上下左右居中
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
