import { Modal, ModalOverlay, ModalContent, Button, chakra, SimpleGrid, Box, Input, VStack, Textarea, useToast } from "@chakra-ui/react"
import { color, font } from 'configs'
import { motion } from "framer-motion"
import Image from 'next/image'
import GameGuild from 'components/GameGuild'
import * as authenticationService from "services/authentication"
import * as guildService from "services/guild"
import { useRef, useState } from "react"
import joinGuildValidator from 'helper/validator/joinGuildValidator'
import ToastCustom from 'components/Toast'
import joinGuildAnonnymousValidator from 'helper/validator/joinGuildAnonnymousValidator'
import useCustomToast from "hooks/useCustomToast"
import useJoinGuild from "hooks/useJoinGuild"
import useJoinGuildAnonnymous from "hooks/useJoinGuildAnonnymous"

const JoinGuild = ({ guild, isOpen, onClose }) => {
    const isAuthenticated = authenticationService.isAuthenticated()
    const [recentGame, setRecentGame] = useState()
    const toast = useCustomToast()
    const { mutate: joinGuild, isLoading: isLoadingGuild } = useJoinGuild()
    const { mutate: joinGuildAnonnymous, isLoading: isLoadingGuildAnon } = useJoinGuildAnonnymous()

    const onSubmit = e => {
        e.preventDefault()

        const validator = isAuthenticated ? joinGuildValidator : joinGuildAnonnymousValidator
        const data = Object.fromEntries(new FormData(e.target))

        validator.validate(data).then(data => {
            console.log(data, { ...data, guild: guild.id, recentGame })
            if (recentGame == undefined) return toast('Join guild', 'recent game must be choosed', {
                background: color.red
            })

            const onSuccess = () => {
                toast('Join guild', 'Your request join was sending')
                onClose()
            }
            const onError = err => {
                toast('Join guild', err.message, {
                    background: color.red
                })
            }

            if (isAuthenticated) joinGuild({ ...data, guild: guild.id, recentGame }, { onSuccess, onError })
            else joinGuildAnonnymous({ ...data, guild: guild.id, recentGame }, { onSuccess, onError })
        }).catch(err => {
            toast('Join guild', err.message, {
                background: color.red
            })
        })
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} size='5xl'>
            <ModalOverlay />
            <ModalContent bg={color.lightPink} rounded='xl'>
                <chakra.form onSubmit={onSubmit} display='flex' alignItems='center' flexDirection='column'>
                    <chakra.div w='full' position='relative' h='300px' rounded='xl' overflow='hidden'>
                        <Image src={guild.banner} layout='fill' objectFit='cover' alt='banner guild' />
                    </chakra.div>
                    <chakra.div
                        rounded='xl'
                        w='110px'
                        h='110px'
                        position='relative'
                        overflow='hidden'
                        marginTop='-50px'
                        boxShadow={`0px 0px 10px ${color.darkBlue}`}
                    >
                        <Image src={guild.logo} layout='fill' objectFit='cover' alt='banner guild' />
                    </chakra.div>

                    <chakra.h1
                        fontFamily={font.inter}
                        fontWeight={900}
                        fontSize='40px'
                        mt='20px'
                        color={color.pink}
                        textShadow={`0px 0px 5px ${color.grey}`}
                    >
                        {guild.name}
                    </chakra.h1>

                    <chakra.h1
                        fontFamily={font.inter}
                        fontWeight={900}
                        fontSize='30px'
                        mt='50px'
                        color={color.pink}
                        textAlign='start'
                        w='full'
                        px='40px'
                    >
                        Your Data
                    </chakra.h1>

                    {!isAuthenticated && (
                        <SimpleGrid w='full' minChildWidth='230px' spacing='20px' px='40px'>
                            <VStack flex='1'>
                                <chakra.h1
                                    mt='12px !important'
                                    w='full'
                                    fontFamily={font.inter}
                                    fontWeight={500}
                                    fontSize='14px'
                                    color={color.purple}
                                >
                                    Name
                                </chakra.h1>
                                <Input
                                    placeholder='Your name...'
                                    name="name"
                                    type='text'
                                    size='lg'
                                    py='27px'
                                    w='full'
                                    borderColor={`${color.pink} !important`}
                                    borderWidth='1.5px'
                                    _focus={{
                                        boxShadow: `0px 0px 0px 1px ${color.pink} !important`,
                                    }}
                                    transition='border-width 0.1s ease'
                                    outline='none'
                                    fontSize='16px'
                                    fontFamily={font.inter}
                                    required={true}
                                    fontWeight={500}
                                    mt='5px'
                                    mb='40px'
                                />
                            </VStack>
                            <VStack flex={1}>
                                <chakra.h1
                                    mt='12px !important'
                                    w='full'
                                    fontFamily={font.inter}
                                    fontWeight={500}
                                    fontSize='14px'
                                    color={color.purple}
                                >
                                    Email
                                </chakra.h1>
                                <Input
                                    placeholder='Your email...'
                                    name="email"
                                    type='email'
                                    size='lg'
                                    py='27px'
                                    w='full'
                                    borderColor={`${color.pink} !important`}
                                    borderWidth='1.5px'
                                    _focus={{
                                        boxShadow: `0px 0px 0px 1px ${color.pink} !important`,
                                    }}
                                    transition='border-width 0.1s ease'
                                    outline='none'
                                    fontSize='16px'
                                    fontFamily={font.inter}
                                    required={true}
                                    fontWeight={500}
                                    mt='5px'
                                    mb='40px'
                                />
                            </VStack>
                        </SimpleGrid>
                    )}

                    <VStack px='40px' w='full' mt={isAuthenticated ? undefined : '10px'}>
                        <chakra.h1
                            mt='12px !important'
                            w='full'
                            fontFamily={font.inter}
                            fontWeight={500}
                            fontSize='14px'
                            color={color.purple}
                        >
                            Describe Your Experience
                        </chakra.h1>
                        <Textarea
                            placeholder='Your experience...'
                            name="experience"
                            type='email'
                            size='lg'
                            py='27px'
                            borderColor={`${color.pink} !important`}
                            borderWidth='1.5px'
                            _focus={{
                                boxShadow: `0px 0px 0px 1px ${color.pink} !important`,
                            }}
                            transition='border-width 0.1s ease'
                            outline='none'
                            fontSize='16px'
                            fontFamily={font.inter}
                            required={true}
                            fontWeight={500}
                            h='150px'
                        />
                    </VStack>


                    <chakra.h1
                        fontFamily={font.inter}
                        fontWeight={900}
                        fontSize='30px'
                        mt='40px'
                        color={color.pink}
                        textAlign='start'
                        w='full'
                        px='40px'
                    >
                        Current Game Played
                    </chakra.h1>
                    <Box w='full' display='flex' flexWrap='wrap' px='20px' mt='20px' mb='50px'>
                        {guild.games.map((game, index) => <GameGuild key={index} game={game} gameSelected={recentGame} onSelect={() => setRecentGame(game.id)} selectAble={true} />)}
                    </Box>

                    <chakra.div
                        px='40px'
                        w='full'
                    >
                        <Button
                            as={motion.button}
                            type='submit'
                            w='full'
                            mt='25px'
                            mb='35px'
                            bg={`${color.pink} !important`}
                            color={color.white}
                            size='lg'
                            py='30px !important'
                            boxShadow={`0px 0px 15px ${color.pink}`}
                            fontSize='18px'
                            fontWeight={900}
                            fontFamily={font.inter}

                            whileTap={{
                                paddingTop: '30px',
                                paddingBottom: '30px',
                                paddingLeft: '40px !important',
                                paddingRight: '40px !important'
                            }}
                            whileHover={{
                                boxShadow: `0px 0px 22px ${color.pink}`
                            }}
                            transition={{ ease: 'ease-in-out', duration: 0.3, repeat: 'none' }}
                            isLoading={isLoadingGuild || isLoadingGuildAnon}
                        >
                            Join Guild
                        </Button>
                    </chakra.div>
                </chakra.form>
            </ModalContent>
        </Modal>
    )
}

export default JoinGuild