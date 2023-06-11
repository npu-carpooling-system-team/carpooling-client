import { JSEncrypt } from 'js-encrypt'
// 密钥对生成 http://web.chacuo.net/netrsakeypair
const publicKey =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5vwYRBKySNSl/60qRqcD\n' +
    'lDVcNP9j2UyB7yalGI9MtlBEZ16pEiR08TuZjUL00go5LEb6z+ghVlp6UOsWR6i3\n' +
    'r7Q+FleKHG2yStqqaWx+11OQzOjffXQwqb1t/0bq/tzy04KBinSaB/yqnMc0yO8n\n' +
    'rZx8OtUX5rMcM7BjvpFOdnCSFUAOOfKRirfT5RydyGeLPOnBTwJIwpygGu20++UX\n' +
    'MxARO1aAJeUXeI+9g+XcsAi1EKbI2YdjWJ8PQnBC9+lsDRS3w8uKqUOZdYu/FxAy\n' +
    'bEjQ+YOXzfu2PB9+BdilkztV/yuF6hfk7MpGdA2JoBsJlljSYWH1mUE+e9mnUyHi\n' +
    '/wIDAQAB'

// 加密
export function encrypt (txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encrypt(txt) // 对数据进行加密
}
