import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import * as guildService from 'services/guild'
import { Box, Button, chakra, Flex, HStack, Show, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react'
import { color, font, usersGuild } from 'configs'
import backgroundImage from 'assets/images/background_right.png'
import Image from "next/image"
import { MdSpaceDashboard } from 'react-icons/md'
import { useDraggable } from "react-use-draggable-scroll"
import Navbar from "components/Navbar"
import GameGuild from "components/GameGuild"
import Footer from "components/Footer"
import DashboardGuildStyle from 'styles/DashboardGuild.module.scss'
import useGuild from "hooks/useGuild"
import useCustomToast from "hooks/useCustomToast"

const ButtonSidebar = ({ text, icon, isActive }) => {
    return (
        <Button
            bgGradient={isActive ? `linear(to-tr, ${color.lightPurple} 2%, ${color.pink} 30%)` : undefined}
            bg={isActive ? undefined : 'transparent !important'}
            fontFamily={font.inter}
            color={color.white}
            fontWeight={800}
            w='80%'
            minW='200px'
            justifyContent='start'
            alignItems='center'
            fontSize='clamp(14px, 1.1vw, 18px)'
            pl='30px'
            py='27px !important'
            rounded='xl'
            _hover={{
                bgGradient: `linear(to-tr, ${color.lightPurple} 2%, ${color.pink} 30%) !important`
            }}
            _focus={{
                bgGradient: `linear(to-tr, ${color.lightPurple} 2%, ${color.pink} 30%) !important`
            }}
            boxShadow={isActive ? `0px 0px 15px ${color.pink}` : undefined}
        >
            <chakra.div marginRight='10px' w='clamp(20px, 1.8vw, 27px)'>{isActive && icon}</chakra.div> {text}
        </Button>
    )
}

const Player = ({ avatar, name, earningDay }) => {
    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <chakra.div w='110px' h='110px' rounded='full' position='relative' overflow='hidden'>
                <Image src={avatar} layout='fill' objectFit='cover' alt='avatar' />
            </chakra.div>

            <Text
                color={color.pink}
                fontSize='20px'
                fontWeight={900}
                fontFamily={font.inter}
                mt='10px'
            >
                {name}
            </Text>
            <Text
                color={color.white}
                fontSize='13px'
                fontWeight={500}
                fontFamily={font.inter}
            >
                Earn: ${earningDay}/Day
            </Text>
        </Box>
    )
}

const DashboardGuild = () => {
    const router = useRouter()
    const { id } = router.query
    const ref = useRef()
    const { events } = useDraggable(ref)
    const toast = useCustomToast()
    const { data: guild } = useGuild(id, {
        enabled: !!id,
        // enabled: false,
        onError: err => toast('Show guild', err.message, {
            background: color.red
        })
    })

    const textLorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    return (
        <chakra.div>
            <Navbar showLogo={false} />
            <HStack w='full' minH='100vh' bg={color.purple} spacing='0' alignItems='start'>
                <Show breakpoint="(min-width: 1200px)">
                    <Box w='19vw' bg={color.darkBlue} bgImg={backgroundImage.src} bgSize='cover' bgPosition='center' h='full' position='fixed' zIndex='2' >
                        <Box mt='25px' mx='clamp(10px, 1.8vw, 30px)'>
                            <Box
                                w='full'
                                boxShadow={`0px 0px 10px ${color.pink}`}
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                rounded='xl'
                                backdropFilter='blur(3px)'
                                bg={color.darkBlue05}
                            >
                                <chakra.div mt='20px'>
                                    {guild ? (
                                        <chakra.div position='relative' w='80px' h='80px' rounded='xl' overflow='hidden' boxShadow={`0px 0px 15px ${color.darkBlue}`}>
                                            <Image src={guild.logo} layout='fill' objectFit='cover' alt='logo' />
                                        </chakra.div>
                                    ) : (
                                        <Skeleton h='80px' w='80px' rounded='xl' />
                                    )}
                                </chakra.div>

                                <chakra.h1
                                    mt='10px'
                                    color={color.white}
                                    fontSize='20px'
                                    fontWeight={900}
                                    fontFamily={font.inter}
                                    textAlign='center'
                                >
                                    {guild ? guild.name : 'Guild'}
                                </chakra.h1>
                                <Text
                                    mt='15px'
                                    mb='20px'
                                    noOfLines={7}
                                    fontSize='12.5px'
                                    fontWeight={500}
                                    fontFamily={font.inter}
                                    color={color.white}
                                    textAlign='center'
                                    mx='20px'
                                >
                                    {guild ? guild.description : textLorem}
                                </Text>
                            </Box>
                        </Box>

                        <VStack pl='clamp(10px, 1.8vw, 30px)' mt='50px' alignItems='start' w='full' spacing='15px'>
                            <ButtonSidebar text={'Dashboard'} isActive={true} icon={<MdSpaceDashboard size='clamp(20px, 1.8vw, 27px)' />} />
                            <ButtonSidebar text={'Member'} isActive={false} icon={<MdSpaceDashboard size='clamp(20px, 1.8vw, 27px)' />} />
                            <ButtonSidebar text={'Event'} isActive={false} icon={<MdSpaceDashboard size='clamp(20px, 1.8vw, 27px)' />} />
                            <ButtonSidebar text={'Game'} isActive={false} icon={<MdSpaceDashboard size='clamp(20px, 1.8vw, 27px)' />} />
                            <ButtonSidebar text={'Contact'} isActive={false} icon={<MdSpaceDashboard size='clamp(20px, 1.8vw, 27px)' />} />
                        </VStack>
                    </Box>
                </Show>

                <Box className={DashboardGuildStyle['dashboard-page']} w='80vw' minH='100vh' alignItems='start' overflowX='hidden'>
                    <chakra.div mt='100px' w='full' px='50px'>
                        <chakra.h1
                            color={color.white}
                            fontSize='17px'
                            fontWeight={800}
                            fontFamily={font.inter}
                        >
                            Guild Zone - Dashboard
                        </chakra.h1>
                    </chakra.div>

                    <chakra.div w='full' px='50px' mt='20px'>
                        {guild ? (
                            <chakra.div w='full' rounded='3xl' position='relative' h='350px' overflow='hidden' backdropFilter='blur(5px)'>
                                <Image src={guild.banner} layout='fill' objectFit='cover' alt='banner' />
                            </chakra.div>
                        ) : (
                            <Skeleton w='full' rounded='3xl' h='350px' />
                        )}
                    </chakra.div>

                    <Show breakpoint="(max-width: 1200px)">
                        <Flex flexWrap='wrap' px='50px' mt='20px' w='100vw'>
                            <Button
                                fontFamily={font.inter}
                                fontSize='13px'
                                fontWeight={900}
                                color={color.white}
                                bg='transparent'
                                border='1px solid'
                                mt='10px'
                                mr='12px'
                            >
                                Dashboard
                            </Button>
                            <Button
                                fontFamily={font.inter}
                                fontSize='13px'
                                fontWeight={900}
                                color={color.white}
                                bg='transparent'
                                border='1px solid'
                                mt='10px'
                                mr='12px'
                            >
                                Member
                            </Button>
                            <Button
                                fontFamily={font.inter}
                                fontSize='13px'
                                fontWeight={900}
                                color={color.white}
                                bg='transparent'
                                border='1px solid'
                                mt='10px'
                                mr='12px'
                            >
                                Event
                            </Button>
                            <Button
                                fontFamily={font.inter}
                                fontSize='13px'
                                fontWeight={900}
                                color={color.white}
                                bg='transparent'
                                border='1px solid'
                                mt='10px'
                                mr='12px'
                            >
                                Game
                            </Button>
                            <Button
                                fontFamily={font.inter}
                                fontSize='13px'
                                fontWeight={900}
                                color={color.white}
                                bg='transparent'
                                border='1px solid'
                                mt='10px'
                                mr='15px'
                            >
                                Contact
                            </Button>
                        </Flex>
                    </Show>

                    <chakra.h1
                        color={color.pink}
                        fontSize='30px'
                        fontWeight={900}
                        fontFamily={font.inter}
                        mt='50px'
                        mx='50px'
                    >
                        Top Players
                    </chakra.h1>

                    <HStack w='full' spacing='30px' pl='50px' overflow='hidden' mt='15px' {...events} ref={ref}>
                        {
                            usersGuild
                                .sort((a, b) => a.earning - b.earning)
                                .map((player, index) => <Player key={index} name={player.name} earningDay={player.earning} avatar={player.avatar} />)
                                .reverse()
                        }
                    </HStack>

                    <chakra.h1
                        color={color.pink}
                        fontSize='30px'
                        fontWeight={900}
                        fontFamily={font.inter}
                        mt='50px'
                        mx='50px'
                    >
                        Games
                    </chakra.h1>

                    <Flex flexWrap='wrap' mx='50px' mt='20px' mb='50px' justifyContent='space-between'>
                        {(guild?.games ?? Array(4).fill(undefined)).map((game, index) => <GameGuild key={index} game={game} selectAble={false} styles={{mx: '30px'}} />)}
                    </Flex>
                </Box>
            </HStack>
            <chakra.div w='calc(100vw - 19vw)' float='right'>
                <Footer />
            </chakra.div>
        </chakra.div>
    )
}

export default DashboardGuild