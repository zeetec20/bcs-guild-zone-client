import { chakra, HStack, Show, Stack } from '@chakra-ui/react'
import logoImage from 'assets/images/logo.png'
import Image from 'next/image'
import { FaDiscord, FaMedium, FaFacebook, FaInstagram } from 'react-icons/fa'
import { color, font } from 'configs'
import Link from 'next/link'
import IconButton from './IconButton'
import FoooterStyle from 'styles/Footer.module.scss'

const Footer = ({ marginTop }) => {
    return (
        <chakra.div
            w='full'
            bg={color.darkBlue}
            h='150px'
            display={'flex'}
            alignItems='center'
            justifyContent='space-between'
            mt={marginTop}
            px='clamp(10px, 5vw, 70px)'
        >
            <Show breakpoint='(min-width: 750px)'>
                <chakra.div display='flex' flex='1'>
                    <chakra.div position='relative' h='70px' w='70px'>
                        <Image src={logoImage} layout='fill' objectFit='cover' alt='' />
                    </chakra.div>
                </chakra.div>
            </Show>

            <Stack className={FoooterStyle['footer-text-link']} direction={'row'} spacing='30px' flex='1' justifyContent='center'>
                <Link href='#'>
                    <chakra.a
                        color={color.grey}
                        fontFamily={font.inter}
                        fontSize='15px'
                        cursor='pointer'
                        _hover={{
                            textDecoration: 'underline'
                        }}
                    >
                        Privacy Policy
                    </chakra.a>
                </Link>
                <Link href='#'>
                    <chakra.a
                        color={color.grey}
                        fontFamily={font.inter}
                        fontSize='15px'
                        cursor='pointer'
                        _hover={{
                            textDecoration: 'underline'
                        }}
                    >
                        Terms of Service
                    </chakra.a>
                </Link>
            </Stack>

            <HStack flex='1' justifyContent='right' spacing='15px'>
                <IconButton>
                    <FaDiscord color={color.white} size='20px' />
                </IconButton>

                <IconButton>
                    <FaMedium color={color.white} size='20px' />
                </IconButton>

                <IconButton>
                    <FaFacebook color={color.white} size='20px' />
                </IconButton>

                <IconButton>
                    <FaInstagram color={color.white} size='20px' />
                </IconButton>
            </HStack>
        </chakra.div>
    )
}

export default Footer