export function validatorPhone (val) {
    return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(val)
}
export function validatorPassword (val) {
    // 4-16位数字或字母或下划线组合
    return /^\w{4,16}$/.test(val)
}
export function validatorCode (val) {
    // 4位纯数字
    return /^\d{4}$/.test(val)
}

export function validatorRegisterCode (val) {
    // 全空或4位纯数字
    return /^\s*$/.test(val) || /^\d{4}$/.test(val)
}

export function validatorPersonalId (val) {
    return /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(val)
}
