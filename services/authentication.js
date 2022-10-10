import Cookies from 'js-cookie'
import configs from 'configs'

const { env } = configs

const user = () => {
    const user = Cookies.get('user')
    if (user != undefined) return JSON.parse(user)
    return null
}

const refreshUser = async () => {
    const response = await fetch(`${env.domain}/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',

        }
    })
    
    const json = await response.json()
    if (response.status != 200) throw new Error(json.data.message)

    Cookies.set('user', JSON.stringify(json.data), {expires: 7})
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

    const response = await fetch(`${env.domain}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (response.status != 200) throw loginError

    const json = await response.json()
    const responseUser = await fetch(`${env.domain}/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${json.data.access_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',

        }
    })

    if (responseUser.status != 200) throw loginError
    const jsonUser = await responseUser.json()

    Cookies.set('user', JSON.stringify(jsonUser.data), { expires: 7 })
    Cookies.set('token', json.data.access_token, { expires: 7 })
}

/**
 * @param  {string} name
 * @param  {string} email
 * @param  {string} password
 * @returns {Promise}
 */
const registerGamer = async (name, email, password) => {

    const response = await fetch(`${env.domain}/gamer/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })

    if (response.status != 200) throw new Error((await response.json()).data.message)
}

/**
 * @param  {string} email
 * @param  {string} password
 * @returns {Promise}
 */
const registerGuildManager = async (email, password) => {
    const response = await fetch(`${env.domain}/guild-manager/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (response.status != 200) throw new Error((await response.json()).data.message)
}

const authentication = {
    login,
    user,
    logout,
    registerGamer,
    registerGuildManager,
    getToken,
    refreshUser,
    isAuthenticated
}
export default authentication