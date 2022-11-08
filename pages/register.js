import Navbar from "components/Navbar"
import { chakra, HStack, VStack, Input, Button, ButtonGroup } from '@chakra-ui/react'
import { color, font } from "configs"
import Footer from "components/Footer"
import Image from 'next/image'
import logoImage from 'assets/images/logo_pink.png'
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import guildImage from 'assets/images/guild.png'
import { useRouter } from "next/router"
import RegisterStyle from 'styles/Register.module.scss'
import registerGamerValidator from 'helper/validator/registerGamerValidator'
import registerGuildManagerValidator from 'helper/validator/registerGuildManagerValidator'
import useRegisterGamer from "hooks/useRegisterGamer"
import useRegisterGuildManager from "hooks/useRegisterGuildManager"
import useCustomToast from "hooks/useCustomToast"

const RegisterPage = () => {
    const [mode, setMode] = useState('GAMER')
    const router = useRouter()
    const isGamer = mode == 'GAMER'
    const isGuildManager = mode == 'GUILD_MANAGER'
    const form = useRef()
    const { mutate: registerGamer, isLoading: isLoadingGamer } = useRegisterGamer()
    const { mutate: registerGuildManager, isLoading: isLoadingGuildmanager } = useRegisterGuildManager()
    const isLoading = isLoadingGamer || isLoadingGuildmanager
    const toast = useCustomToast()

    const setForm = mode => {
        if (!isLoading) setMode(mode)
    }

    useEffect(() => {
        form.current.reset()
    }, [mode])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        const validator = isGamer ? registerGamerValidator : registerGuildManagerValidator

        validator.validate(data)
            .then(() => {
                const onSuccess = () => {
                    e.target.reset()
                    toast('Register', 'Your account was created')
                    setTimeout(() => router.push('/login'), 3000)
                }
                const onError = err => {
                    toast('Register failed', err.message, {
                        background: color.red
                    })
                }

                if (isGamer) registerGamer(data, {
                    onSuccess,
                    onError
                })
                if (isGuildManager) registerGuildManager(data, {
                    onSuccess,
                    onError
                })
            }).catch(err => {
                toast('Register failed', err.message, {
                    background: color.red
                })
            })
    }

    return (
        <chakra.div>
            <Navbar authNavbar={true} />
            <chakra.div display='flex'>
                <VStack className={RegisterStyle['register-section-1']} h='100vh' w='40vw' bg={color.lightPink} justifyContent='center' alignItems='center'>
                    <chakra.div mt='-50px'>
                        <Image src={logoImage} alt='logo' objectFit='cover' width='80px' height='80px' />
                    </chakra.div>

                    <chakra.h1
                        color={color.darkBlue}
                        fontFamily={font.inter}
                        fontWeight={900}
                        fontSize='clamp(25px, 2.5vw, 35px)'
                        px='15px'
                        textAlign='center'
                    >
                        Sign Up to Guild Zone
                    </chakra.h1>
                    <chakra.p textAlign='center' px='15px'>
                        Earn and get friends from game, you can get in there
                    </chakra.p>

                    <chakra.form
                        onSubmit={handleSubmit}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        ref={form}
                    >
                        <ButtonGroup
                            size='lg'
                            isAttached
                            w='full'
                            mt='30px'
                            mb='5px'
                            boxShadow={`0px 0px 5px ${color.pink}`}
                            rounded='lg'
                        >
                            <Button
                                w='full'
                                bg={isGamer ? `${color.pink} !important` : 'transparent !important'}
                                variant={isGamer ? undefined : 'outline'}
                                borderColor={color.pink}
                                fontFamily={font.inter}
                                color={isGamer ? color.white : color.darkBlue}
                                onClick={() => setForm('GAMER')}
                            >
                                Gamer
                            </Button>
                            <Button
                                w='full'
                                bg={isGuildManager ? `${color.pink} !important` : 'transparent !important'}
                                variant={isGuildManager ? undefined : 'outline'}
                                borderColor={color.pink}
                                fontFamily={font.inter}
                                color={isGuildManager ? color.white : color.darkBlue}
                                onClick={() => setForm('GUILD_MANAGER')}
                            >
                                Guild Manager
                            </Button>
                        </ButtonGroup>
                        {isGamer && (
                            <Input
                                placeholder='Name'
                                name="name"
                                type='text'
                                size='lg'
                                py='27px'
                                w='clamp(300px, 30vw, 500px)'
                                borderColor={`${color.pink} !important`}
                                borderWidth='1.5px'
                                _focus={{
                                    boxShadow: `0px 0px 0px 1px ${color.pink} !important`,
                                }}
                                transition='border-width 0.1s ease, 0.5s linear'
                                outline='none'
                                mt='20px'
                                fontSize='16px'
                                fontFamily={font.inter}
                                required={true}
                                fontWeight={500}
                            />
                        )}
                        <Input
                            placeholder='Email'
                            name="email"
                            type='email'
                            size='lg'
                            py='27px'
                            w='clamp(300px, 30vw, 500px)'
                            borderColor={`${color.pink} !important`}
                            borderWidth='1.5px'
                            _focus={{
                                boxShadow: `0px 0px 0px 1px ${color.pink} !important`,
                            }}
                            transition='border-width 0.1s ease'
                            outline='none'
                            mt='20px'
                            fontSize='16px'
                            fontFamily={font.inter}
                            required={true}
                            fontWeight={500}
                        />
                        <Input
                            placeholder='Password'
                            name="password"
                            type='password'
                            size='lg'
                            py='27px'
                            w='clamp(300px, 30vw, 500px)'
                            borderColor={`${color.pink} !important`}
                            borderWidth='1.5px'
                            _focus={{
                                boxShadow: `0px 0px 0px 1px ${color.pink} !important`,
                            }}
                            transition='border-width 0.1s ease'
                            outline='none'
                            mt='20px'
                            fontSize='16px'
                            fontFamily={font.inter}
                            required={true}
                            fontWeight={500}
                        />

                        <chakra.p
                            color={color.darkBlue}
                            fontFamily={font.inter}
                            fontSize='13px'
                            fontWeight={500}
                            mt='10px'
                            w='clamp(300px, 30vw, 500px)'
                        >
                            Already have account?&nbsp;
                            <Link href='/login'>
                                <chakra.a fontWeight={900} color={color.pink} cursor='pointer'>Sign In</chakra.a>
                            </Link>
                        </chakra.p>

                        <Button
                            as={motion.button}
                            type='submit'
                            w='clamp(300px, 30vw, 500px)'
                            mt='40px'
                            bg={`${color.pink} !important`}
                            color={color.white}
                            size='lg'
                            py='28px'
                            boxShadow={`0px 0px 15px ${color.pink}`}
                            fontSize='20px'
                            fontWeight={900}
                            fontFamily={font.inter}
                            whileTap={!isLoading ? {
                                paddingTop: '30px',
                                paddingBottom: '30px',
                                paddingLeft: '40px !important',
                                paddingRight: '40px !important'
                            } : undefined}
                            whileHover={!isLoading ? {
                                boxShadow: `0px 0px 22px ${color.pink}`
                            } : undefined}
                            transition={{ ease: 'ease-in-out', duration: 0.3, repeat: 'none' }}
                            isLoading={isLoading}
                        >
                            Register
                        </Button>
                    </chakra.form>
                </VStack>

                <VStack className={RegisterStyle['register-section-2']} h='100vh' w='60vw' bg={color.purpleGrey} justifyContent='end' alignItems='start'>
                    <chakra.h1
                        fontFamily={font.inter}
                        color={color.pink}
                        fontSize='clamp(50px, 4vw, 70px)'
                        fontWeight={900}
                        textShadow={`0px 0px 18px ${color.pink}`}
                        ml='50px'
                    >
                        Let&apos;s Growth With <br />Guild Zone
                    </chakra.h1>
                    <chakra.p
                        color={color.pink}
                        fontFamily={font.inter}
                        fontSize='15px'
                        fontWeight={500}
                        ml='50px !important'
                        mb='60px !important'
                    >
                        Guild Zone have many guild comunity game and schollar to prepare your career game.
                    </chakra.p>

                    <HStack justifyContent='end' w='full'>
                        <chakra.img h='clamp(300px, 35vw, 500px)' src={guildImage.src} />
                    </HStack>
                </VStack>
            </chakra.div>
            <Footer />
        </chakra.div>
    )
}

export default RegisterPage