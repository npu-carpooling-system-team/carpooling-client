<script setup>
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'
    import axios from '../../api/index.js'
    import {encrypt} from '@/utils/jsencrypt'
    import Cookies from 'js-cookie'
    import {showLoadingToast, closeToast, showNotify} from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    import {validatorCode, validatorPassword, validatorPhone} from "@/utils/validatorUtil";

    const router = useRouter()
    
    const loginDto = ref({
        username: '',
        password: '',
        code:''
    })
    
    // 登录模式切换
    const isUsernamePasswordLogin = ref(true)
    
    // 开始登录流程
    const preCheckFailed = () => {
        showNotify({ type: 'danger', message: '表单校验未通过,请检查输入' })
        // 重新设置form-box的高度到50%
        const formBox = document.getElementById('form-box')
        formBox.style.height = '50%'
    }
    
    const usernamePasswordLogin = async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '登录中',
        });
        const passwordLoginDto = {
            'username' : loginDto.value.username,
            'password' : encrypt(loginDto.value.password)
        }
        try {
            const resp = await axios.post('/api/auth/login/password', passwordLoginDto)
            if (resp.data.code !== null && resp.data.code === 2000){
                Cookies.set('token', resp.data.result.token)
                await router.push('/main')
            } else {
                showNotify({ type: 'danger', message: '用户名密码登录未通过,请检查输入' });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }
    
    const sendSmsEnabled = ref(true)
    
    const loadingText = ref('')
    
    const sendSms = async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求验证码发送中',
        })
        const sendSmsDto = {
            'phone' : loginDto.value.username
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
    
    const usernameCodeLogin = async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '登录中',
        });
        const codeLoginDto = {
            'phone' : loginDto.value.username,
            'code' : loginDto.value.code
        }
        try {
            const resp = await axios.post('/api/auth/login/phone', codeLoginDto)
            if (resp.data.code !== null && resp.data.code === 2000){
                Cookies.set('token', resp.data.result.token)
                await router.push('/main')
            } else {
                showNotify({ type: 'danger', message: '用户名短信登录未通过,请检查输入' });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }
    
    const jumpToAlipay = () => {
        window.location.replace(`https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?` +
            `app_id=${import.meta.env.VITE_ALIPAY_SANDBOX_APP_ID}` +
            `scope=${import.meta.env.VITE_ALIPAY_SANDBOX_LOGIN_SCOPE}` +
            `redirect_uri=${import.meta.env.VITE_ALIPAY_SANDBOX_LOGIN_REDIRECT_URI}`
        )
    }
    
    const jumpToRegister = async () => {
        await router.push('/register')
    }
</script>

<template>
    <!--show notify不生效 使用HTML引入-->
    <div class="login-box">
        <h1 style="margin-top: 10%">西工大拼车平台</h1>
        <div class="icon-box">
            <van-image
                round
                width="80%"
                height="80%"
                src="/carpooling.svg"
            />
        </div>
        <div class="form-box" id="form-box">
            <div style="height: 5%"></div>
            <!--一定要加括号表示引用方法 IDEA不报错但编译器在vant要出问题-->
            <van-form
                @submit="isUsernamePasswordLogin ? usernamePasswordLogin() : usernameCodeLogin()"
                @failed="preCheckFailed"
            >
                <van-button
                    class="login-type-choose-btn"
                    style="margin-top: 0" plain block type="warning"
                    @click="isUsernamePasswordLogin = !isUsernamePasswordLogin"
                >
                    {{isUsernamePasswordLogin ? '切换到验证码登录' : '切换到用户名密码登录'}}
                </van-button>
                
                <van-cell-group style="margin-top: 5%" inset>
                    <van-field
                        v-model="loginDto.username"
                        name="手机号"
                        label="手机号"
                        placeholder="请输入手机号"
                        type="tel"
                        :rules="[{ validator: validatorPhone, message: '请输入正确的手机号码' }]"
                    />
                </van-cell-group>
                <van-cell-group inset style="margin-top: 5%" v-if="isUsernamePasswordLogin">
                    <van-field
                        v-model="loginDto.password"
                        name="密码"
                        label="密码"
                        type="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        :rules="[{ validator: validatorPassword, message: '应为4-16位数字/字母/下划线' }]"
                    />
                </van-cell-group>

                <van-cell-group style="margin-top: 5%" inset v-else>
                    <van-field
                        v-model="loginDto.code"
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
                </van-cell-group>

                <div class="submit-login-btn">
                    <van-button plain block type="primary" native-type="submit">
                        登录
                    </van-button>
                    <van-button plain block type="success" @click="jumpToRegister()">
                        新账号注册
                    </van-button>
                </div>
            </van-form>

            <img
                @click="jumpToAlipay()"
                class="alipay-icon" src="../../assets/imgs/alipayLogo.png" alt="支付宝登录"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
    .login-box{
        background: url("../../assets/imgs/bg1.webp") no-repeat fixed center;
        background-size: auto ,100%;
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        .icon-box{
            // 毛玻璃
            background: rgba(255, 255, 255, 0.2);
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            // 居中
            margin-left: auto;
            margin-right: auto;
            margin-top:10%;
            // 一个正圆
            border-radius: 50%;
            position: relative;
            width: 30%;
            height: 0;
            padding-bottom: 30%;
            border: 1px solid rgba(128, 125, 125, 0.93);
            box-shadow: 0 0 10px #dddd;
            .van-image{
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
              width: 100%;
              height: 100%;
            }
        }
        .form-box{
            width: 90%;
            height: 40%;
            margin-top: 10%;
            margin-left: auto;
            margin-right: auto;
            background: rgba(255, 255, 255, 0.2);
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
            border-radius: 3%;
            align-items: center;
            .login-type-choose-btn{
                width: 60%;
                // 居中
                margin-left: auto;
                margin-right: auto;
                margin-top: 10%;
                border-radius: 10px;
            }
            .submit-login-btn{
                margin-top: 5%;
                display: flex;
                justify-content: space-around;
                .van-button{
                    width: 40%;
                    border-radius: 10px;
                }
            }
            .alipay-icon{
                margin-top: 10%;
                width: 50px;
                height: 50px;
            }
        }
    }
</style>
