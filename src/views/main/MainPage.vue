<script setup>
    import NavBar from '@/components/NavBar.vue'
    import {useRouter} from 'vue-router'
    import {ref, watch} from 'vue'

    const showNav = ref(true)
    
    // 监听当前页面路径 只有在各模块主页上才展示导航条
    const router = useRouter()
    
    const homeList = [
        '/main/carpooling',
        '/main/passenger',
        '/main/passenger/passenger-home',
        '/main/driver',
        '/main/driver/driver-home',
        '/main/my',
        '/main/my/my-home'
    ]
    
    watch(() => router.currentRoute.value.path, (path) => {
        showNav.value = homeList.includes(path)
    })
</script>

<template>
    <router-view/>
    <NavBar v-if="showNav"/>
</template>

<style lang="less" scoped>
</style>
