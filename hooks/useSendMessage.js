import { useMutation, UseMutationOptions } from "react-query"
import { sendMessage } from "services/guildzone"

/**
 * @param  {UseMutationOptions} options
 */
const useSendMessage = (options) => useMutation(
    ({ name, email, message }) => {
        return sendMessage(name, email, message)
    },
    { ...options }
)

export default useSendMessage