import { useMutation, UseMutationOptions } from "react-query"
import { joinGuildAnonnymous } from "services/guild"

/**
 * @param  {UseMutationOptions} options
 */
const useJoinGuildAnonnymous = (options) => useMutation(
    ({ name, email, experience, guild, recentGame }) => {
        return joinGuildAnonnymous(name, email, experience, guild, recentGame)
    },
    { ...options }
)

export default useJoinGuildAnonnymous