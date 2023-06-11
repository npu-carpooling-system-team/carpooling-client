import axios from '../api/index.js'

export const scanIdCard = async (base64File) => {
    // 将file从一串base64转为MultipartFile 保留原名
    const file = base64ToFile(base64File.content, base64File.file.name)
    const formData = new FormData()
    formData.append('file', file)
    return await axios.post('/api/auth/register/ocr/idCard', formData)
}

export const scanDrivingLicense = async (base64File) => {
    // 将file从一串base64转为MultipartFile 保留原名
    const file = base64ToFile(base64File.content, base64File.file.name)
    const formData = new FormData()
    formData.append('file', file)
    return await axios.post('/api/auth/register/ocr/drivingLicense', formData)
}

export const scanVehicleLicense = async (base64File) => {
    // 将file从一串base64转为MultipartFile 保留原名
    const file = base64ToFile(base64File.content, base64File.file.name)
    const formData = new FormData()
    formData.append('file', file)
    return await axios.post('/api/auth/register/ocr/vehicleLicense', formData)
}

export function base64ToFile (dataUrl, filename) {
    let arr = dataUrl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bStr = window.atob(arr[1]),
        n = bStr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}
