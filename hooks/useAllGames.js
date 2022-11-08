import { useQuery, UseQueryOptions } from "react-query"
import { getAllGames } from "services/guildzone"

/**
 * @param  {UseQueryOptions} options
 */
const useAllGames = (options) => useQuery(
    'all-games',
    getAllGames,
    {
        select: data => data.data,
        ...options
    }
)

export default useAllGames