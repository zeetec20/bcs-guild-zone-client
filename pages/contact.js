import Navbar from "components/Navbar"
import { Box, chakra, Input, SimpleGrid, VStack, Textarea, Button } from '@chakra-ui/react'
import Footer from "components/Footer"
import { color, font } from "configs"
import { FaDiscord, FaFacebook, FaInstagram, FaMedium } from "react-icons/fa"
import backgroundImage from 'assets/images/background.png'
import { motion } from "framer-motion"
import { useRef } from "react"
import ContactStyle from 'styles/Contact.module.scss'
import sendMessageValidator from 'helper/validator/sendMessageValidator'
import useSendMessage from "hooks/useSendMessage"
import useCustomToast from "hooks/useCustomToast"

const ContactPage = () => {
    const toast = useCustomToast()
    const { mutate: sendMessage, isLoading } = useSendMessage()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target))
        if (!isLoading) sendMessageValidator.validate(data).then(() => {
            sendMessage({
                name: data.name,
                email: data.email,
                message: data.message
            }, {
                onSuccess: () => {
                    e.target.reset()
                    toast('Send message', 'Message was sending to guild zone')
                },
                onError: err => {
                    toast('Send failed', err.message, {
                        background: color.red
                    })
                }
            })
        }).catch(err => {
            toast('Send failed', err.message, {
                background: color.red
            })
        })
    }

    return (
        <chakra.div
            backgroundColor={color.purple}
            backgroundRepeat='no-repeat'
            backgroundSize='100%'
            maxW='full'
            position='relative'
            w='full'
            overflowX='hidden'
            minH='100vh'
            bgImage={backgroundImage.src}
        >
            <chakra.div
                w='full'
                alignItems='center'
                display='flex'
                flexDirection='column'
                backdropFilter='blur(5.5px)'
            >
                <Navbar />
                <chakra.h1
                    color={color.pink}
                    fontFamily={font.inter}
                    fontSize='70px'
                    fontWeight={900}
                    textShadow={`0px 0px 15px ${color.pink}`}
                    textAlign='center'
                    mt='130px'
                >
                    Contact
                </chakra.h1>
                <chakra.p
                    w='50vw'
                    color={color.white}
                    textAlign='center'
                    fontFamily={font.inter}
                    fontSize='15px'
                    fontWeight={500}
                    className={ContactStyle['contact-description']}
                >
                    Guild Zone is an place gather for guild game blockchain, we have goal to make cyptocurrency make bigger by way of contribution in section gaming. Thus, if you have any questions, ideas or suggestions, don&apos;t hesitate to reach out!
                </chakra.p>

                <SimpleGrid minChildWidth='400px' w='full' mt='100px' px='clamp(50px, 12vw, 200px)' justifyContent='center'>
                    <Box
                        w='clamp(480px, 37vw, 600px)'
                        className={ContactStyle['contact-social-media']}
                    >
                        <chakra.h1
                            color={color.pink}
                            fontSize='35px'
                            fontFamily={font.inter}
                            fontWeight={900}
                            textShadow={`0px 0px 6px ${color.pink}`}
                        >
                            Messages
                        </chakra.h1>

                        <chakra.p
                            w='50vw'
                            color={color.white}
                            fontFamily={font.inter}
                            fontSize='14px'
                            fontWeight={500}
                        >
                            You can send message in there
                        </chakra.p>

                        <chakra.form onSubmit={handleSubmit}>
                            <SimpleGrid minChildWidth='240px' w='full' alignItems='center' spacing='20px'>
                                <Input
                                    placeholder='Name'
                                    name="name"
                                    type='text'
                                    size='lg'
                                    py='27px'
                                    flex='1'
                                    borderColor={`${color.pink} !important`}
                                    borderWidth='1.5px'
                                    color={`${color.white} !important`}
                                    _placeholder={{
                                        color: `${color.grey} !important`
                                    }}
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
                                    placeholder='Email'
                                    name="email"
                                    type='email'
                                    size='lg'
                                    py='27px'
                                    flex='1'
                                    borderColor={`${color.pink} !important`}
                                    borderWidth='1.5px'
                                    color={`${color.white} !important`}
                                    _placeholder={{
                                        color: `${color.grey} !important`
                                    }}
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
                                    className={ContactStyle['contact-message-input2']}
                                />
                            </SimpleGrid>
                            <Textarea
                                placeholder='Message...'
                                name="message"
                                type='email'
                                size='lg'
                                py='27px'
                                flex='1'
                                borderColor={`${color.pink} !important`}
                                borderWidth='1.5px'
                                color={`${color.white} !important`}
                                _placeholder={{
                                    color: `${color.grey} !important`
                                }}
                                _focus={{
                                    boxShadow: `0px 0px 0px 1px ${color.pink} !important`,
                                }}
                                transition='border-width 0.1s ease'
                                outline='none'
                                mt='20px !important'
                                fontSize='16px'
                                fontFamily={font.inter}
                                required={true}
                                fontWeight={500}
                                h='150px !important'
                            />
                            <Button
                                type='submit'
                                as={motion.button}
                                mt='20px'
                                bg={`${color.pink} !important`}
                                color={color.white}
                                size='lg'
                                py='20px'
                                px='clamp(50px, 6vw, 80px)'
                                boxShadow={`0px 0px 10px ${color.pink}`}
                                fontSize='20px'
                                fontWeight={900}
                                fontFamily={font.inter}
                                whileHover={!isLoading ? {
                                    boxShadow: `0px 0px 18px ${color.pink}`
                                } : undefined}
                                transition={{ ease: 'ease-in-out', duration: 0.3, repeat: 'none' }}
                                className={ContactStyle['contact-button-send-message']}
                                isLoading={isLoading}
                            >
                                Send Message
                            </Button>
                        </chakra.form>
                    </Box>
                    <Box
                        w='clamp(230px, 18vw, 300px)'
                        placeSelf='start end'
                        className={ContactStyle['contact-social-media']}
                    >
                        <chakra.h1
                            color={color.pink}
                            fontSize='35px'
                            fontFamily={font.inter}
                            fontWeight={900}
                            textShadow={`0px 0px 6px ${color.pink}`}
                        >
                            Social Media
                        </chakra.h1>

                        <chakra.p
                            w='full'
                            color={color.white}
                            fontFamily={font.inter}
                            fontSize='14px'
                            fontWeight={500}
                        >
                            You can meet Guild Zone in there
                        </chakra.p>

                        <VStack alignItems='start' mt='30px'>
                            <chakra.div display='flex' alignItems='center' cursor='pointer'>
                                <chakra.div
                                    bg={color.pink}
                                    rounded='2xl'
                                    w='55px'
                                    h='50px'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    mr='15px'
                                    boxShadow={`0px 0px 15px ${color.pink}`}
                                >
                                    <FaFacebook color='white' size='30px' />
                                </chakra.div>

                                <chakra.h1
                                    color={color.white}
                                    fontFamily={font.inter}
                                    fontSize='20px'
                                    fontWeight={900}
                                >
                                    Facebook
                                </chakra.h1>
                            </chakra.div>
                            <chakra.div display='flex' alignItems='center' mt='20px !important' cursor='pointer'>
                                <chakra.div
                                    bg={color.pink}
                                    rounded='2xl'
                                    w='55px'
                                    h='50px'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    mr='15px'
                                    boxShadow={`0px 0px 15px ${color.pink}`}
                                >
                                    <FaInstagram color='white' size='30px' />
                                </chakra.div>

                                <chakra.h1
                                    color={color.white}
                                    fontFamily={font.inter}
                                    fontSize='20px'
                                    fontWeight={900}
                                >
                                    Instagram
                                </chakra.h1>
                            </chakra.div>
                            <chakra.div display='flex' alignItems='center' mt='20px !important' cursor='pointer'>
                                <chakra.div
                                    bg={color.pink}
                                    rounded='2xl'
                                    w='55px'
                                    h='50px'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    mr='15px'
                                    boxShadow={`0px 0px 15px ${color.pink}`}
                                >
                                    <FaMedium color='white' size='30px' />
                                </chakra.div>

                                <chakra.h1
                                    color={color.white}
                                    fontFamily={font.inter}
                                    fontSize='20px'
                                    fontWeight={900}
                                >
                                    Medium
                                </chakra.h1>
                            </chakra.div>
                            <chakra.div display='flex' alignItems='center' mt='20px !important' cursor='pointer'>
                                <chakra.div
                                    bg={color.pink}
                                    rounded='2xl'
                                    w='55px'
                                    h='50px'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    mr='15px'
                                    boxShadow={`0px 0px 15px ${color.pink}`}
                                >
                                    <FaDiscord color='white' size='30px' />
                                </chakra.div>

                                <chakra.h1
                                    color={color.white}
                                    fontFamily={font.inter}
                                    fontSize='20px'
                                    fontWeight={900}
                                >
                                    Discord
                                </chakra.h1>
                            </chakra.div>
                        </VStack>
                    </Box>
                </SimpleGrid>

                <Footer marginTop={'200px'} />
            </chakra.div>
        </chakra.div>
    )
}

export default ContactPage