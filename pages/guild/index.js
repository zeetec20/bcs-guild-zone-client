import Navbar from "components/Navbar"
import { chakra, SimpleGrid } from '@chakra-ui/react'
import Footer from "components/Footer"
import { font, color } from "configs"
import backgroundImage from 'assets/images/background.png'
import Guild from "components/Guild"
import useAllGuilds from "hooks/useAllGuilds"
import useCustomToast from "hooks/useCustomToast"

const GuildPage = () => {
    const toast = useCustomToast()
    const { data: guilds } = useAllGuilds({
        onError: err => toast('Show guilds', err.message, {
            background: color.red
        })
    })

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
                    <SimpleGrid minChildWidth='330px' w='full' mt='100px' px='50px'>
                        {(guilds ?? Array(8).fill(undefined)).map((g, index) => <Guild guild={g} key={index} />)}
                    </SimpleGrid>
                }

                <Footer marginTop={'200px'} />
            </chakra.div>
        </chakra.div>
    )
}

export default GuildPage