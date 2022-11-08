import Cookies from 'js-cookie'
import { axios } from 'configs'

const user = () => {
    const user = Cookies.get('user')
    if (user != undefined) return JSON.parse(user)
    return null
}

const refreshUser = async () => {
    const { data, status } = await axios({
        url: 'user',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    if (status != 200) throw new Error(data.data.message)

    Cookies.set('user', JSON.stringify(data.data), { expires: 7 })
}

const getToken = () => {
    const token = Cookies.get('token')
    if (token == undefined) logout()
    return token
}

const isAuthenticated = () => Cookies.get('token') != undefined

const logout = () => {
    Cookies.remove('user')
    Cookies.remove('token')
    Cookies.remove('requestJoin')
}

/**
 * @param  {string} email
 * @param  {string} password
 * @returns {Promise}
 */
const login = async (email, password) => {
    const loginError = new Error('Email or password is incorrect')

    const { data: lData, status: lStatus } = await axios({
        url: 'login',
        method: 'POST',
        data: { email, password },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (lStatus != 200) throw loginError

    const { data: uData, status: uStatus } = await axios({
        url: 'user',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${lData.data.access_token}`,
            Accept: 'application/json',
        }
    })
    if (uStatus != 200) throw loginError

    Cookies.set('user', JSON.stringify(uData.data), { expires: 7 })
    Cookies.set('token', lData.data.access_token, { expires: 7 })
}

/**
 * @param  {string} name
 * @param  {string} email
 * @param  {string} password
 * @returns {Promise}
 */
const registerGamer = async (name, email, password) => {
    const { data, status } = await axios({
        url: 'gamer/register',
        method: 'POST',
        data: { name, email, password },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if (status != 200) throw new Error(data.data.message)
}

/**
 * @param  {string} email
 * @param  {string} password
 * @returns {Promise}
 */
const registerGuildManager = async (email, password) => {
    const { data, status } = await axios({
        url: 'guild-manager/register',
        method: 'POST',
        data: { email, password },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (status != 200) throw new Error(data.data.message)
}

export {
    login,
    user,
    logout,
    registerGamer,
    registerGuildManager,
    getToken,
    refreshUser,
    isAuthenticated
}