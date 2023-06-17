<script setup>
    import { useRouter } from 'vue-router'
    import { onMounted, ref } from 'vue'
    import { handleGetChat } from '@/api/my'
    import { showNotify } from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    
    const router = useRouter()
    
    const chatList = ref([])
    
    onMounted(async () => {
        const data = await handleGetChat()
        if (data.code === 2000) {
            chatList.value = data.result.list
        } else {
            showNotify({
                type: 'danger',
                message: `获取聊天列表失败,${data.msg}`
            })
        }
    })
    
    const showChatDetails = async (item) => {
        await router.push(`/main/my/my-chats/detail?toUserId=${item.toUserVo.id}`)
    }
</script>

<template>
    <van-nav-bar
        title="我的聊天"
        left-text="返回"
        left-arrow
        @click-left="router.go(-1)"
    />
    <van-list
        :finished="true"
        finished-text="没有更多聊天了"
    >
        <van-cell-group inset style="margin-top:2%" v-for="item in chatList" :key="item">
            <van-cell class="chatPreview">
                <van-row @click="showChatDetails(item)">
                    <!-- 用户头像 -->
                    <van-col span="8">
                        <van-image
                            class="avatar-container"
                            round
                            width="4.5rem"
                            height="4.5rem"
                            :src="item.toUserVo.avatar"
                            fit="cover"
                        >
                            <template v-slot:loading>
                                <van-loading type="spinner" size="20"/>
                            </template>
                        </van-image>
                    </van-col>
                    <!-- 聊天详情 -->
                    <van-col span="14">
                        <van-row style="height:2rem;">
                            <van-col span="24" style="font-size: 1.5rem;">
                                <strong>{{ item.toUserVo.username }}</strong>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24">
                                <div>
                                    {{ item.chats[item.chats.length - 1].message }}
                                    <br/>
                                    {{ item.chats[item.chats.length - 1].sendTime }}
                                </div>
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="2">
                        <van-icon name="arrow"/>
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </van-list>
</template>

<style lang="less" scoped>
    .van-list {
        text-align: center;
        
        .chatPreview {
            .van-cell__value {
                min-width: 80%;
                
                .van-row {
                    text-align: center;
                }
                
                .avatar-container {
                    margin-left: 5px;
                }
            }
        }
        
        .van-icon {
            display: flex;
            height: 100%;
            align-items: center;
        }
    }
</style>
