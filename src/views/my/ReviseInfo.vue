<script setup>
    import {onMounted, ref, watch} from 'vue'
    import {validatorCode, validatorPhone, validatorRegisterCode} from '@/utils/validatorUtil'
    import {closeToast, showLoadingToast, showNotify} from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    import axios from '../../api'
    import {useRouter} from 'vue-router'
    import {base64ToFile, scanDrivingLicense, scanIdCard, scanVehicleLicense} from '@/utils/ocrUtil'
    import {useUserStore} from '@/stores'
    import {storeToRefs} from 'pinia'
    import {deleteFile, putFile} from '@/utils/ossUtil'
    import {handleGetPersonalInfo} from "@/api/common";

    const router = useRouter()

    const userStore = useUserStore()
    const {currentUser} = storeToRefs(userStore)

    const reviseUserDto = ref({
        username: '',
        userImage: '',
        email: '',
        alipayId: '',
        isDriver: true,
        isPassenger: true,
        driversName: '',
        driversPersonalId: '',
        driversLicenseNo: '',
        driversLicenseType: '',
        driversPlateNo: '',
        driversVehicleType: '',
        driversExpireDate: '',
        avgScore: ''
    })

    const confirmMailDto = ref({
        mail: '',
        code: ''
    })

    const checkMailDisabled = ref(false)

    const sendMailEnabled = ref(true)

    const mailLoadingText = ref('')

	const beginLoading = (message) => {
		showLoadingToast({
			duration: 0,
			forbidClick: true,
			message: message
		})
	}

    const sendMail = async () => {
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(reviseUserDto.value.email)){
            showNotify({ type: 'danger', message: '邮箱格式不正确' });
            return
        }
        beginLoading('请求验证码发送中')
        const sendMailDto = {
            'email': reviseUserDto.value.email
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
        confirmMailDto.value.mail = reviseUserDto.value.email
        if(!validatorCode(confirmMailDto.value.code) ||
            /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(confirmMailDto.value.code)){
            showNotify({ type: 'danger', message: '格式不正确' });
            return
        }
        beginLoading('请求邮箱验证中')
        try{
            const {data} = await axios.post("/api/auth/checkmail", confirmMailDto.value)
            if (data.code !== null && data.code === 2000){
                showNotify({ type: 'success', message: '邮箱验证成功' });
                // 禁止重复提交
                checkMailDisabled.value = true
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
    let checkIdFront = false
    let checkIdBack = false
    let checkDriving = false
    let checkCarFront = false
    let checkCarBack = false

    const picPreCheck = (file) => {
        // 大于10M则禁止识别
        if (file.content.size > 10 * 1024 * 1024) {
            showNotify({ type: 'danger', message: '文件大小不能超过10M' });
            return false
        } else if (!/image\/(png|jpg|jpeg|JPG|PNG)/.test(file.file.type)) {
            showNotify({ type: 'danger', message: '文件格式不正确' });
            return false
        }
        return true
    }
    // 身份证正反写是因为JSON解析有那么点问题 找不出face和back
    const resolveIdCardFront = async (file) => {
        if (!picPreCheck(file)){
            return
        }
        // 开始转圈
        beginLoading('正在识别身份证')
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
                    reviseUserDto.value.driversName = face.data.name
                    reviseUserDto.value.driversPersonalId = face.data.idNumber
                    checkIdFront = true
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
        if (!picPreCheck(file)){
            return
        }
        // 开始转圈
        beginLoading('正在识别身份证')
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
                        reviseUserDto.value.driversExpireDate =
                            back.data.validPeriod.split('-')[1]
                                .replace(/(\d{4})\.(\d{2})\.(\d{2})/, '$1-$2-$3')
                    }
                    checkIdBack = true
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
        if (!picPreCheck(file)) {
            return
        } else if(reviseUserDto.value.driversName === ''){
            showNotify({ type: 'danger', message: '请先识别身份证信息' });
        }
        // 开始转圈
        beginLoading('正在识别驾驶证')
        try{
            const {data} = await scanDrivingLicense(file)
            if (data.code === 2000){
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if(resolveResult.data.face !== null) {
                    if (resolveResult.data.face.data.name !== reviseUserDto.value.driversName
                        || resolveResult.data.face.data.licenseNumber !== reviseUserDto.value.driversPersonalId
                    ){
                        showNotify({ type: 'danger', message: '驾驶证与身份证所属人不一致,请更新材料' });
                        return
                    }
                    reviseUserDto.value.driversLicenseNo = resolveResult.data.face.data.licenseNumber
                    reviseUserDto.value.driversLicenseType = resolveResult.data.face.data.approvedType
                    // resolveResult.data.face.data.validPeriod 2021-07-28至2027-07-28 取出2027-07-28
                    const licenseExpireDate = resolveResult.data.face.data.validPeriod.split('至')[1]
                    // 比较reviseUserDto.value.driversExpireDate 与 licenseExpireDate
                    // 哪个先到就取哪个
                    if (reviseUserDto.value.driversExpireDate === ''){
                        reviseUserDto.value.driversExpireDate = licenseExpireDate
                    } else {
                        reviseUserDto.value.driversExpireDate =
                            reviseUserDto.value.driversExpireDate > licenseExpireDate ?
                                licenseExpireDate : reviseUserDto.value.driversExpireDate
                    }
                    checkDriving = true
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
        if (!picPreCheck(file)){
            return
        }
        // 开始转圈
        beginLoading('正在识别行驶证')
        try{
            const {data} = await scanVehicleLicense(file)
            if (data.code === 2000){
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if(resolveResult.data.face !== null) {
                    if(import.meta.env.VITE_NODE_ENV === 'production' &&
                        resolveResult.data.face.data.owner !== reviseUserDto.value.driversName
                    ){
                        showNotify({ type: 'danger',
                            message: '行驶证与身份证所属人不一致或身份信息为空,请更新材料' });
                        return
                    } else if(resolveResult.data.face.data.useNature !== '非营运'){
                        showNotify({ type: 'warning', message: '行驶证非营运,我们建议您更新材料' });
                    }
                    reviseUserDto.value.driversPlateNo =
                        resolveResult.data.face.data.licensePlateNumber
                    reviseUserDto.value.driversVehicleType =
                        resolveResult.data.face.data.model + " " + resolveResult.data.face.data.vehicleType
                    checkCarFront = true
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

    const resolveVehicleLicenseBack = async (file) => {
        if (!picPreCheck(file)){
            return
        }
        // 开始转圈
		beginLoading('正在识别行驶证')
        try{
            const {data} = await scanVehicleLicense(file)
            if (data.code === 2000){
                // 进一步解析
                const resolveResult = JSON.parse(data.data)
                if(resolveResult.data.back !== null) {
                    if (resolveResult.data.back.data.inspectionRecord === null){
                        showNotify({ type: 'danger', message: '行驶证未年检,请更新材料' })
                        return
                    }
                    // 解析 浙江的格式是 浙AS0N56检验有效期至2020年05月浙AQ;浙AS0N56检验有效期至2024年05月浙A
                    // 我们现在需要把其中 2020年05月 和 2024年05月 即所有 '有效期至'后面的内容取出来
                    // 比较大小 取最大的 再与reviseUserDto.value.driversExpireDate比较 取小的
                    const inspectionRecord = resolveResult.data.back.data.inspectionRecord
                    const reg = /有效期至(\d{1,4}年\d{1,2}月)/g
                    const matchResult = inspectionRecord.match(reg)
                    if (matchResult === null){
                        showNotify({ type: 'danger', message: '行驶证年检信息解析失败,请更新材料' })
                        return
                    }
                    // 对matchResult进行排序
                    matchResult.sort((a, b) => {
                        const aYear = a.match(/\d{1,4}年\d{1,2}月/)[0]
                        const bYear = b.match(/\d{1,4}年\d{1,2}月/)[0]
                        return aYear > bYear ? 1 : -1
                    })
                    // 取最大的
                    const maxExpireDate = matchResult[matchResult.length - 1].match(/\d{1,4}年\d{1,2}月/)[0]
                    // 比较reviseUserDto.value.driversExpireDate 与 maxExpireDate 将maxExpireDate转为yyyy-MM-dd
                    const licenseExpireDate = maxExpireDate.replace('年', '-').replace('月', '-01')
                    // 哪个先到就取哪个
                    if (reviseUserDto.value.driversExpireDate === ''){
                        reviseUserDto.value.driversExpireDate = licenseExpireDate
                    } else {
                        reviseUserDto.value.driversExpireDate =
                            reviseUserDto.value.driversExpireDate > licenseExpireDate ?
                                licenseExpireDate : reviseUserDto.value.driversExpireDate
                    }
                    checkCarBack = true
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

    const isDriverInfoEmpty = () => {
        return reviseUserDto.value.driversName === '' ||
            reviseUserDto.value.driversPersonalId === '' ||
            reviseUserDto.value.driversVehicleType === '' ||
            reviseUserDto.value.driversExpireDate === '' ||
            reviseUserDto.value.driversPlateNo === ''
    }
    
    const notAllCardChecked = () => {
        return !checkIdFront || !checkIdBack || !checkDriving || !checkCarFront || !checkCarBack
    }
    
    const submitPreCheck = () => {
        // 如果是司机 则有关字段均不允许为空
        if (reviseUserDto.value.isDriver && isDriverInfoEmpty()){
            showNotify({ type: 'danger', message: '请完善司机信息' })
            return false
        }
        // 确认邮箱已经完成校验
        if (!checkMailDisabled.value
            && reviseUserDto.value.email !== ''
            && reviseUserDto.value.email !== currentUser.value.user.email
        ){
            showNotify({ type: 'danger', message: '请先完成邮箱校验' })
            return false
        }
        if (reviseUserDto.value.isDriver && notAllCardChecked()){
            showNotify({ type: 'danger', message: '请先有关证照校验' })
            return false
        }
        return true
    }

	const fileList = ref([])
	
    // https://wangminan-files.oss-cn-hongkong.aliyuncs.com/default/defaultAvatar.png 取出 defaultAvatar.png
    const oldAvatarFileName = currentUser.value.user.userImage.split('/').pop()
    
    const uploadAvatar = async (file) => {
		beginLoading('正在上传头像')
		try {
			const newAvatar = base64ToFile(file.content, file.file.name)
			const result = await putFile(newAvatar.name, newAvatar)
			if (result.url !== undefined){
				reviseUserDto.value.userImage = result.url
			}
			return true
        } catch (e) {
            showNotify({ type: 'danger', message: `头像上传失败,请重试` })
		} finally {
			closeToast()
		}
		return false
    }
	
	const renewPinia = async () => {
		beginLoading('正在更新用户信息缓存')
		try {
			// 更新pinia缓存
			const data = await handleGetPersonalInfo()
			if (data.code === 2000) {
				userStore.$patch((state) => {
					state.currentUser = data.result.result
				})
			} else {
				showNotify({type: 'danger', message: `首页初始化失败,${data.msg},请刷新页面重试`});
			}
        } finally {
			closeToast()
		}
    }
    
    // 这下终于得注册了
    // eslint-disable-next-line complexity
    const onSubmit = async () => {
		let reviseAvatar = false
		if (fileList.value[0].url === undefined){
			reviseAvatar = true
			const tmpPic = fileList.value[0]
            if (!picPreCheck(tmpPic)){
				return
            }
			// 上传图片
            const result = await uploadAvatar(fileList.value[0])
            if (!result){
				return
            }
        }
        // 开始转圈
        beginLoading('正在提交修改信息')
        try {
            // 开始预校验
            // 解析用户角色
            if (role.value.indexOf('isDriver') !== -1) {
                reviseUserDto.value.isDriver = true
            } else if (role.value.indexOf('isPassenger') !== -1) {
                reviseUserDto.value.isPassenger = true
            }
            if (!reviseUserDto.value.isDriver && !reviseUserDto.value.isPassenger){
                showNotify({ type: 'danger', message: '请选择用户角色' })
                return
            }
            if (!submitPreCheck()){
                return
            }
            // 预校验结束 开始提交
            const {data} = await axios.put('/api/user/info', reviseUserDto.value)
            if (data.code === 2000){
                showNotify({ type: 'success', message: '修改个人信息成功' })
                await renewPinia()
            } else {
                showNotify({ type: 'danger', message: data.message })
            }
        } catch (e) {
            showNotify({ type: 'danger', message: `服务器异常${e},请通知管理员` });
        } finally {
			closeToast()
            beginLoading('正在清除旧缓存')
			if (
				reviseAvatar &&
				oldAvatarFileName !== import.meta.env.VITE_DEFAULT_AVATAR.split('/').pop()
			){
				// 非默认头像 删除数据省OSS存储
				await deleteFile(oldAvatarFileName)
			}
            closeToast()
        }
		// 刷新当前页面
		await router.go(0)
    }
	
    onMounted(() => {
        // 初始化
        reviseUserDto.value.username = currentUser.value.user.username
        reviseUserDto.value.email = currentUser.value.user.email
        reviseUserDto.value.userImage = currentUser.value.user.userImage
        fileList.value.push({
            url: currentUser.value.user.userImage,
            isImage: true
        })
        reviseUserDto.value.alipayId = currentUser.value.user.alipayId
        reviseUserDto.value.isDriver = currentUser.value.user.isDriver
        reviseUserDto.value.isPassenger = currentUser.value.user.isPassenger
        reviseUserDto.value.driversName = currentUser.value.driver.driversName
        reviseUserDto.value.driversPersonalId = currentUser.value.driver.driversPersonalId
        reviseUserDto.value.driversVehicleType = currentUser.value.driver.driversVehicleType
        reviseUserDto.value.driversExpireDate = currentUser.value.driver.driversExpireDate
        reviseUserDto.value.driversPlateNo = currentUser.value.driver.driversPlateNo
        reviseUserDto.value.driversLicenseType = currentUser.value.driver.driversLicenseType
        reviseUserDto.value.driversLicenseNo = currentUser.value.driver.driversLicenseNo
        if (currentUser.value.user.isDriver) {
            role.value.push('isDriver')
            showExtraForm.value = true
            // 所有确认应当被设置到正确状态
            checkIdFront = true
            checkIdBack = true
            checkDriving = true
            checkCarFront = true
            checkCarBack = true
        }
        if (currentUser.value.user.isPassenger) {
            role.value.push('isPassenger')
        }
    })
</script>

<template>
    <div class="register-form">
        <van-nav-bar
            title="修改个人信息"
            left-text="返回"
            left-arrow
            @click-left="router.go(-1)"
        />
        <van-form @submit="onSubmit()">
            <van-cell-group inset style="padding: 1%;">
                <van-cell>
                    <van-row class="personCard">
                        <van-col span="8">
                            头像
                        </van-col>
                        <van-col span="16">
                            <van-uploader
                                v-model="fileList"
                                :max-count="1"
                                :max-size="10 * 1024 * 1024"
                            />
                        </van-col>
                    </van-row>
                </van-cell>
                <van-field
                    v-model="reviseUserDto.username"
                    name="手机号"
                    label="手机号"
                    placeholder="请输入手机号"
                    type="tel"
                    clearable
                    :rules="[{ validator: validatorPhone, message: '请输入正确的手机号码' }]"
                    :disabled="true"
                />
                <van-field
                    v-model="reviseUserDto.email"
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
                <!-- 司机部分 -->
                <h5 v-if="showExtraForm">请您点击按钮，通过图片识别修改以下信息</h5>
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
                    v-model="reviseUserDto.driversPersonalId"
                    center
                    disabled
                    clearable
                    label="身份证号"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-if="showExtraForm"
                    v-model="reviseUserDto.driversName"
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
                    v-model="reviseUserDto.driversLicenseNo"
                    center
                    disabled
                    clearable
                    label="驾驶证号"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-if="showExtraForm"
                    v-model="reviseUserDto.driversLicenseType"
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
                <van-uploader v-if="showExtraForm"  style="width: 60%; margin: 1% auto;" :after-read="resolveVehicleLicenseBack">
                    <van-button plain block type="primary" size="small">
                        拍摄您的行驶证-副页-以自动识别
                    </van-button>
                </van-uploader>
                <van-field
                    v-if="showExtraForm"
                    v-model="reviseUserDto.driversPlateNo"
                    center
                    disabled
                    clearable
                    label="车牌号"
                    placeholder="该位置会被自动填充"
                />
                <van-field
                    v-if="showExtraForm"
                    v-model="reviseUserDto.driversVehicleType"
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
                    v-model="reviseUserDto.driversExpireDate"
                    center
                    disabled
                    clearable
                    label="证照最早过期时间"
                    placeholder="该位置会被自动填充"
                />
            </van-cell-group>
            <div class="submit-login-btn">
                <van-button plain block type="primary" native-type="submit">
                    确认修改
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style lang="less" scoped>
  .register-form{
    width: 100%;
    height: 100%;
    text-align: center;
    .personCard{
      height: 10%;
      // 纵向居中
      display: flex;
      align-items: center;
      text-align: left;
      .avatar-container{
        margin-left: 5px;
      }
    }
    .title{
      margin-top:5%;
    }
    .van-form{
      margin-top:2%;
    }
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
