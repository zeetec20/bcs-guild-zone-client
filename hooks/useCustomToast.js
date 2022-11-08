import { useToast, ToastPosition, background } from "@chakra-ui/react"
import ToastCustom from "components/Toast"
import { color } from "configs"

const useCustomToast = () => {
    const toast = useToast()

    /**
     * @param  {string} title
     * @param  {string} description
     * @param  {{background: string, colorText: string, duration: number, position: ToastPosition}} options
     */
    function newInstance(title, description, options) {
        options = { background: color.lightPurple, colorText: color.white, duration: 5000, position: 'top-left', ...options }
        console.log(title, description, options)

        const id = toast({
            duration: options.duration,
            position: options.position,
            render: () => <ToastCustom id={id} title={title} description={description} background={options.background} colorText={options.colorText} />
        })
    }

    return newInstance
}

export default useCustomToast