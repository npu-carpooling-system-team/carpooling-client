<script setup>
    import {ref, watch} from 'vue'
    import {validatorCode, validatorPhone, validatorRegisterCode} from "@/utils/validatorUtil";
    import {closeToast, showLoadingToast, showNotify} from "vant";
    import axios from "@/api";
    
    const registerDto = ref({
        username: '',
        password: '',
        email: '',
        isDriver: false,
        isPassenger: false,
        driversPersonalId: '',
        driversName: '',
        driversLicenseNo: '',
        driversLicenseType: '',
        driversPlateNo: '',
        driversVehicleType: '',
        driversExpireDate: ''
    })
    
    const sendSmsEnabled = ref(true)
    
    const confirmSmsDto = ref({
        phone: '',
        code: ''
    })

    const loadingText = ref('')

    const sendSms = async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求验证码发送中',
        })
        const sendSmsDto = {
            'phone' : registerDto.value.username
        }
        try {
            const {data} = await axios.post('/api/auth/sendsms', sendSmsDto)
            if (data.code !== null && data.code === 2000){
                showNotify({ type: 'success', message: '验证码已发送' });
                //在loadingText中展示60秒倒数
                loadingText.value = '300s'
                sendSmsEnabled.value = false
                let time = 300
                const timer = setInterval(() => {
                    time--
                    loadingText.value = time + 's'
                    if(time === 0) {
                        clearInterval(timer)
                        sendSmsEnabled.value = true
                    }
                }, 1000)
            } else {
                showNotify({ type: 'danger', message: `验证码发送失败,${data.msg},请重试` });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }
    
    const role = ref([])
    
    const showExtraForm = ref(false)
    
    // 监听role的值 如果role数组中包含了isDriver则增加额外的表单
    watch(role, (newValue) => {
        showExtraForm.value = !!newValue.includes('isDriver');
    })
</script>

<template>
    <div class="register-form">
        <h3 class="title">西工大拼车平台——注册</h3>
        <van-form @submit="onSubmit">
            <van-cell-group inset style="padding: 1%;">
                <van-field
                    v-model="registerDto.username"
                    name="手机号"
                    label="手机号"
                    placeholder="请输入手机号"
                    type="tel"
                    clearable
                    :rules="[{ validator: validatorPhone, message: '请输入正确的手机号码' }]"
                />
                <van-field
                    v-model="confirmSmsDto.code"
                    center
                    clearable
                    type="digit"
                    label="短信验证码"
                    placeholder="请输入验证码"
                    :rules="[{ validator: validatorCode, message: '应为4位数字' }]"
                >
                    <template #button>
                        <van-button
                            v-if="sendSmsEnabled"
                            size="small"
                            type="primary"
                            @click="sendSms()">
                            发送验证码
                        </van-button>
                        <van-button
                            v-else-if="!sendSmsEnabled"
                            size="small"
                            type="primary"
                            disabled
                            loading
                            :loading-text="loadingText">
                        </van-button>
                    </template>
                </van-field>
                <van-button plain block type="primary"
                    size="small" style="width: 40%; margin: 1% auto">验证手机号码</van-button>
                <van-field
                    v-model="registerDto.email"
                    center
                    clearable
                    label="邮箱"
                    placeholder="请输入邮箱(非强制)"
                />
                <van-field
                    v-model="confirmSmsDto.code"
                    center
                    clearable
                    type="digit"
                    label="邮箱验证码"
                    placeholder="请输入验证码"
                    :rules="[{ required: false, validator: validatorRegisterCode, message: '应为4位数字' }]"
                >
                    <template #button>
                        <van-button
                            v-if="sendSmsEnabled"
                            size="small"
                            type="primary"
                            @click="sendSms()">
                            发送验证码
                        </van-button>
                        <van-button
                            v-else-if="!sendSmsEnabled"
                            size="small"
                            type="primary"
                            disabled
                            loading
                            :loading-text="loadingText">
                        </van-button>
                    </template>
                </van-field>
                <van-button plain block type="primary"
                    size="small" style="width: 40%; margin: 1% auto">验证邮箱</van-button>
                <h5>用户角色选择(可多选)</h5>
                <van-checkbox-group v-model="role" direction="horizontal" class="checkbox-area">
                    <van-checkbox name="isPassenger">我希望拼车-乘客</van-checkbox>
                    <van-checkbox name="isDriver">我可以搭人-司机</van-checkbox>
                </van-checkbox-group>
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversPersonalId"
                    center
                    clearable
                    label="身份证号"
                    placeholder="请输入您的身份证号"
                />
            </van-cell-group>

            <div class="submit-login-btn">
                <van-button plain block type="primary" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style scoped>
    .register-form{
        width: 100%;
        height: 100%;
        text-align: center;
        .checkbox-area{
            display: flex;
            justify-content: space-around;
        }
        .submit-login-btn{
            width: 40%;
            margin: 5% auto 1%;
        }
    }
</style>
