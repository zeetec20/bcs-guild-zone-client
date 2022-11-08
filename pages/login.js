import Navbar from "components/Navbar"
import { chakra, HStack, VStack, Input, Button } from '@chakra-ui/react'
import { color, font } from "configs"
import Footer from "components/Footer"
import Image from 'next/image'
import logoImage from 'assets/images/logo_pink.png'
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import * as auth from 'services/authentication'
import loginValidator from 'helper/validator/loginValidator'
import guildImage from 'assets/images/guild.png'
import { useRouter } from "next/router"
import LoginStyle from 'styles/Login.module.scss'
import useCustomToast from "hooks/useCustomToast"
import useLogin from "hooks/useLogin"

const LoginPage = () => {
    const toast = useCustomToast()
    const router = useRouter()
    const { mutate: login, isLoading } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target))
        loginValidator.validate(data).then(data => {
            login(data, {
                onSuccess: () => {
                    toast('Login', 'Login are successfully', {
                        duration: 3000
                    })
                    router.push('/')
                },
                onError: err => toast('Login failed', err.message, {
                    background: color.red
                })
            })
        }).catch(err => {
            toast('Login failed', err.message, {
                background: color.red
            })
        })
    }

    return (
        <chakra.div>
            <Navbar authNavbar={true} />
            <chakra.div display='flex'>
                <VStack className={LoginStyle['login-section-1']} h='100vh' w='40vw' bg={color.lightPink} justifyContent='center' alignItems='center'>
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
                        Sign In to Guild Zone
                    </chakra.h1>
                    <chakra.p textAlign='center' px='15px'>
                        Earn and get friends from game, you can get in there
                    </chakra.p>

                    <chakra.form
                        onSubmit={handleSubmit}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                    >
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
                            Don&apos;t have a account?&nbsp;
                            <Link href='/register'>
                                <chakra.a fontWeight={900} color={color.pink} cursor='pointer'>Sign Up</chakra.a>
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
                            Login
                        </Button>
                    </chakra.form>
                </VStack>

                <VStack className={LoginStyle['login-section-2']} h='100vh' w='60vw' bg={color.purpleGrey} justifyContent='end' alignItems='start'>
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

export default LoginPage