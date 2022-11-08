import { axios } from "configs"

/**
 * @param  {string} name
 * @param  {string} email
 * @param  {string} message
 */
const sendMessage = async (name, email, message) => {
    const { status, data } = await axios({
        url: 'send-message',
        method: 'POST',
        data: { name, email, message },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (status != 200) throw new Error(data.data.message)
}

const getAllGames = async () => {
    const { status, data } = await axios({
        url: 'games',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (status != 200) throw new Error(data.data.message)
    return data
}

const getAllGuilds = async () => {
    const { status, data } = await axios({
        url: 'guilds',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    if (status != 200) throw new Error(data.data.message)
    return data
}

export {
    sendMessage,
    getAllGames,
    getAllGuilds
}