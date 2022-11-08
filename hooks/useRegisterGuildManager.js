import { useMutation, UseMutationOptions } from "react-query"
import { registerGuildManager } from "services/authentication"

/**
 * @param  {UseMutationOptions} options
 */
const useRegisterGuildManager = (options) => useMutation(
    ({ email, password }) => registerGuildManager(email, password),
    { ...options }
)

export default useRegisterGuildManager