<script setup>
    import {getGeoPoint, initMap} from '../../utils/amapUtil'
    import {onBeforeUnmount, onMounted, shallowRef, watch} from 'vue'
    import {closeToast, showLoadingToast, showNotify, showToast} from 'vant'
    import 'vant/es/notify/style'
    import 'vant/es/toast/style'
    import {useRouter} from 'vue-router'

    import {useDark} from '@vueuse/core'

    const isDark = useDark()
    const router = useRouter()

    // 首先需要引入 Vue3 的 shallowRef() 方法（使用 shallowRef() 进行非深度监听，
    // 因为在 Vue3 所使用的 Proxy 拦截操作会改变 JS API 原生对象，所以此处需要区别 Vue2 使用方式对地图对象行非深度监听，
    // 否则会出现问题，建议 JS API 相关对象采用非响应式的普通对象来存储）。
    let map = shallowRef(null)
    let AMap
    let departurePoint
    let arrivePoint
    let passingPoint = ''
    let opts = {waypoints: []}

    const resolvePoints = async () => {
        const tempDeparture = await getGeoPoint(router.currentRoute.value.query.departurePoint)
        departurePoint = new AMap.LngLat(tempDeparture[0], tempDeparture[1])
        const tmpArrive = await getGeoPoint(router.currentRoute.value.query.arrivePoint)
        arrivePoint = new AMap.LngLat(tmpArrive[0], tmpArrive[1])
        passingPoint = router.currentRoute.value.query.passingPoint
        if (passingPoint !== '') {
            const passingPointArr = passingPoint.split(',')
            for (const item of passingPointArr) {
                const tmpPassing = await getGeoPoint(item)
                opts.waypoints.push(
                    new AMap.LngLat(tmpPassing[0], tmpPassing[1])
                )
            }
        }
    }

    function drawRoute (route) {
        const path = parseRouteToPath(route)

        const startMarker = new AMap.Marker({
            position: path[0],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
            map: map.value
        })

        const endMarker = new AMap.Marker({
            position: path[path.length - 1],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            map: map.value
        })

        const routeLine = new AMap.Polyline({
            path: path,
            isOutline: true,
            outlineColor: '#ffeeee',
            borderWeight: 2,
            strokeWeight: 5,
            strokeColor: '#0091ff',
            lineJoin: 'round'
        })

        routeLine.setMap(map)

        // 调整视野达到最佳显示区域
        map.value.setFitView([startMarker, endMarker, routeLine])
    }

    // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
    // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
    function parseRouteToPath (route) {
        const path = [];

        let i = 0, l = route.steps.length
        for (; i < l; i++) {
            const step = route.steps[i]

            let j = 0, n = step.path.length
            for (; j < n; j++) {
                path.push(step.path[j])
            }
        }

        return path
    }

    const createMapInstance = async (AMap) => {
        map.value = new AMap.Map('carpooling-route-map', { //设置地图容器id
            resizeEnable: true, //是否监控地图容器尺寸变化
            mapStyle: !isDark.value ? 'amap://styles/normal' : 'amap://styles/dark', //设置地图的显示样式
            viewMode: "3D", //是否为3D地图模式
            zoom: 15, //初始化地图级别 3-18的整数
            center: [108.764362, 34.028885] //初始化地图中心点位置
        })
        const driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME,
            map: map.value
        })
        driving.search(departurePoint, arrivePoint, opts, function (status, result) {
            // result即是对应的驾车导航信息，相关数据结构文档请参考
            // https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
                if (result.routes && result.routes.length) {
                    // 绘制第一条路线，也可以按需求绘制其它几条路线
                    drawRoute(result.routes[0])
                }
            } else {
                showNotify({type: 'danger', message: '路线规划失败，请检查输入地点是否在西安市范围内'})
            }
        })
    }

    // 监听isDark 如果切换到暗黑模式 则config-provider的background-color为black
    watch(isDark, async (val) => {
        // 重建map实例 不加这一句log这个watch要失效 不知道为什么
        console.log(val)
        await resolvePoints()
        await createMapInstance(AMap)
    })

    // 跳转到内置高德地图app
    const formUrlOfAMapApp = async () => {
        const toast = showToast({
            duration: 0,
            forbidClick: true,
            message: '注意: 由于URI SDK只允许一个途经点，因此如果您填入了多个途经点，我们默认使用第一个作为参数。'
        })
        let second = 4
        const timer = setInterval(() => {
            second--
            if (second) {
                toast.message = `倒计时 ${second} 秒 \n 注意: 由于URI SDK只允许一个途经点，因此如果您填入了多个途经点，我们默认使用只第一个作为参数。`
            } else {
                clearInterval(timer)
                closeToast()
                // 等loadingToast消失了之后执行
                // position=lon,lat[,name]
                const from = `${departurePoint.lng},` +
                    `${departurePoint.lat},` +
                    `${router.currentRoute.value.query.departurePoint}`
                const to = `${arrivePoint.lng},` +
                    `${arrivePoint.lat},` +
                    `${router.currentRoute.value.query.arrivePoint}`
                const via = `${opts.waypoints[0].lng},` +
                    `${opts.waypoints[0].lat},` +
                    `${router.currentRoute.value.query.passingPoint}`
                const mode = 'car'
                const policy = 0
                const coordinate = 'gaode'
                const callnative = 1
                console.log(from)
                console.log(to)
                window.location.href = `https://uri.amap.com/navigation?' +
                    'policy=${policy}&from=${from}&to=${to}&via=${via}&mode=${mode}' +
                    '&coordinate=${coordinate}&callnative=${callnative}`
            }
        }, 1000);
    }

    onMounted(async () => {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            message: '正在加载地图...'
        })
        try {
            AMap = await initMap()
            await resolvePoints()
            await createMapInstance(AMap)
        } catch (e) {
            showNotify({type: 'danger', message: '地图加载失败'})
        } finally {
            closeToast()
        }
    })
    
    onBeforeUnmount(() => {
        // 调用document来destroy地图 即id为carpooling-route-map的div
        document.getElementById('carpooling-route-map').remove()
    })
</script>

<template>
    <div class="container">
        <van-nav-bar
            title="行程预览"
            left-text="返回"
            right-text="使用高德地图打开"
            left-arrow
            @click-left="router.go(-1)"
            @click-right="formUrlOfAMapApp()"
        />
        <div id="carpooling-route-map"></div>
    </div>
</template>

<style lang="less" scoped>
  .container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;

    .van-nav-bar {
      height: 7%;
    }

    #carpooling-route-map {
      width: 100%;
      height: 93%;
      margin: 0;
    }
  }
</style>
