import axios from "axios";

const _axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


export default _axios
