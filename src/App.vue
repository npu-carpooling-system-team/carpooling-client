<script setup>
import {useDark} from '@vueuse/core'
const isDark = useDark()
</script>

<template>
    <van-config-provider :theme="isDark ? 'dark' : 'light'" >
        <router-view/>
    </van-config-provider>
</template>

<style scoped>
</style>
