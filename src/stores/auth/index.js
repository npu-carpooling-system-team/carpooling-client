// auth部分使用的缓存
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useRegisterDtoStore =
    defineStore('registerDtoCache', () => {
            const registerCache = ref(
                {
                    registerDto: {
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
                    },
                    checkSmsDisabled: false,
                    checkMailDisabled: false,
                    checkIdFront: false,
                    checkIdBack: false,
                    checkDriving: false,
                    checkCarFront: false,
                    checkCarBack: false
                }
            )
            return {registerCache}
        }, {
            persist: {
                storage: sessionStorage,
                paths: ['registerCache'],
                key: "registerCache"
            }
        }
    )
