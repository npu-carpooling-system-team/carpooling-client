<script setup>
    import NavBar from '@/components/NavBar.vue'
    import {onBeforeRouteUpdate, useRouter} from 'vue-router'
    import {onMounted, ref, watch} from 'vue'

    const showNav = ref(false)
    
    // 监听当前页面路径 只有在各模块主页上才展示导航条
    const router = useRouter()
    
    const homeList = [
        '/main/carpooling',
        '/main/passenger/passenger-home',
        '/main/driver/driver-home',
        '/main/my/my-home',
        '/main/carpooling/passenger-order',
        '/main/carpooling/driver-carpooling'
    ]

    //滚动条距离顶部的距离
    let verbTop
    
    watch(() => router.currentRoute.value.path, (path) => {
        // 修正跳转到其他页面后转回的操作执行两次之后verbTop定位错误的问题
        verbTop = 0
        showNav.value = homeList.indexOf(path) !== -1
    })

    onBeforeRouteUpdate((to, from, next) => {
        // 如果不是从白名单里面的页面来的话 直接router.go(0)
        // 用了生命周期钩子 因此 基本上是无感的
        if (homeList.indexOf(from.path) === -1) {
            router.go(0)
        } else {
            next()
        }
    })
    
    onMounted(() => {
        if (homeList.indexOf(router.currentRoute.value.path) !== -1) {
            showNav.value = true
        }
        verbTop = 0
    })
    
    // 滚动条滚动事件 隐藏导航条以修正fix属性带来的内容覆盖
    window.onscroll = function () {
        // 只有在有导航条的页面上才允许生效监听
        if (homeList.indexOf(router.currentRoute.value.path) !== -1) {
			if (document.documentElement.scrollTop < 5){
				showNav.value = true
			}
            // 如果下滑距离大于30px则隐藏navbar 如果上划距离大于30px则显示navbar
            if (document.documentElement.scrollTop - verbTop > 10 && showNav.value) {
                showNav.value = false
                // 更新滚动条高度
                verbTop = document.documentElement.scrollTop
            } else if (verbTop - document.documentElement.scrollTop > 10 && !showNav.value) {
                showNav.value = true
                verbTop = document.documentElement.scrollTop
            }
        }
    }
    
</script>

<template>
    <div class="main-page-container">
        <router-view class="main-router-container"/>
        <div class="empty-content"></div>
        <NavBar class="nav-container" v-if="showNav"/>
    </div>
</template>

<style lang="less" scoped>
    .main-page-container{
        width: 100%;
        height: 100%;
    }
</style>
