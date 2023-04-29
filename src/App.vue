<script setup>
import {useDark} from '@vueuse/core'
const isDark = useDark()
</script>

<template>
    <van-config-provider class="config-provider" :theme="isDark ? 'dark' : 'light'" >
        <router-view/>
    </van-config-provider>
</template>

<style scoped>
    .config-provider{
        width: 100%;
        height: 100%;
    }
</style>
