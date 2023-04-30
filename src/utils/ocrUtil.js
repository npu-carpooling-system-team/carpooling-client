import ocr_api20210707, * as $ocr_api20210707 from '@alicloud/ocr-api20210707'
import * as $OpenApi from '@alicloud/openapi-client'
import axios from '../api'
import Util, * as $Util from '@alicloud/tea-util'

const token = await axios.get(import.meta.env.VITE_OCR_STS_URL)

const config = new $OpenApi.Config({
    accessKeyId: token.data.AccessKeyId,
    accessKeySecret: token.data.AccessKeySecret,
})
config.endpoint = `ocr-api.cn-hangzhou.aliyuncs.com`;

const client = new ocr_api20210707(config)

export const scanIdCard = async (file) => {
    let recognizeIdCardRequest =
        new $ocr_api20210707.RecognizeIdcardRequest({
        body: file,
        outputQualityInfo: true,
        outputFigure: true,
    })
    let runtime = new $Util.RuntimeOptions({ });
    try {
        // 复制代码运行请自行打印 API 的返回值
        const resp=
            await client.recognizeIdcardWithOptions(recognizeIdCardRequest, runtime)
        /*
        * 调用样例如下
        * Data中的内容如下
        * 正面face 反面back
        * {"algo_version": "b8d33b31ac37b5444dbfe791105de25acb0abba5", "data": {"face": {"algo_version": "b8d33b31ac37b5444dbfe791105de25acb0abba5", "angle": 0, "data": {"name": "方大呆", "sex": "女", "ethnicity": "汉", "birthDate": "2006年10月2日", "address": "上海市西藏南路-瞿溪路弘辉名苑", "idNumber": "371002200610020000"}, "figure": [{"type": "face", "x": 284, "y": 24, "w": 177, "h": 213, "box": {"x": 371, "y": 130, "w": 209, "h": 172, "angle": 89}, "points": [{"x": 286, "y": 27}, {"x": 457, "y": 25}, {"x": 459, "y": 234}, {"x": 286, "y": 230}]}], "ftype": 0, "height": 307, "orgHeight": 307, "orgWidth": 483, "prism_keyValueInfo": [{"key": "name", "keyProb": 100, "value": "方大呆", "valuePos": [{"x": 82, "y": 40}, {"x": 142, "y": 40}, {"x": 142, "y": 60}, {"x": 82, "y": 60}], "valueProb": 100}, {"key": "sex", "keyProb": 100, "value": "女", "valuePos": [{"x": 85, "y": 77}, {"x": 104, "y": 77}, {"x": 104, "y": 96}, {"x": 85, "y": 96}], "valueProb": 100}, {"key": "ethnicity", "keyProb": 100, "value": "汉", "valuePos": [{"x": 192, "y": 75}, {"x": 212, "y": 75}, {"x": 212, "y": 95}, {"x": 192, "y": 95}], "valueProb": 100}, {"key": "birthDate", "keyProb": 100, "value": "2006年10月2日", "valuePos": [{"x": 76, "y": 116}, {"x": 214, "y": 116}, {"x": 214, "y": 131}, {"x": 76, "y": 131}], "valueProb": 100}, {"key": "address", "keyProb": 100, "value": "上海市西藏南路-瞿溪路弘辉名苑", "valuePos": [{"x": 73, "y": 154}, {"x": 278, "y": 154}, {"x": 278, "y": 196}, {"x": 73, "y": 196}], "valueProb": 100}, {"key": "idNumber", "keyProb": 100, "value": "371002200610020000", "valuePos": [{"x": 162, "y": 256}, {"x": 379, "y": 256}, {"x": 379, "y": 274}, {"x": 162, "y": 274}], "valueProb": 100}], "sliceRect": {"x0": 0, "y0": 0, "x1": 482, "y1": 0, "x2": 483, "y2": 307, "x3": 0, "y3": 307}, "warning": {"isCopy": 0, "isReshoot": 0, "completenessScore": 98.645515, "qualityScore": 73.324371}, "width": 483}}, "height": 307, "orgHeight": 307, "orgWidth": 483, "width": 483}
        */
        return resp.Data.data
    } catch (error) {
        // 如有需要，请打印 error
        Util.assertAsString(error.message);
    }
}

