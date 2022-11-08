import axios, { AxiosRequestConfig } from 'axios'
import env from './env'

const customAxios = axios.create({
    baseURL: env.domain
})
customAxios.interceptors.request.use(conf => conf, err => { throw Error('server error') })
customAxios.interceptors.response.use(res => res, err => { throw Error(err.response.data.data.message) })

/**
 * @param {AxiosRequestConfig} args
 */
const instance = async (args) => {
    try {
        return await axios(args)
    } catch (error) {
        throw Error('server error')
    }
}

export default instance