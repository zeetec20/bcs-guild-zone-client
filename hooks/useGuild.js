import { useQuery, UseQueryOptions } from 'react-query'
import { getGuild } from 'services/guild'

/**
 * @param {string} id
 * @param {UseQueryOptions} options
 */
const useGuild = (id, options) => useQuery(
    ['guild', id],
    () => getGuild(id),
    {
        select: data => data.data,
        ...options,
    }
)

export default useGuild