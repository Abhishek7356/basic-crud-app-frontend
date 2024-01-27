import axios from 'axios'

export const commonApi = async (method, url, data) => {
    const axiosConfig = {
        method,
        url,
        data,
        headers: { "Content-Type": "application/json" }
    }
    return await axios(axiosConfig).then((res) => res).catch(err => err)
}