import { Box, HStack, chakra } from "@chakra-ui/react"
import { IoMdClose } from "react-icons/io"
import { RiErrorWarningFill } from "react-icons/ri"
import configs from 'configs'

const { color, font } = configs
/**
 * @param  {string} title
 * @param  {string} description
 * @param  {function} close
 * @param  {string} background=color.lightPurple
 * @param  {string} colorText=color.white
 */
const toast = (title, description, close, background = color.lightPurple, colorText = color.white) => {
    const toast = () => {
        return (
            <Box
                rounded='xl'
                bg={background}
                py='12px'
                px='10px'
                w='fit-content'
                ml='5px'
                mt='5px'
                display='flex'
                overflow='hidden'
            >
                <chakra.div display='flex' alignItems='start'>
                    <chakra.div ml='5px' mr='10px'>
                        <RiErrorWarningFill size='20px' color={colorText} />
                    </chakra.div>
                    <chakra.div>
                        <chakra.h1
                            color={colorText}
                            fontFamily={font.inter}
                            fontWeight={700}
                            fontSize='16px'
                        >
                            {title}
                        </chakra.h1>
                        <chakra.h1
                            color={colorText}
                            fontFamily={font.inter}
                            fontSize='15px'
                            fontWeight={500}
                        >
                            {description}
                        </chakra.h1>
                    </chakra.div>
                    <chakra.div cursor='pointer' onClick={() => close()} >
                        <IoMdClose size='18px' color={colorText} />
                    </chakra.div>
                </chakra.div>
            </Box>
        )
    }

    return toast
}

export default toast