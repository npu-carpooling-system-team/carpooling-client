<script setup>
    import {useRouter} from 'vue-router'
    import {onMounted} from 'vue'
    import {showNotify} from 'vant'
    import 'vant/es/notify/style'

    const router = useRouter()

    onMounted(async () => {
        showNotify({
            type: 'danger',
            message: '由于支付宝服务器原因绑定失败,请稍后重试'
        })
        setTimeout(async () => {
            await router.push('/main/home')
        }, 3000)
    })
</script>

<template>
    <div class="welcome-banner">
        <h1>正在处理绑定信息</h1>
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
