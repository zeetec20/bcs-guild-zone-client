import { useMutation, UseMutationOptions } from "react-query"
import { login } from "services/authentication"

/**
 * @param  {UseMutationOptions} options
 */
const useLogin = (options) => useMutation(
    ({ email, password }) => login(email, password),
    { ...options }
)

export default useLogin