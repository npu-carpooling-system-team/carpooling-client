<script setup>
    import {showFailToast} from 'vant'
    import 'vant/es/toast/style'
    import {onMounted} from 'vue'

    import {useRouter} from 'vue-router'

    const router = useRouter()

    onMounted(async () => {
        showFailToast('您似乎来到了不存在车辆的荒原,三秒后跳转到上一页面')
        setInterval(async () => {
            await router.go(-1)
        }, 3000)
    })
</script>

<template>
    <div></div>
</template>

