import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Link as LinkChakra,
    useColorModeValue,
    useDisclosure,
    chakra,
    HStack,
    Show,
    Hide,
    VStack,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Divider,
    useToast
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon
} from '@chakra-ui/icons'
import configs from 'configs'
import LogoImage from 'assets/images/logo.png'
import Image from 'next/image';
import ButtonNav from './buttonNav';
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import authentication from 'services/authentication';
import ProfileImage from 'assets/images/profile.png'
import { useRouter } from 'next/router';
import ToastCustom from 'components/Toast'
import Link from 'next/link';

const { color, font } = configs

const Navbar = ({ showLogo = true, authNavbar = false }) => {
    const controlAnimate = useAnimationControls()
    const { isOpen, onToggle } = useDisclosure();
    const user = authentication.user()
    const [isAuthenticated, setIsAuthenticated] = useState()
    const router = useRouter()
    const toast = useToast()
    const toastRef = useRef()

    useEffect(() => {
        setIsAuthenticated(authentication.isAuthenticated)
    }, [])

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'initial'
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            controlAnimate.start({
                height: '100vh',
            })
        } else {
            controlAnimate.start({
                height: '0vh',
            })
        }
    }, [isOpen, controlAnimate])

    const logout = () => {
        authentication.logout()
        setIsAuthenticated(false)

        toastRef.current = toast({
            duration: 3000,
            position: 'top-left',
            render: ToastCustom('Sign Out', 'You are sign out from guild zone', () => toast.close(toastRef.current))
        })
        router.push('/')
    }

    return (
        <>
            <Flex
                color={useColorModeValue('gray.600', 'white')}
                h={'60px'}
                px='50px'
                pt='25px'
                align={'center'}
                m={0}
                position='absolute'
                w='full'
                zIndex='11'
                top={0}
            >
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                    alignItems='center'
                    justifyContent='space-between'
                    h='full'
                >
                    <chakra.div width='60px' height='60px' position='relative'>
                        {!authNavbar && showLogo && (
                            <Link href={'/'}>
                                <Image src={LogoImage} layout='fill' objectFit='cover' alt='logo' />
                            </Link>
                        )}
                    </chakra.div>

                    <Show breakpoint='(min-width: 701px)'>
                        <DesktopNav isAuthenticated={isAuthenticated} authNavbar={authNavbar} user={user} logout={logout} />
                    </Show>
                    <Show breakpoint='(max-width: 700px)'>
                        <chakra.div
                            rounded='full'
                            w='38px'
                            h='38px'
                            border={`1.5px solid ${authNavbar ? color.darkBlue : color.white}`}
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            onClick={onToggle}
                            cursor='pointer'
                        >
                            {isOpen ?
                                <CloseIcon w='12px' h='12px' color={authNavbar ? color.darkBlue : color.white} /> :
                                <HamburgerIcon color={authNavbar ? color.darkBlue : color.white} w='15px' h='15px' />
                            }
                        </chakra.div>
                    </Show>
                </Flex>
            </Flex>

            <Show breakpoint='(max-width: 700px)'>
                <motion.div
                    animate={controlAnimate}
                    style={{
                        width: '100vw',
                        height: 0,
                        overflow: 'hidden',
                        position: 'absolute',
                        transition: 'all 0.5s ease',
                        zIndex: '10',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <MobileNav authNavbar={authNavbar} isAuthenticated={isAuthenticated} user={user} />
                </motion.div>
            </Show>
        </>
    )
}

const ButtonGuild = ({ user }) => {
    return (
        <>
            {user.type == 'GUILD_MANAGER' && !user.isHaveGuild && (
                <Link href='/create-guild'>
                    <Button
                        mt='20px'
                        mb='5px'
                        bg={`${color.pink} !important`}
                        fontFamily={font.inter}
                        color={color.white}
                        fontWeight={700}
                        w='full'
                        boxShadow={`0px 0px 10px ${color.pink}`}
                    >
                        Create Guild
                    </Button>
                </Link>
            )}
            {user.type == 'GUILD_MANAGER' && user.isHaveGuild && (
                <Link href={`/guild/${user.guild}`}>
                    <Button
                        mt='20px'
                        mb='5px'
                        bg={`${color.pink} !important`}
                        fontFamily={font.inter}
                        color={color.white}
                        fontWeight={700}
                        w='full'
                        boxShadow={`0px 0px 10px ${color.pink}`}
                    >
                        Open Guild
                    </Button>
                </Link>
            )}
        </>
    )
}

const DesktopNav = ({ authNavbar, isAuthenticated, user, logout }) => {
    return (
        <Stack direction={'row'} alignItems='center' spacing='15px'>
            <ButtonNav text={'Home'} link={'/'} authNavbar={authNavbar} />
            <ButtonNav text={'Guild'} link={'/guild'} authNavbar={authNavbar} />
            <ButtonNav text={'Contact'} link={'/contact'} authNavbar={authNavbar} />

            {isAuthenticated && (
                <Popover>
                    <PopoverTrigger>
                        <chakra.div
                            ml='40px !important'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            bg={color.pink}
                            rounded='2xl'
                            py='13px'
                            px='15px'
                            boxShadow={`0px 0px 15px ${color.pink}`}
                            cursor='pointer'
                        >
                            <Image src={ProfileImage} width='30px' height='30px' objectFit='cover' alt='profile' />
                        </chakra.div>
                    </PopoverTrigger>

                    <PopoverContent mt='10px' mr='50px' w='230px' bg={color.white} rounded='2xl' boxShadow={`0px 0px 15px ${color.black}`} borderColor={color.white}>
                        <PopoverBody>
                            {
                                user.type == 'GAMER' && (
                                    <>
                                        <chakra.h1
                                            fontSize={'18px'}
                                            fontFamily={font.inter}
                                            fontWeight={900}
                                            mt='10px'
                                            color={color.purple}
                                        >
                                            {user.name}
                                        </chakra.h1>
                                        <chakra.h1
                                            fontSize={'15px'}
                                            fontFamily={font.inter}
                                            fontWeight={500}
                                            color={color.purple}
                                        >
                                            {user.email}
                                        </chakra.h1>
                                    </>
                                )
                            }
                            {
                                user.type == 'GUILD_MANAGER' && (
                                    <>
                                        <chakra.h1
                                            fontSize={'18px'}
                                            fontFamily={font.inter}
                                            fontWeight={900}
                                            mt='10px'
                                            color={color.purple}
                                        >
                                            {user.email.split('@')[0]}
                                        </chakra.h1>
                                        <chakra.h1
                                            fontSize={'15px'}
                                            fontFamily={font.inter}
                                            fontWeight={500}
                                            color={color.purple}
                                        >
                                            {user.email}
                                        </chakra.h1>
                                    </>
                                )
                            }

                            <Divider mt='10px' />

                            <ButtonGuild user={user} />

                            <Button
                                mt={user.type == 'GUILD_MANAGER' ? '10px' : '20px'}
                                mb='5px'
                                bg={`${color.red} !important`}
                                fontFamily={font.inter}
                                color={color.white}
                                fontWeight={700}
                                w='full'
                                boxShadow={`0px 0px 10px ${color.red}`}
                                onClick={() => logout()}
                            >
                                Sign Out
                            </Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            )}

            {!authNavbar && !isAuthenticated && (
                <chakra.div rounded='2xl' boxShadow={`0px 0px 15px ${color.pink}`} bg={color.pink} w='165px' h='45px' position='relative' overflow='hidden' ml='40px !important'>
                    <HStack justifyContent={'space-between'} h='full' w='full'>
                        <Box display='flex' h='full' flex='1' alignItems='center' justifyContent={'center'}>
                            <ButtonNav text={'Sign In'} link={'/login'} authNavbar={authNavbar} />
                        </Box>
                        <Box bg={color.darkBlue} h='full' flex='1.1' display='flex' justifyContent={'center'} alignItems='center' roundedLeft='2xl' boxShadow={`0px 0px 10px ${color.darkBlue}`}>
                            <ButtonNav text={'Sign Up'} link={'/register'} authNavbar={authNavbar} />
                        </Box>
                    </HStack>
                </chakra.div>
            )}
        </Stack>
    );
};

const MobileNav = ({ authNavbar, user, isAuthenticated }) => {
    return (
        <VStack alignItems='center' mt='110px' px='25px'>
            <ButtonNav.mobile text={'Home'} link={'/'} size={'30px'} color={authNavbar ? color.darkBlue : color.white} />
            <ButtonNav.mobile text={'Guild'} link={'/guild'} size={'30px'} color={authNavbar ? color.darkBlue : color.white} />
            <ButtonNav.mobile text={'Contact'} link={'/contact'} size={'30px'} color={authNavbar ? color.darkBlue : color.white} />

            {!authNavbar && !isAuthenticated && (
                <>
                    <ButtonNav.mobile text={'Sign In'} link={'/login'} size={'30px'} color={authNavbar ? color.darkBlue : color.white} />
                    <ButtonNav.mobile text={'Sign Up'} link={'/register'} size={'30px'} color={authNavbar ? color.darkBlue : color.white} />
                </>
            )}
        </VStack>
    );
};

export default Navbar