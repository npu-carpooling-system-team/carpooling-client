<script setup>
    import { onMounted } from 'vue'
    import { showNotify } from 'vant'
    
    onMounted(async () => {
        showNotify({
            type: 'danger',
            message: '您中途退出了支付,请等待后端服务器刷新您的支付状态后重试'
        })
        setTimeout(async () => {
            window.location.href = '#/main/carpooling/passenger-order'
        }, 3000)
    })
</script>

<template>
    <div class="welcome-banner">
        <h1>正在处理支付信息</h1>
    </div>
</template>

<style scoped lang="less">
    .welcome-banner {
        // 上下左右居中
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
