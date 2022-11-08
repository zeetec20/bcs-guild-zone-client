import * as authentication from './authentication'
import { axios } from 'configs'
import Cookies from 'js-cookie'

/**
 * @param  {FormData} formData
 */
const createGuild = async (formData) => {
    const token = authentication.getToken()

    const { data, status } = await axios({
        url: 'guild-manager/create-guild',
        method: 'POST',
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    })
    if (status != 200) throw new Error(data.data.message)
    await authentication.refreshUser()

    return data
}

const getGuild = async (id) => {
    const token = authentication.getToken()

    const { data, status } = await axios({
        url: `guilds/${id}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        }
    })
    if (status != 200) throw new Error(data.data.message)

    return data
}

const joinGuild = async (experience, guild, recentGame) => {
    const token = authentication.getToken()

    const { data, status } = await axios({
        url: `guild/${guild}/join`,
        method: 'POST',
        data: { experience, recent_game: recentGame },
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (status != 200) throw new Error(data.data.message)

    Cookies.set('requestJoin', JSON.stringify([...JSON.parse(Cookies.get('requestJoin') ?? '[]'), guild]))
}

const joinGuildAnonnymous = async (name, email, experience, guild, recentGame) => {
    const { data, status } = await axios({
        url: `guild/${guild}/join-anonnymous`,
        method: 'POST',
        data: { name, email, experience, recent_game: recentGame },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })

    if (status != 200) throw new Error(data.data.message)
    Cookies.set('requestJoin', JSON.stringify([...JSON.parse(Cookies.get('requestJoin') ?? '[]'), guild]))
}

const requestJoinApllied = () => {
    const data = Cookies.get('requestJoin')
    if (data == null) return []
    return JSON.parse(data)
}

export {
    createGuild,
    getGuild,
    joinGuild,
    joinGuildAnonnymous,
    requestJoinApllied
}