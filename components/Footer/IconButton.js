import { chakra } from '@chakra-ui/react'
import configs from 'configs'

const {color} = configs

const IconButton = ({ children }) => {
    return (
        <chakra.div
            border={`1px solid ${color.white}`}
            display='flex'
            justifyContent='center'
            alignItems='center'
            rounded='full'
            h='clamp(30px, 3vw, 40px)'
            w='clamp(30px, 3vw, 40px)'
            cursor='pointer'
        >
            {children}
        </chakra.div>
    )
}

export default IconButton