// 司机部分使用的缓存
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCarpoolingDtoStore =
    defineStore('carpoolingCache', () => {
            const carpoolingCache = ref({
                departureTime: '',
                arriveTime: '',
                departurePoint: '',
                arrivePoint: '',
                passingPoint: '',
                description: '',
                totalPassengerNo: '',
                leftPassengerNo: '',
                price: ''
            })

            return {carpoolingCache}
        }, {
            persist: {
                storage: sessionStorage,
                paths: ['carpoolingCache'],
                key: "carpoolingCache"
            }
        }
    )
