<script setup>
    import { useDark } from '@vueuse/core'
    import { onMounted, watch } from 'vue'
    
    const isDark = useDark()
    
    // 监听isDark 如果切换到暗黑模式 则config-provider的background-color为black
    watch(isDark, (val) => {
        // 不加这一句log这个watch要失效 不知道为什么
        console.log(val)
        if (val) {
            document.getElementById('config-provider').style.backgroundColor = 'black'
        } else {
            document.getElementById('config-provider').style.backgroundColor = '#ebedf0'
        }
    })
    
    onMounted(() => {
        console.log(isDark.value)
        if (isDark.value) {
            document.getElementById('config-provider').style.backgroundColor = 'black'
        } else {
            document.getElementById('config-provider').style.backgroundColor = '#ebedf0'
        }
    })
</script>

<template>
    <van-config-provider id="config-provider" class="config-provider" :theme="isDark ? 'dark' : 'light'">
        <router-view/>
    </van-config-provider>
</template>

<style lang="less" scoped>
    .config-provider {
        width: 100%;
        height: 100%;
    }
</style>
