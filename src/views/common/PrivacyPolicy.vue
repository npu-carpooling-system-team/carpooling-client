<script setup>
    import {useRouter} from 'vue-router'

    const router = useRouter()
</script>

<template>
    <div class="privacy-box">
        <h3 style="color: #5CA0FF">我们的隐私政策</h3>
        <van-list>
            <van-cell>
                <van-row>
                    <div>
                        1. 您的证照将在您的浏览器与平台后端服务器之间传输。
                        平台仅保存必须的身份信息以保证您的交易安全，不会直接保存证照图片。
                    </div>
                </van-row>
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
        .van-cell{
            .van-cell__value{
                min-width:80%;
                .van-row{
                    text-align: center;
                }
            }
        }
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
