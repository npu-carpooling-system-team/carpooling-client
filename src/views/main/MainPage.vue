<script setup>
    import NavBar from '@/components/NavBar.vue'
    import {useRouter} from 'vue-router'
    import {onMounted, ref, watch} from 'vue'

    const showNav = ref(false)
    
    // 监听当前页面路径 只有在各模块主页上才展示导航条
    const router = useRouter()
    
    const homeList = [
        '/main/carpooling',
        '/main/passenger/passenger-home',
        '/main/driver/driver-home',
        '/main/my/my-home'
    ]
    
    watch(() => router.currentRoute.value.path, (path) => {
        showNav.value = homeList.indexOf(path) !== -1
    })
    
    onMounted(() => {
        if (homeList.indexOf(router.currentRoute.value.path) !== -1) {
            showNav.value = true
        }
    })
</script>

<template>
    <router-view/>
    <NavBar v-if="showNav"/>
</template>

<style lang="less" scoped>
</style>
