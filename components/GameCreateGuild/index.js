import { HStack, Box, chakra, background, SimpleGrid } from '@chakra-ui/react'
import bannerImage from 'assets/images/banner_guild.png'
import logoGameImage from 'assets/images/logo_game.png'
import Image from 'next/image'
import configs from 'configs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Grid } from 'swiper'
import { BsCheckLg } from 'react-icons/bs'

const { color, font } = configs

const Game = ({ game, isSelected, onClick }) => {
    isSelected = Boolean(isSelected)
    return (
        <Box
            placeSelf='center'
            bg={color.purpleGrey}
            w='245px'
            rounded={'lg'}
            display='inline'
            position='relative'
            boxShadow={isSelected ? `0px 0px 20px ${color.pink}` : `0px 0px 5px ${color.pink}`}
            border={isSelected ? `1.5px solid ${color.pink}` : undefined}
            transition='all 0.3s ease'
            cursor='pointer'
            onClick={onClick}
            padding={0}
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
                <chakra.div position='relative' w='full' height='150px' mt='13px' rounded={'lg'} overflow='hidden'>
                    <Image src={game.images[0]} alt='banner' objectFit='cover' layout='fill' />
                </chakra.div>

                <chakra.h1
                    mt='20px'
                    color={color.white}
                    fontFamily={font.inter}
                    fontWeight={900}
                    fontSize='21px'
                >
                    {game.name}
                </chakra.h1>

                <chakra.div display='flex' flexWrap='wrap' mt='10px' mb='0px'>
                    {game.genre.map((g, index) => (
                        <Box
                            key={index}
                            color={color.white}
                            fontSize='12px'
                            w='fit-content'
                            rounded='full'
                            px='10px'
                            py='0px'
                            bg={color.pink}
                            mr='5px'
                            mb='10px'
                            fontFamily={font.inter}
                            fontWeight={700}
                        >
                            {g}
                        </Box>
                    ))}
                </chakra.div>
            </chakra.div>
        </Box>
    )
}

export default Game