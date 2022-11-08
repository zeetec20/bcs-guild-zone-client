import { useQuery, UseQueryOptions } from "react-query"
import { getAllGuilds } from "services/guildzone"

/**
 * @param  {UseQueryOptions} options
 */
const useAllGuilds = (options) => useQuery(
    'all-guilds',
    getAllGuilds,
    {
        select: data => data.data,
        ...options
    }
)

export default useAllGuilds