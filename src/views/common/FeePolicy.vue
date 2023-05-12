<script setup>
    import {useRouter} from 'vue-router'

    const router = useRouter()
</script>

<template>
    <div class="privacy-box">
        <h3 style="color: #5CA0FF">我们的服务费率政策</h3>
        <van-list>
            <van-cell center>
                1. 平台为您提供信息存储与检索以及收款等服务,因此平台将收取40%的服务费。
            </van-cell>
        </van-list>
        <van-button plain block type="primary" @click="router.go(-1)">
            返回上一页
        </van-button>
    </div>
</template>

<style lang="less" scoped>
  .privacy-box{
    margin-top: 5%;
    text-align: center;
    align-items: center;
    .van-button{
      width: 40%;
      // 永远处于底部
      position: fixed;
      bottom: 5%;
      // 左右居中
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
