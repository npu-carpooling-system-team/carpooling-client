import AMapLoader from '@amap/amap-jsapi-loader'
import axios from 'axios'

// 这个转发还有个坑 走nginx的时候用https的话不知道为什么会405 网关超时
window._AMapSecurityConfig = {
    serviceHost: import.meta.env.VITE_AMAP_HOST_BACKUP
}

export const initMap = async () => {
    return await AMapLoader.load({
        key: import.meta.env.VITE_AMAP_KEY_BACKUP, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Driving','AMap.Geocoder', 'AMap.Geolocation', 'AMap.ToolBar'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
}

export const getGeoPoint = async (address) => {
    const {data} = await axios.get(import.meta.env.VITE_WEB_API_KEY_HOST)
    const parameters = {
        key: data.WebApiKey,
        address: address,
        city: '西安'
    }
    // 使用axios因为有baseUrl所以会有跨域问题 改用fetch
    const resp = await fetch(
        `https://restapi.amap.com/v3/geocode/geo?key=${parameters.key}&address=${parameters.address}&city=${parameters.city}`,
        {
            method: 'GET'
        })
    const geoData = await resp.json()
    if (geoData.info !== 'OK') {
        throw new Error('获取经纬度失败')
    }
    // 开始解析
    return geoData.geocodes[0].location.split(',')
}
