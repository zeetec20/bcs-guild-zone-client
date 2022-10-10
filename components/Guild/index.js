import { HStack, Box, chakra, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import configs from 'configs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import DetailGuild from './detailGuild'
import JoinGuild from './joinGuild'

const { color, font } = configs

const Guild = ({ guild }) => {
    const openMember = Boolean(guild.openRecruitment)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const join = useDisclosure()
    const showJoin = () => {
        onClose()
        setTimeout(() => {
            join.onOpen()
        }, 200);
    }

    return (
        <>
            <Box
                placeSelf='center'
                bg={color.purpleGrey}
                w='310px'
                px='15px'
                rounded={'lg'}
                display='inline'
                position='relative'
                boxShadow={`0.3px 0.3px 4px ${color.grey}`}
                mb='50px'
            >
                <chakra.div
                    rounded={'full'}
                    bgGradient={`linear(to-tr, ${color.lightPurple} 5%, ${color.pink} 60%)`}
                    h='30px'
                    mt='-15px'
                    left={0}
                    right={0}
                    ml={'auto'}
                    mr='auto'
                    w='130px'
                    position='absolute'
                    zIndex='2'
                    display='flex'
                    alignItems={'center'}
                    justifyContent='center'
                >
                    <chakra.div
                        bg={openMember ? color.green : color.red}
                        rounded='full'
                        w='8px'
                        h='8px'
                        mr='8px'
                    />

                    <chakra.p
                        color={color.white}
                        fontFamily={font.inter}
                        fontWeight={900}
                        fontSize='13px'
                    >
                        {openMember ? 'Open Member' : 'Close Member'}
                    </chakra.p>
                </chakra.div>

                <chakra.div position='relative' w='full' height='150px' mt='15px' rounded={'lg'} overflow='hidden'>
                    <Image src={guild.banner} alt='banner' objectFit='cover' layout='fill' />
                </chakra.div>

                <chakra.h1
                    mt='15px'
                    color={color.white}
                    fontFamily={font.inter}
                    fontWeight={900}
                    fontSize='27px'
                >
                    {guild.name}
                </chakra.h1>
                <chakra.p
                    fontFamily={font.inter}
                    color={color.white}
                    fontWeight={600}
                    fontSize='14px'
                    textTransform='capitalize'
                >
                    <FaMapMarkerAlt style={{ display: 'inline', marginBottom: '-1px', marginRight: '3px', marginLeft: '2px' }} size='13px' /> {guild.region}
                </chakra.p>

                <HStack mt='10px'>
                    {guild.games.filter((e, index) => index < 4).map((game, index) => (
                        <Box
                            key={index}
                            borderRadius={'full'}
                            h='30px'
                            w='30px'
                            bgImage={game.images[0]}
                            bgSize='cover'
                        />
                    ))}
                    {
                        guild.games.length > 4 && (
                            <Box
                                borderRadius={'full'}
                                h='30px'
                                w='30px'
                                bg={color.purple}
                                bgSize='cover'
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                fontFamily={font.inter}
                                fontWeight={900}
                                fontSize='12.5px'
                                color={color.white}
                            >
                                +{guild.games.length - 4}
                            </Box>
                        )
                    }
                </HStack>

                <chakra.button
                    bg={color.pink}
                    color={color.white}
                    w='full'
                    rounded='2xl'
                    py='8px'
                    fontSize='18px'
                    fontFamily={font.inter}
                    fontWeight={900}
                    mt='40px'
                    mb='20px'
                    boxShadow={`0px 0px 10px ${color.pink}`}
                    transition='box-shadow 0.2s ease-in'
                    _hover={{
                        boxShadow: `0px 0px 15px ${color.pink}`
                    }}
                    onClick={onOpen}
                >
                    Open Guild
                </chakra.button>
            </Box>
            <DetailGuild guild={guild} onClose={onClose} isOpen={isOpen} join={showJoin} />
            <JoinGuild guild={guild} onClose={join.onClose} isOpen={join.isOpen} />
        </>
    )
}

export default Guild