<script setup>
    import {ref, watch} from 'vue'
    import {validatorCode, validatorPhone, validatorRegisterCode} from '@/utils/validatorUtil'
    import {closeToast, showLoadingToast, showNotify} from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    import axios from '@/api'
    import {useRouter} from 'vue-router'
    import {scanDrivingLicense, scanIdCard, scanVehicleLicense} from '@/utils/ocrUtil'

    const router = useRouter()
    
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

    const smsLoadingText = ref('')

    const sendSms = async () => {
        if (!validatorPhone(registerDto.value.username)){
            showNotify({ type: 'danger', message: '手机号格式不正确' });
            return
        }
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
                smsLoadingText.value = '300s'
                sendSmsEnabled.value = false
                let time = 300
                const timer = setInterval(() => {
                    time--
                    smsLoadingText.value = time + 's'
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
    
    const checkSmsDisabled = ref(false)
    
    const confirmSms = async() => {
        confirmSmsDto.value.phone = registerDto.value.username
        if (!validatorCode(confirmSmsDto.value.code) ||
            !validatorPhone(confirmSmsDto.value.phone)
        ){
            showNotify({ type: 'danger', message: '格式不正确' });
            return
        }
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求验证码验证中',
        })
        try{
            const {data} = await axios.post("/api/auth/checksms", confirmSmsDto.value)
            if (data.code !== null && data.code === 2000){
                showNotify({ type: 'success', message: '验证码验证成功' });
                // 禁止重复提交
                checkSmsDisabled.value=true
            } else {
                showNotify({ type: 'danger', message: `验证码验证失败,${data.msg},请重试` });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }

    const confirmMailDto = ref({
        mail: '',
        code: ''
    })
    
    const checkMailDisabled = ref(false)
    
    const sendMailEnabled = ref(true)

    const mailLoadingText = ref('')
    
    const sendMail = async () => {
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(registerDto.value.email)){
            showNotify({ type: 'danger', message: '邮箱格式不正确' });
            return
        }
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求验证码发送中',
        })
        const sendMailDto = {
            'email' : registerDto.value.email
        }
        try {
            const {data} = await axios.post('/api/auth/sendmail', sendMailDto)
            if (data.code !== null && data.code === 2000){
                showNotify({ type: 'success', message: '验证码已发送' });
                //在loadingText中展示60秒倒数
                mailLoadingText.value = '300s'
                sendMailEnabled.value = false
                let time = 300
                const timer = setInterval(() => {
                    time--
                    mailLoadingText.value = time + 's'
                    if(time === 0) {
                        clearInterval(timer)
                        sendMailEnabled.value = false
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
    
    const confirmMail = async () => {
        confirmMailDto.value.mail = registerDto.value.email
        if(!validatorCode(confirmMailDto.value.code) ||
            /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(confirmMailDto.value.code)){
            showNotify({ type: 'danger', message: '格式不正确' });
            return
        }
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '请求邮箱验证中',
        })
        try{
            const {data} = await axios.post("/api/auth/checkmail", confirmMailDto.value)
            if (data.code !== null && data.code === 2000){
                showNotify({ type: 'success', message: '邮箱验证成功' });
                // 禁止重复提交
                checkMailDisabled.value=true
            } else {
                showNotify({ type: 'danger', message: `邮箱验证失败,${data.msg},请重试` });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }
    
    const role = ref([])
    
    const showExtraForm = ref(false)
    
    // 进入司机专属部分
    
    // 身份证正反写是因为JSON解析有那么点问题 找不出face和back
    const resolveIdCardFront = async (file) => {
        // 大于10M则禁止识别
        if (file.content.size > 10 * 1024 * 1024) {
            showNotify({ type: 'danger', message: '文件大小不能超过10M' });
            return
        }
        // 开始转圈
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在识别身份证',
        })
        try {
            const {data} = await scanIdCard(file)
            if(data.code === 2000){
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if(resolveResult.data.face !== null) {
                    const face = resolveResult.data.face
                    // 正面
                    if (face.warning.isCopy !== 0 || face.warning.isReshoot !== 0){
                        showNotify({ type: 'danger', message: '识别到翻拍或复制。请识别原件身份证' });
                        return
                    }
                    registerDto.value.driversName = face.data.name
                    registerDto.value.driversPersonalId = face.data.idNumber
                } else{
                    showNotify({ type: 'danger', message: '身份证识别失败,请重试' });
                }
            } else {
                showNotify({ type: 'danger', message: `身份证识别失败,${data.msg},请重试` });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }

    const resolveIdCardBack = async (file) => {
        // 大于10M则禁止识别
        if (file.content.size > 10 * 1024 * 1024) {
            showNotify({ type: 'danger', message: '文件大小不能超过10M' });
            return
        }
        // 开始转圈
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在识别身份证',
        })
        try {
            const {data} = await scanIdCard(file)
            if(data.code === 2000){
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if(resolveResult.data.back !== null){
                    const back = resolveResult.data.back
                    // 反面
                    if (back.warning.isCopy !== 0 || back.warning.isReshoot !== 0){
                        showNotify({ type: 'danger', message: '识别到翻拍或复制。请识别原件身份证' });
                        return
                    }
                    // data.validPeriod 2022.12.16-2032.12.16
                    // 取出后面那个2032.12.16并改写成yyyy-MM-dd
                    if (back.data.validPeriod.split('-')[1] === '长期'){
                        // 给一个很远很远的日子
                        back.data.validPeriod = '2999-12-31'
                    } else {
                        registerDto.value.driversExpireDate =
                            back.data.validPeriod.split('-')[1]
                                .replace(/(\d{4})\.(\d{2})\.(\d{2})/, '$1-$2-$3')
                    }
                } else {
                    showNotify({ type: 'danger', message: '请识别身份证反面' });
                }
            } else {
                showNotify({ type: 'danger', message: `身份证识别失败,${data.msg},请重试` });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }
    
    const resolveDrivingLicense = async (file) => {
        // 大于10M则禁止识别
        if (file.content.size > 10 * 1024 * 1024) {
            showNotify({ type: 'danger', message: '文件大小不能超过10M' });
            return
        } else if(registerDto.value.driversName === ''){
            showNotify({ type: 'danger', message: '请先识别身份证信息' });
        }
        // 开始转圈
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在识别驾驶证',
        })
        try{
            const {data} = await scanDrivingLicense(file)
            if (data.code === 2000){
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if(resolveResult.data.face !== null) {
                    if (resolveResult.data.face.data.name !== registerDto.value.driversName
                        || resolveResult.data.face.data.licenseNumber !== registerDto.value.driversPersonalId
                    ){
                        showNotify({ type: 'danger', message: '驾驶证与身份证所属人不一致,请更新材料' });
                        return
                    }
                    registerDto.value.driversLicenseNo = resolveResult.data.face.data.licenseNumber
                    registerDto.value.driversLicenseType = resolveResult.data.face.data.approvedType
                    // resolveResult.data.face.data.validPeriod 2021-07-28至2027-07-28 取出2027-07-28
                    const licenseExpireDate = resolveResult.data.face.data.validPeriod.split('至')[1]
                    // 比较registerDto.value.driversExpireDate 与 licenseExpireDate
                    // 哪个先到就取哪个
                    if (registerDto.value.driversExpireDate === ''){
                        registerDto.value.driversExpireDate = licenseExpireDate
                    } else {
                        registerDto.value.driversExpireDate =
                            registerDto.value.driversExpireDate > licenseExpireDate ?
                                licenseExpireDate : registerDto.value.driversExpireDate
                    }
                } else {
                    showNotify({ type: 'danger', message: '驾驶证识别失败,请重试' });
                }
            } else {
                showNotify({ type: 'danger', message: `驾驶证识别失败,${data.msg},请重试` });
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }
    
    const resolveVehicleLicenseFront = async (file) => {
        // 大于10M则禁止识别
        if (file.content.size > 10 * 1024 * 1024) {
            showNotify({ type: 'danger', message: '文件大小不能超过10M' });
            return
        }
        // 开始转圈
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在识别行驶证',
        })
        try{
            const {data} = await scanVehicleLicense(file)
            if (data.code === 2000){
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if(resolveResult.data.face !== null) {
                    if(import.meta.env.VITE_NODE_ENV==='production' &&
                        resolveResult.data.face.data.owner !== registerDto.value.driversName
                    ){
                        showNotify({ type: 'danger',
                            message: '行驶证与身份证所属人不一致或身份信息为空,请更新材料' });
                        return
                    } else if(resolveResult.data.face.data.useNature !== '非营运'){
                        showNotify({ type: 'warning', message: '行驶证非营运,我们建议您更新材料' });
                    }
                    registerDto.value.driversPlateNo =
                        resolveResult.data.face.data.licensePlateNumber
                    registerDto.value.driversVehicleType =
                        resolveResult.data.face.data.model + " " + resolveResult.data.face.data.vehicleType
                }
                } else {
                    showNotify({ type: 'danger', message: '行驶证识别失败,请重试' });
                }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
            closeToast();
        }
    }
    
    // 监听role的值 如果role数组中包含了isDriver则增加额外的表单
    watch(role, (newValue) => {
        showExtraForm.value = !!newValue.includes('isDriver');
    })
    
    const onSubmit = () => {}
</script>

<template>
    <div class="register-form">
        <h3 class="title">西工大拼车平台——注册</h3>
        <van-form @submit="onSubmit()">
            <van-cell-group inset style="padding: 1%;">
                <van-field
                    v-model="registerDto.username"
                    name="手机号"
                    label="手机号"
                    placeholder="请输入手机号"
                    type="tel"
                    clearable
                    :rules="[{ validator: validatorPhone, message: '请输入正确的手机号码' }]"
                    :disabled="checkSmsDisabled"
                />
                <van-field
                    v-model="confirmSmsDto.code"
                    center
                    clearable
                    type="digit"
                    label="短信验证码"
                    placeholder="请输入验证码"
                    :rules="[{ validator: validatorCode, message: '应为4位数字' }]"
                    v-if="!checkSmsDisabled"
                >
                    <template #button>
                        <van-button
                            v-if="sendSmsEnabled"
                            size="small"
                            type="primary"
                            @click="sendSms()"
                            :disabled="checkSmsDisabled"
                        >
                            发送验证码
                        </van-button>
                        <van-button
                            v-else-if="!sendSmsEnabled"
                            size="small"
                            type="primary"
                            disabled
                            loading
                            :loading-text="smsLoadingText">
                        </van-button>
                    </template>
                </van-field>
                <van-button plain block type="primary" v-if="!checkSmsDisabled"
                    size="small" style="width: 40%; margin: 1% auto" @click="confirmSms()">验证手机号码</van-button>
                <van-field
                    v-model="registerDto.email"
                    center
                    clearable
                    label="邮箱"
                    placeholder="请输入邮箱(非强制)"
                    :disabled="checkMailDisabled"
                />
                <van-field
                    v-model="confirmMailDto.code"
                    center
                    clearable
                    type="digit"
                    label="邮箱验证码"
                    placeholder="请输入验证码"
                    :rules="[{ required: false, validator: validatorRegisterCode, message: '应为4位数字' }]"
                    v-if="!checkMailDisabled"
                >
                    <template #button>
                        <van-button
                            v-if="sendMailEnabled"
                            size="small"
                            type="primary"
                            @click="sendMail()">
                            发送验证码
                        </van-button>
                        <van-button
                            v-else-if="!sendMailEnabled"
                            size="small"
                            type="primary"
                            disabled
                            loading
                            :loading-text="mailLoadingText">
                        </van-button>
                    </template>
                </van-field>
                <van-button plain block type="primary" v-if="!checkMailDisabled"
                    size="small" style="width: 40%; margin: 1% auto" @click="confirmMail()">验证邮箱</van-button>
                <h5>用户角色选择(可多选)</h5>
                <van-checkbox-group v-model="role" direction="horizontal" class="checkbox-area">
                    <van-checkbox name="isPassenger">我希望拼车-乘客</van-checkbox>
                    <van-checkbox name="isDriver">我可以搭人-司机</van-checkbox>
                </van-checkbox-group>
                <h5 v-if="showExtraForm">请您补充以下信息</h5>
                <van-uploader v-if="showExtraForm" style="width: 60%; margin: 0 auto;" :after-read="resolveIdCardFront">
                    <van-button plain block type="primary" size="small">
                        拍摄您的身份证-正面-以自动识别
                    </van-button>
                </van-uploader>
                <van-uploader v-if="showExtraForm" style="width: 60%; margin: 1% auto;" :after-read="resolveIdCardBack">
                    <van-button plain block type="primary" size="small">
                        拍摄您的身份证-背面-以自动识别
                    </van-button>
                </van-uploader>
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversPersonalId"
                    center
                    disabled
                    clearable
                    label="身份证号"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversName"
                    center
                    disabled
                    clearable
                    label="真实姓名"
                    placeholder="该位置会被自动填充"
                />
                <van-uploader v-if="showExtraForm" style="width: 60%; margin: 1% auto;" :after-read="resolveDrivingLicense">
                    <van-button plain block type="primary" size="small">
                        拍摄您的驾驶证-主页-以自动识别
                    </van-button>
                </van-uploader>
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversLicenseNo"
                    center
                    disabled
                    clearable
                    label="驾驶证号"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversLicenseType"
                    center
                    disabled
                    clearable
                    label="准驾类型"
                    placeholder="该位置会被自动填充"
                />
                <van-uploader v-if="showExtraForm"  style="width: 60%; margin: 1% auto;" :after-read="resolveVehicleLicenseFront">
                    <van-button plain block type="primary" size="small">
                        拍摄您的行驶证-主页-以自动识别
                    </van-button>
                </van-uploader>
                <van-uploader v-if="showExtraForm"  style="width: 60%; margin: 1% auto;">
                    <van-button plain block type="primary" size="small">
                        拍摄您的行驶证-副页-以自动识别
                    </van-button>
                </van-uploader>
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversPlateNo"
                    center
                    disabled
                    clearable
                    label="车牌号"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversVehicleType"
                    center
                    disabled
                    clearable
                    autosize
                    type="textarea"
                    label="车型"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-if="showExtraForm"
                    v-model="registerDto.driversExpireDate"
                    center
                    disabled
                    clearable
                    label="证照最早过期时间"
                    placeholder="该位置会被自动填充"
                />
            </van-cell-group>
            
            <p>
                <a>您确认注册则代表您认可我们的</a>
                <a style="color: #5CA0FF" @click="router.push('/privacy')">隐私政策</a>
            </p>
            
            <div class="submit-login-btn">
                <van-button plain block type="primary" native-type="submit">
                    注册
                </van-button>
                <van-button plain block type="success" @click="router.push('/login')">
                    返回登录页
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style lang="less" scoped>
    .register-form{
        .title{
            margin-top:5%;
        }
        width: 100%;
        height: 100%;
        text-align: center;
        .checkbox-area{
            display: flex;
            justify-content: space-around;
        }
        .submit-login-btn{
            display: flex;
            justify-content: space-around;
            margin: 5% auto 5%;
            .van-button{
                width: 40%;
            }
        }
    }
</style>