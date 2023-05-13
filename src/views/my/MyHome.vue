<script setup>
    import {useRouter} from 'vue-router'
    import Cookies from 'js-cookie'
    import 'vant/es/toast/style'
    import {useUserStore} from "@/stores";
    import {storeToRefs} from "pinia";
    import {handleCheckHasNewChat, handleLogoutReq} from '@/api/my'
    import {onMounted, ref} from 'vue'
    import {showNotify} from "vant";

    const router = useRouter()

    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const handleLogout = async () => {
        await handleLogoutReq()
        // 清除token信息
        Cookies.remove('token')
        // 跳转到登录页面
        await router.push('/login')
    }
    
    const hasNewChat = ref(false)
    
    const checkHasNewChat = async () => {
        const data = await handleCheckHasNewChat()
        if (data.code === 2000) {
            const chatList = data.result.list
            for (const chat of chatList) {
                if (chat.hasNewMessage){
                    hasNewChat.value = true
                    break
                }
            }
        } else {
            showNotify({
                type: 'danger',
                message: `获取聊天列表失败,${data.msg}`
            })
        }
    }
    
    onMounted(() => {
        checkHasNewChat()
    })
</script>

<template>
    <van-cell-group inset>
        <van-row class="personCard">
            <van-col span="8">
                <van-image
                    class="avatar-container"
                    round
                    width="6rem"
                    height="6rem"
                    :src="currentUser.user.userImage"
                />
            </van-col>
            <van-col span="16">
                <h2>{{ currentUser.user.username }}</h2>
                <h4>欢迎您使用西工大拼车平台</h4>
            </van-col>
        </van-row>
    </van-cell-group>
    <van-cell-group inset>
        <van-list>
            <van-cell :key="1" :title="'我的聊天'" @click="router.push('/main/my/my-chats')" >
                <a v-if="hasNewChat">
                    您有新的消息,请查看
                </a>
            </van-cell>
            <van-cell :key="2" :title="'个人信息维护'" @click="router.push('/main/my/revise-info')" />
            <van-cell :key="3" :title="'支付宝与解绑'" @click="router.push('/main/my/handle-alipay')" />
            <van-cell :key="4" :title="'退出登录'" @click="handleLogout"/>
        </van-list>
    </van-cell-group>
</template>

<style lang="less" scoped>
    .van-cell-group{
        margin-top: 5%;
    }
    .personCard{
        height: 100%;
        // 纵向居中 使用auto
        display: flex;
        align-items: center;
        .avatar-container{
            margin-left: 5px;
        }
    }
</style>
