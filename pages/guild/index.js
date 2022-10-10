import Navbar from "components/Navbar"
import { Box, chakra, HStack, Input, SimpleGrid, VStack, Textarea, Button, useToast } from '@chakra-ui/react'
import Footer from "components/Footer"
import configs from "configs"
import { FaDiscord, FaFacebook, FaInstagram, FaMedium } from "react-icons/fa"
import backgroundImage from 'assets/images/background.png'
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import sendMessageValidator from 'helper/validator/sendMessageValidator'
import guildzone from "services/guildzone"
import ToastCustom from 'components/Toast'
import Guild from "components/Guild"

const { font, color } = configs

const GuildPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const toastRef = useRef()
    const [guilds, setGuilds] = useState([])

    useEffect(() => {
        if (!guilds.length) guildzone.getAllGuilds().then(guilds => setGuilds(guilds))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()


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
                    Guilds
                </chakra.h1>

                {
                    guilds.length ? (
                        <SimpleGrid minChildWidth='330px' w='full' mt='100px' px='50px'>
                            {guilds.map((g, index) => <Guild guild={g} key={index} />)}
                        </SimpleGrid>
                    ) : (
                        <chakra.h1
                            color={color.white}
                            fontFamily={font.inter}
                            fontSize='20px'
                            fontWeight={900}
                            mt='20vh'
                            mb='50vh'
                        >
                            Content Loading...
                        </chakra.h1>
                    )
                }

                <Footer marginTop={'200px'} />
            </chakra.div>
        </chakra.div>
    )
}

export default GuildPage