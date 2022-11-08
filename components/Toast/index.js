import { Box, HStack, chakra, useToast, VStack } from "@chakra-ui/react"
import { IoMdClose } from "react-icons/io"
import { RiErrorWarningFill } from "react-icons/ri"
import { color, font } from 'configs'

/**
 * @param  {string} title
 * @param  {string} description
 * @param  {function} close
 * @param  {string} background=color.lightPurple
 * @param  {string} colorText=color.white
 */
const Toast = ({ id, title, description, background = color.lightPurple, colorText = color.white }) => {
    const toast = useToast()

    return (
        <Box
            rounded='xl'
            bg={background}
            py='12px'
            px='10px'
            w='fit-content'
            minW='250px'
            ml='5px'
            mt='5px'
            display='flex'
            overflow='hidden'
        >
            <HStack justifyContent='space-between' alignItems='start' w='full'>
                <chakra.div display='flex'>
                    <chakra.div ml='5px' mr='10px' mt='2px'>
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
                </chakra.div>
                <chakra.div cursor='pointer' onClick={() => toast.close(id)} >
                    <IoMdClose size='18px' color={colorText} />
                </chakra.div>
            </HStack>
        </Box>
    )
}

export default Toast