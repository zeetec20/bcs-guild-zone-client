import { chakra, VStack, SimpleGrid } from '@chakra-ui/react'
import backgroundImage from 'assets/images/background.png'
import robotImage from 'assets/images/robot.png'
import Navbar from 'components/Navbar'
import configs from 'configs'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@chakra-ui/icons'
import cloudDownImage from 'assets/images/cloud_down.png'
import cloudUpImage from 'assets/images/cloud_up.png'
import Guild from 'components/Guild'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import News from 'components/News'
import Footer from 'components/Footer'
import scrollTo from 'helper/scrollTo'
import { useEffect, useRef, useState } from 'react'
import HomeStyle from 'styles/Home.module.scss'
import Link from 'next/link'
import guildzone from 'services/guildzone'

const { color, font } = configs

const HomePage = () => {
    const titleGuild = useRef()
    const [guilds, setGuilds] = useState([])
    const scrollToGuild = () => {
        scrollTo(titleGuild.current.offsetTop - 70)
    }

    useEffect(() => {
        if (!guilds.length) guildzone.getAllGuilds().then(guilds => {
            guilds = guilds.sort((a, b) => a.totalMember - b.totalMember).reverse().filter((guild, index) => index < 8)
            setGuilds(guilds)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <chakra.div
            backgroundColor={color.purple}
            bgImage={backgroundImage.src}
            backgroundRepeat='no-repeat'
            backgroundSize='100%'
            maxW='full'
            position='relative'
            w='full'
            overflowX='hidden'
        >
            <chakra.img src={robotImage.src} left='50vw' objectFit='cover' top='70px' h='clamp(600px, 55vw, 850px)' position='absolute' zIndex='0' />
            <Navbar />

            <VStack
                w='full'
                px='12vw'
                position='relative' zIndex='1'
                alignItems='left'
                h='100vh'
                justifyContent='center'
                className={HomeStyle['home-section-1']}
            >
                <chakra.h1
                    color={color.pink}
                    fontSize='clamp(55px, 6vw, 90px)'
                    fontFamily={font.inter}
                    fontWeight={900}
                    textShadow={`0px 0px 18px ${color.pink}`}
                >
                    GAMING GUILD
                </chakra.h1>
                <chakra.h1
                    color={color.white}
                    fontFamily={font.inter}
                    fontWeight={900}
                    fontSize='clamp(40px, 5vw, 70px)'
                    mt='-20px !important'
                >
                    EASY TO EARN
                </chakra.h1>
                <chakra.h1
                    color={color.white}
                    fontFamily={font.inter}
                    fontWeight={900}
                    fontSize='clamp(40px, 5vw, 70px)'
                    mt='-20px !important'
                >
                    & FREE TO JOIN
                </chakra.h1>
                <chakra.p color={color.white} w='clamp(350px, 34vw, 600px)' fontSize={'clamp(13px, 1.2vw, 20px)'}>
                    Guild Zone is a center where all the prominent gaming guilds
                    gather. A guild is a group of gamers who form a team for
                    purposes of supporting, entertaining, and playing games.
                </chakra.p>

                <Link href='/guild'>
                    <chakra.button
                        bg={color.pink}
                        w='fit-content'
                        fontSize='30px'
                        fontFamily={font.inter}
                        fontWeight={900}
                        color={color.white}
                        paddingInline='20px'
                        rounded='xl'
                        mt='60px !important'
                        py='7px'
                        px='65px'
                        boxShadow={`0px 0px 15px ${color.pink}`}
                        style={{ transition: 'all 0.25s ease-in' }}
                        _hover={{
                            boxShadow: `0px 0px 25px ${color.pink}`,
                        }}
                    >
                        Join Now
                    </chakra.button>
                </Link>
            </VStack>

            <VStack position='absolute' top='calc(100vh - 105px)' w='fit-content' left={0} right={0} ml={'auto'} mr='auto' zIndex='1'>
                <motion.div
                    animate={{ marginTop: '8px' }}
                    transition={{ ease: 'linear', duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
                    style={{
                        position: 'absolute'
                    }}
                    onClick={scrollToGuild}
                >
                    <ChevronDownIcon color={color.white} w='40px' h='40px' cursor='pointer' />
                </motion.div>
                <chakra.h1
                    color={color.white}
                    fontWeight={900}
                    mt='55px !important'
                    fontSize='14px'
                    fontFamily={font.inter}
                    lineHeight='10px'
                    cursor={'pointer'}
                    onClick={scrollToGuild}
                >
                    SCROLL DOWN
                </chakra.h1>
            </VStack>

            <chakra.div position='relative' zIndex={2} ref={titleGuild}>
                <chakra.h1
                    color={color.white}
                    fontFamily={font.inter}
                    fontWeight={900}
                    textAlign='center'
                    fontSize='50px'
                    mt='250px'
                    textShadow={`0px 0px 10px ${color.pink}`}
                    id='title_top_selected_guild'
                >
                    Top Selected Guild
                </chakra.h1>

                <SimpleGrid minChildWidth={'340px'} spacingX='0px' spacingY={'100px'} mt='100px' px='100px' justifyContent='center'>
                    {guilds.map((g, index) => <Guild key={index} guild={g} />)}
                </SimpleGrid>
            </chakra.div>

            <chakra.div position='absolute' top='2000px'>
                <chakra.img src={cloudDownImage.src} />
                <chakra.img src={cloudUpImage.src} />
            </chakra.div>


            <chakra.h1
                color={color.white}
                fontFamily={font.inter}
                fontWeight={900}
                textAlign='center'
                fontSize='50px'
                mt='320px'
                textShadow={`0px 0px 10px ${color.pink}`}
            >
                Latest Guild News
            </chakra.h1>

            <chakra.div mt='77px'>
                <Swiper
                    slidesPerGroup={2}
                    slidesPerView={2}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                        },
                        1100: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                        }
                    }}
                >
                    <SwiperSlide>
                        <News />
                    </SwiperSlide>

                    <SwiperSlide>
                        <News />
                    </SwiperSlide>

                    <SwiperSlide>
                        <News />
                    </SwiperSlide>
                </Swiper>
            </chakra.div>

            <Footer marginTop={'200px'} />
        </chakra.div>
    )
}

export default HomePage