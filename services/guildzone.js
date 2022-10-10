import configs from "configs"

const { env } = configs

/**
 * @param  {string} name
 * @param  {string} email
 * @param  {string} message
 */
const sendMessage = async (name, email, message) => {
    const response = await fetch(`${env.domain}/send-message`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })

    if (response.status != 200) throw new Error((await response.json()).data.message)
}

const getAllGames = async () => {
    const response = await fetch(`${env.domain}/games`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const json = await response.json()
    if (response.status != 200) throw new Error(json.data.message)

    return json.data
}

const getAllGuilds = async () => {
    const response = await fetch(`${env.domain}/guilds`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const json = await response.json()
    if (response.status != 200) throw new Error(json.data.message)

    return json.data
}

const guildzone = {
    sendMessage,
    getAllGames,
    getAllGuilds
}

export default guildzone