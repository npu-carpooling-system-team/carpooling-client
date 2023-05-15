<script setup>
    import {useUserStore} from '@/stores'
    import {storeToRefs} from 'pinia'

    const userStore = useUserStore()
    // 直接从中提取currentUser是非响应式的 所以需要使用storeToRefs
    const {currentUser} = storeToRefs(userStore)
</script>

<template>
    <van-tabs>
        <van-tab title="乘客-订单" v-if="currentUser.user.isPassenger" name="order" />
        <van-tab title="司机-行程" v-if="currentUser.user.isDriver" name="carpooling" />
    </van-tabs>
    <h1>我的行程</h1>
    <h2>展示司机的所有行程列表</h2>
    <h2>或者展示乘客的所有订单列表</h2>
</template>

<style scoped>
</style>
