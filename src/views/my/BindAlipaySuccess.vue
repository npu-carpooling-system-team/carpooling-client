<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    import Cookies from 'js-cookie'
    import { showNotify } from 'vant'
    import 'vant/es/notify/style'
    import { handleGetPersonalInfo } from '@/api/common'
    import { useUserStore } from '@/stores'
    
    const router = useRouter()
    const userStore = useUserStore()
    
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
    
    onMounted(() => {
        // 从当前页面URL参数中解析出token
        const token = router.currentRoute.value.query.token
        if (token === undefined) {
            showNotify({
                type: 'danger',
                message: '绑定失败,3s后跳转回登录页面',
                duration: 3000
            })
            setTimeout(async () => {
                await router.push('/login')
            }, 3000)
        } else {
            // 设置Cookies
            Cookies.set('token', token)
            // 展示正确登录的提醒
            showNotify({
                type: 'success',
                message: '绑定成功,3s后执行跳转',
                duration: 3000
            })
            setTimeout(async () => {
                await getUserBasic()
                await router.push('/main/my/my-home')
            }, 3000)
        }
    })
</script>

<template>
    <div class="welcome-banner">
        <h1>正在处理绑定信息</h1>
    </div>
</template>

<style lang="less" scoped>
    .welcome-banner {
        // 上下左右居中
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
