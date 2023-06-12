<script setup>
    import { onMounted } from 'vue'
    import { showNotify } from 'vant'
    import { useRouter } from 'vue-router'
    import { handlePutPaymentStatus } from "@/api/passenger";
    
    const router = useRouter()
    
    // 获取url中的out_trade_no
    const orderId = router.currentRoute.value.query.out_trade_no
    
    onMounted(async () => {
        showNotify({
            type: 'success',
            message: '收到支付,正在更新订单状态'
        })
        try {
            await handlePutPaymentStatus(orderId)
        } finally {
            window.location.href = '#/main/carpooling/passenger-order'
        }
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
