import { Link as LinkChakra } from '@chakra-ui/react'
import configs from 'configs'
import Link from 'next/link'
import NavbarStyle from 'styles/Navbar.module.scss'

const { color, font } = configs

const ButtonNav = ({ text, size, link, authNavbar }) => {
    return (
        <Link href={link}>
            <LinkChakra
                color={color.white}
                className={authNavbar ? NavbarStyle['navbar-mobile-desktop-button'] : undefined}
                p={2}
                fontSize={size}
                fontWeight='black'
                fontFamily={font.inter}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                {text}
            </LinkChakra>
        </Link>
    )
}

ButtonNav.mobile = ({ text, size, link, color }) => {
    return (
        <Link href={link}>
            <LinkChakra
                color={color}
                p={2}
                fontSize={size}
                fontWeight='black'
                fontFamily={font.inter}
                mt='15px'
                _hover={{
                    textDecoration: 'none',
                    transform: 'scale(1.2)'
                }}
            >
                {text}
            </LinkChakra>
        </Link>
    )
}

export default ButtonNav