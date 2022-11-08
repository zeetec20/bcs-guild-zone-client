import { Modal, ModalOverlay, ModalContent, Button, chakra, Box } from "@chakra-ui/react"
import { color, font } from 'configs'
import { motion } from "framer-motion"
import Image from 'next/image'
import GameGuild from 'components/GameGuild'
import * as guildServices from "services/guild"
import { useEffect, useRef, useState } from "react"
import * as authenticationServices from "services/authentication"
import useCustomToast from "hooks/useCustomToast"

const DetailGuild = ({ guild, isOpen, onClose, join }) => {
    const [applied, setApplied] = useState(false)
    const [isGamer, setIsGamer] = useState(false)
    const [isAnonymous, setIsAnonymous] = useState(false)
    const toast = useCustomToast()

    useEffect(() => {
        setApplied(guildServices.requestJoinApllied().includes(guild.id))
        if (!authenticationServices.isAuthenticated()) setIsAnonymous(true)
        else setIsGamer(authenticationServices.user() ?? {}.type == 'GAMER')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    const joinGuild = () => {
        if (isGamer || isAnonymous) join()
        else toast('Join guild', 'Only gamer can join guild')
    }

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} size='5xl'>
                <ModalOverlay />
                <ModalContent bg={color.lightPink} rounded='xl' alignItems='center'>
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
                    <chakra.p
                        fontSize='14px'
                        fontFamily={font.inter}
                        w='700px'
                        textAlign='center'
                        color={color.pink}
                        fontWeight={500}
                        mt='10px'
                    >
                        {guild.description}
                    </chakra.p>

                    <Button
                        as={motion.button}
                        type='submit'
                        w='230px'
                        mt='40px'
                        bg={`${color.pink} !important`}
                        color={color.white}
                        size='lg'
                        py='20px !important'
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
                        onClick={applied ? undefined : joinGuild}
                        cursor={applied ? 'not-allowed' : undefined}
                    >
                        {applied? 'Applied' : 'Join Guild'}
                    </Button>
                    {applied && (
                        <chakra.p
                            mt='15px'
                            color={color.darkBlue}
                            fontFamily={font.inter}
                            fontSize='15px'
                            fontWeight={500}
                            w='350px'
                            textAlign='center'
                        >
                            Join request has been send, please wait to get confirm from guild manager
                        </chakra.p>
                    )}

                    <chakra.h1
                        fontFamily={font.inter}
                        fontWeight={900}
                        fontSize='30px'
                        mt='60px'
                        color={color.pink}
                        textAlign='start'
                        w='full'
                        px='40px'
                    >
                        Available Game
                    </chakra.h1>
                    <Box w='full' display='flex' flexWrap='wrap' px='20px' mt='20px' mb='50px'>
                        {guild.games.map((game, index) => <GameGuild key={index} game={game} />)}
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DetailGuild