import { useMutation, UseMutationOptions } from "react-query"
import { joinGuild } from "services/guild"

/**
 * @param  {UseMutationOptions} options
 */
const useJoinGuild = (options) => useMutation(
    ({ experience, guild, recentGame }) => joinGuild(experience, guild, recentGame),
    { ...options }
)

export default useJoinGuild