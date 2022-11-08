import { useMutation, UseMutationOptions } from "react-query"
import { registerGamer } from "services/authentication"

/**
 * @param  {UseMutationOptions} options
 */
const useRegisterGamer = (options) => useMutation(
    ({ name, email, password }) => {
        return registerGamer(name, email, password)
    },
    { ...options }
)

export default useRegisterGamer