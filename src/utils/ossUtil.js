import axios from '../api/index'
import OSS from 'ali-oss'
import { revertFromUTF8 } from './utf8Util.js'

export const headers = {
    // 指定该Object被下载时的网页缓存行为。
    // "Cache-Control": "no-cache",
    // 指定该Object被下载时的名称。
    // "Content-Disposition": "example.txt",
    // 指定该Object被下载时的内容编码格式。
    // "Content-Encoding": "utf-8",
    // 指定过期时间，单位为毫秒。
    // Expires: "1000",
    // 指定Object的存储类型。
    "x-oss-storage-class": "Standard",
    // 指定Object的访问权限。
    'x-oss-object-acl': 'public-read',
    // 指定Object标签，可同时设置多个标签。
    // "x-oss-tagging": "Tag1=1&Tag2=2",
    // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
    "x-oss-forbid-overwrite": "true"
}
// eslint-disable-next-line valid-jsdoc
/**
 * 生成随机uuid
 */
export const createFileNameUUID = () => {
    function rx () {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
    }

    return `${+new Date()}_${rx()}${rx()}`
}

// 注意 这样的语法(在模块顶层使用await without 一个 async) 不被低级浏览器支持 需要引入并配置插件
// npm install vite-plugin-top-level-await
const token = await axios.get(import.meta.env.VITE_OSS_STS_URL)
const FOLDER_NAME = 'carpooling/avatars/'

const client = new OSS({
    endpoint: 'oss-cn-hongkong.aliyuncs.com', //填写Bucket所在地域
    accessKeyId: token.data.AccessKeyId,
    accessKeySecret: token.data.AccessKeySecret,
    // STS临时授权
    stsToken: token.data.SecurityToken,
    bucket: 'wangminan-files', // 填写Bucket名称。
    useFetch: true, // 支持上传大于100KB的文件
    secure: true, // 返回的url为https
    refreshSTSToken: async () => {
        const refreshToken = await axios.get(import.meta.env.VITE_OSS_STS_URL);
        return {
            accessKeyId: refreshToken.AccessKeyId,
            accessKeySecret: refreshToken.AccessKeySecret,
            stsToken: refreshToken.SecurityToken
        };
    }
})

export const putFile = async (name, file) => {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    return await client.put(
        FOLDER_NAME + name + '_' + createFileNameUUID() + '.' + file.name.split('.')[1],
        file,
        {headers}
    )
}

// 删除原有文件
export const deleteFile = async (name) => {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    return await client.delete(
        // 注意UTF-8转码 否则delete的请求路径中将出现中文问题
        revertFromUTF8(FOLDER_NAME + name)
    )
}
