import { Box, chakra, HStack, VStack } from '@chakra-ui/react'
import configs from 'configs'
import Image from 'next/image'
import newsImage from 'assets/images/news.png'
import { motion } from 'framer-motion'

const { color, font } = configs


const News = () => {
    return (
        <chakra.div w='full' px='clamp(20px, 5vw, 70px)' py='33px'>
            <Box
                w='full'
                bg={color.purpleGrey}
                rounded='2xl'
                px='20px'
                py='20px'
                cursor='pointer'
                transition='box-shadow 0.25s ease'
                position='relative'
            >
                <chakra.div
                    w='full'
                    _before={{
                        content: "''",
                        position: 'absolute',
                        top: 0, right: 0, bottom: 0, left: 0,
                        zIndex: -1,
                        padding: '20px',
                        margin: '-3px',
                        borderRadius: '20px',
                        background: `linear-gradient(to top right, ${color.pink}, ${color.darkBlue}, ${color.pink})`
                    }}
                >
                    <chakra.div position='relative' w='full' h='300px' overflow='hidden' rounded='2xl'>
                        <Image src={newsImage} layout='fill' objectFit='cover' alt='news' />
                    </chakra.div>

                    <chakra.h1
                        fontFamily={font.inter}
                        fontSize='clamp(20px, 2vw, 30px)'
                        color={color.white}
                        fontWeight={900}
                        mt='25px'
                        cursor='pointer'
                        _hover={{
                            textDecoration: 'underline'
                        }}
                    >
                        Skill Labs x Walken Announce Scholarship Recuitment
                    </chakra.h1>
                    <chakra.p
                        fontFamily={font.inter}
                        fontSize='15px'
                        color={color.white}
                        fontWeight={500}
                        mt='10px'
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`&apos;`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </chakra.p>

                    <HStack justifyContent='space-between' alignItems='center'>
                        <chakra.div
                            bg={color.pink}
                            rounded='full'
                            w='fit-content'
                            px='15px'
                            py='3px'
                            mt='30px !important'
                            color={color.white}
                            fontWeight={700}
                            fontSize='12px'
                            boxShadow={`0px 0px 10px ${color.darkBlue}`}
                        >
                            2 min read
                        </chakra.div>
                        <chakra.div
                            bg={color.pink}
                            rounded='full'
                            w='fit-content'
                            px='15px'
                            py='3px'
                            mt='30px !important'
                            color={color.white}
                            fontWeight={700}
                            fontSize='12px'
                            boxShadow={`0px 0px 10px ${color.darkBlue}`}
                        >
                            Agust 23, 2022
                        </chakra.div>
                    </HStack>
                </chakra.div>
            </Box>
        </chakra.div>
    )
}

export default News