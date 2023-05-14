<script setup>
    import {useRouter} from 'vue-router'
    import {onMounted, ref} from 'vue'
    import {handleGetChat, handleSendChat} from '@/api/my'
    import {showNotify} from "vant";
    import {useUserStore} from '@/stores'
    import {storeToRefs} from 'pinia'
    
    const router = useRouter()
    let toUserId
    
    const chatDetail = ref({})
    
    const navTitle = ref('加载中...')

    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)
    
    const inputMessage = ref('')

    const getChat = async () => {
        const data = await handleGetChat()
        if (data.code === 2000) {
            // 处理
            chatDetail.value = data.result.list.find(
                item => item.toUserVo.id === toUserId
            )
            navTitle.value = chatDetail.value.toUserVo.username
        } else {
            showNotify({
                type: 'danger',
                message: `获取聊天详情失败,${data.msg}`
            })
        }
    }
    
    const sendChat = async () => {
        // 组织参数
        const messageDto = {
            toUserId: toUserId,
            message: inputMessage.value
        }
        const data = await handleSendChat(messageDto)
        if (data.code === 2000) {
            // 清空已有留言
            inputMessage.value = ''
            // 刷新
            await getChat()
        } else {
            showNotify({
                type: 'danger',
                message: `发送失败,${data.msg}`
            })
        }
    }

    //滚动条距离顶部的距离
    let verbTop
    
    onMounted(async () => {
        verbTop = 0
        toUserId = router.currentRoute.value.query.toUserId
        await getChat();
    })

    const showInput = ref(true)
    
    window.onscroll = function () {
        if (document.documentElement.scrollTop < 5){
            verbTop = 0
        }
        if (document.documentElement.scrollTop - verbTop > 30 && showInput.value) {
            showInput.value = false
            // 更新滚动条高度
            verbTop = document.documentElement.scrollTop
        } else if (verbTop - document.documentElement.scrollTop > 5 && !showInput.value) {
            showInput.value = true
            verbTop = document.documentElement.scrollTop
        }
    }
</script>

<template>
    <van-nav-bar
        :title="navTitle"
        left-text="返回"
        left-arrow
        @click-left="router.go(-1)"
    />
    <van-list
        :finished="true"
        finished-text="没有更多聊天了"
    >
        <van-cell-group style="margin-top:2%" v-for="chat in chatDetail.chats" :key="chat" inset>
            <van-cell class="chatItem">
                <van-row>
                    <!-- 用户头像 -->
                    <van-col span="8" class="avatar-col">
                        <van-image
                            round
                            width="3rem"
                            height="3rem"
                            :src="chat.fromUserId === toUserId ? chatDetail.toUserVo.avatar
                            : currentUser.user.userImage"
                        >
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20" />
                            </template>
                        </van-image>
                        <div>
                            <strong>
                                {{chat.fromUserId === chatDetail.toUserVo.id ?
                                chatDetail.toUserVo.username : '您'}}
                            </strong>
                        </div>
                    </van-col>
                    <!-- 聊天详情 -->
                    <van-col span="16" class="chat-col">
                        <div>
                            <div class="message-div">
                                {{chat.message}}
                            </div>
                            <div>
                                {{chat.sendTime}}
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </van-list>
    
    <van-cell-group class="chat-input" inset v-if="showInput">
        <van-field
            center
            label="您的留言"
            label-align="center"
            rows="1"
            v-model="inputMessage"
        >
            <template #button>
                <van-button
                    size="small"
                    type="primary"
                    icon="guide-o"
                    @click="sendChat"
                >
                </van-button>
            </template>
        </van-field>
    </van-cell-group>
</template>

<style lang="less" scoped>
  .van-list{
    text-align:center;
    .chatItem{
      .van-cell__value {
        min-width:80%;
        .avatar-col{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .chat-col{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: right;
          .message-div{
            color: black;
          }
        }
      }
    }
  }
  .chat-input {
    position: fixed;
    bottom: 1%;
    /* other styles */
  }
</style>
