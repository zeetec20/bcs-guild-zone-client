import authentication from './authentication'
import configs from 'configs'
import Cookies from 'js-cookie'

const { env } = configs

/**
 * @param  {FormData} formData
 */
const createGuild = async (formData) => {
    const token = authentication.getToken()

    const response = await fetch(`${env.domain}/guild-manager/create-guild`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
        },
        body: formData
    })

    const json = await response.json()
    if (response.status != 200) throw new Error(json.data.message)

    return json.data
}

const getGuild = async (id) => {
    const token = authentication.getToken()

    const response = await fetch(`${env.domain}/guilds/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
        }
    })

    const json = await response.json()
    if (response.status != 200) throw new Error(json.data.message)

    return json.data
}

const joinGuild = async (experience, guild, recentGame) => {
    const token = authentication.getToken()

    const response = await fetch(`${env.domain}/guild/${guild}/join`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ experience, recent_game: recentGame })
    })

    const json = await response.json()
    if (response.status != 200) throw new Error(json.data.message)
    Cookies.set('requestJoin', JSON.stringify([...JSON.parse(Cookies.get('requestJoin') ?? '[]'), guild]))

}

const joinGuildAnonnymous = async (name, email, experience, guild, recentGame) => {
    const response = await fetch(`${env.domain}/guild/${guild}/join-anonnymous`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, experience, recent_game: recentGame })
    })

    const json = await response.json()
    if (response.status != 200) throw new Error(json.data.message)
    Cookies.set('requestJoin', JSON.stringify([...JSON.parse(Cookies.get('requestJoin') ?? '[]'), guild]))
}

const requestJoinApllied = () => {
    const data = Cookies.get('requestJoin')
    if (data == null) return []
    return JSON.parse(data)
}

const guild = {
    createGuild,
    getGuild,
    joinGuild,
    joinGuildAnonnymous,
    requestJoinApllied
}

export default guild