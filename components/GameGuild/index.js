import { Box, chakra, Skeleton, Text, StyleProps } from '@chakra-ui/react'
import Image from 'next/image'
import { color, font } from 'configs'
import { BsCheckLg } from 'react-icons/bs'
import { useEffect, useState } from 'react'

const GameGuild = ({ game, selectAble = false, gameSelected = null, onSelect = null, styles = {}}) => {
    const [isSelected, setIsSelected] = useState(false)
    const skeleton = game == undefined

    useEffect(() => {
        if (gameSelected != null && game.id != gameSelected) setIsSelected(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameSelected])

    return (
        <Box
            placeSelf='center'
            bg={color.purpleGrey}
            w='245px'
            rounded={'lg'}
            display='inline'
            position='relative'
            transition='all 0.3s ease'
            cursor='pointer'
            padding={0}
            mx='20px'
            onClick={selectAble ? () => {
                onSelect()
                setIsSelected(!isSelected)
            } : undefined}
            boxShadow={isSelected ? `0px 0px 20px ${color.pink}` : `0px 0px 5px ${color.pink}`}
            border={isSelected ? `1.5px solid ${color.pink}` : undefined}
            mb='25px'
            {...styles}
        >
            {isSelected && (
                <Box
                    rounded='full'
                    position='absolute'
                    w='27px'
                    h='27px'
                    bg={color.pink}
                    zIndex='2'
                    right='-10px'
                    top='-10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <BsCheckLg color={color.white} size='12px' />
                </Box>
            )}
            <chakra.div px='13px' mb='10px'>
                <Skeleton isLoaded={!skeleton} rounded={'lg'}>
                    <chakra.div position='relative' w='full' height='150px' mt='13px' rounded={'lg'} overflow='hidden'>
                        <Image src={game?.images[0]} alt='banner' objectFit='cover' layout='fill' />
                    </chakra.div>
                </Skeleton>

                <Skeleton isLoaded={!skeleton}>
                    <chakra.h1
                        mt='20px'
                        color={color.white}
                        fontFamily={font.inter}
                        fontWeight={900}
                        fontSize='21px'
                    >
                        {game?.name}
                    </chakra.h1>
                </Skeleton>
                <Skeleton isLoaded={!skeleton}>
                    <Text
                        noOfLines={4}
                        color={color.white}
                        fontFamily={font.inter}
                        fontSize='12px'
                        mt='3px'
                    >
                        {game?.description ?? '&nbsp;'}
                    </Text>
                </Skeleton>

                <chakra.div display='flex' flexWrap='wrap' mt='20px' mb='0px'>
                    {(game?.genre ?? Array.from(Array(3).keys())).map((g, index) => (
                        <Skeleton
                            mr='5px'
                            mb='10px'
                            key={index}
                            isLoaded={!skeleton}
                        >
                            <Box
                                color={color.white}
                                fontSize='12px'
                                w='fit-content'
                                rounded='full'
                                px='10px'
                                py='0px'
                                bg={color.pink}
                                fontFamily={font.inter}
                                fontWeight={700}
                            >
                                {g}
                            </Box>
                        </Skeleton>
                    ))}
                </chakra.div>
            </chakra.div>
        </Box>
    )
}

export default GameGuild