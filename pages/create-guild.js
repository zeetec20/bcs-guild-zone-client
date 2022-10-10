import Navbar from "components/Navbar"
import { Box, chakra, HStack, Input, SimpleGrid, VStack, Textarea, Button, useToast, Flex, Heading, Spacer, Select, Show } from '@chakra-ui/react'
import Footer from "components/Footer"
import configs from "configs"
import { BsFillImageFill } from "react-icons/bs"
import backgroundImage from 'assets/images/background.png'
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/router"
import createGuildValidator from 'helper/validator/createGuildValidator'
import completeGuildValidator from 'helper/validator/completeGuildValidator'
import ToastCustom from 'components/Toast'
import guildzone from "services/guildzone"
import Game from "components/GameCreateGuild"
import guild from "services/guild"
import authentication from "services/authentication"
import CreateGuildStyle from 'styles/CreateGuildStyle.module.scss'

const { font, color, regions } = configs

const Indicator = ({ number, isActive }) => {
    return (
        <chakra.div
            rounded='full'
            w='45px'
            h='45px'
            bg={isActive ? color.darkBlue : color.white}
            display='flex'
            justifyContent='center'
            alignItems='center'
            fontFamily={font.inter}
            fontWeight={800}
            fontSize='15px'
            color={isActive ? color.white : color.darkBlue}
            borderColor={color.darkBlue}
            borderWidth='2px'
        >
            {number}
        </chakra.div>
    )
}

const CreateGuildPage = () => {
    const [games, setGames] = useState([])
    const [selectedGame, setSelectedGame] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const toast = useToast()
    const toastRef = useRef()
    const [page, setPage] = useState(1)
    const router = useRouter()
    const onlyImage = ['image/png', 'image/jpeg']
    const [submitData, setSubmitData] = useState()

    useEffect(() => {
        if (!games.length) guildzone.getAllGames().then(result => setGames(result)).catch(err => {
            toastRef.current = toast({
                duration: 3000,
                position: 'top-left',
                render: ToastCustom('Data Guild', err.message, () => toast.close(toastRef.current), color.red)
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isLoading) {
            setIsLoading(true)
            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData)
            const isValid = await createGuildValidator.validate(data).catch(err => {
                setIsLoading(false)

                toastRef.current = toast({
                    duration: 3000,
                    position: 'top-left',
                    render: ToastCustom('Data Guild', err.message, () => toast.close(toastRef.current))
                })
            })

            if (isValid) {
                setSubmitData(isValid)
                setIsLoading(false)
                setPage(2)
            }
        }
    }

    const handleSubmit2 = async (e) => {
        e.preventDefault()

        if (!isLoading2) {
            setIsLoading2(true)
            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData)
            const isValid = await completeGuildValidator.validate(data).catch(err => {
                setIsLoading2(false)

                toastRef.current = toast({
                    duration: 3000,
                    position: 'top-left',
                    render: ToastCustom('Data Guild', err.message, () => toast.close(toastRef.current))
                })
            })

            if (!selectedGame.length) {
                toastRef.current = toast({
                    duration: 3000,
                    position: 'top-left',
                    render: ToastCustom('Data Guild', 'at least 1 game must selected', () => toast.close(toastRef.current))
                })
                setIsLoading2(false)
                return
            }

            if (isValid) {
                try {
                    const formData = new FormData()
                    const data = { ...isValid, ...submitData, games: selectedGame.join(', ') }
                    console.log(data)
                    Object.keys(data).forEach(key => {
                        formData.append(key, data[key])
                    })
                    const result = await guild.createGuild(formData)
                    await authentication.refreshUser()

                    setIsLoading2(false)
                    router.push(`/guild/${result.id}`)
                } catch (err) {
                    toastRef.current = toast({
                        duration: 3000,
                        position: 'top-left',
                        render: ToastCustom('Data Guild', err.message, () => toast.close(toastRef.current), color.red)
                    })
                    setIsLoading2(false)
                }
            }
        }
    }

    const [isAnyFileBannerGuild, setIsAnyFileBannerGuild] = useState(null)
    const bannerGuildPreview = useRef()
    const bannerGuildInput = useRef()
    const dropZoneBannerGuild = useDropzone({
        multiple: false,
        maxFiles: 1,
        onDrop: ([file]) => {
            if (onlyImage.includes(file.type)) {
                bannerGuildPreview.current.style.backgroundSize = 'cover'
                bannerGuildPreview.current.style.backgroundImage = `url('${URL.createObjectURL(file)}')`
                setIsAnyFileBannerGuild(file)
                const files = (new DataTransfer())
                files.items.add(file)
                bannerGuildInput.current.files = files.files
            } else {
                toastRef.current = toast({
                    duration: 3000,
                    position: 'top-left',
                    render: ToastCustom('Data Guild', 'please use correct image', () => toast.close(toastRef.current))
                })
            }
        },
        onDragOver: () => bannerGuildPreview.current.style.borderColor = color.pink,
        onDragEnter: () => bannerGuildPreview.current.style.borderColor = color.grey,
        onDragLeave: () => bannerGuildPreview.current.style.borderColor = color.grey,
        onDropAccepted: () => bannerGuildPreview.current.style.borderColor = color.grey
    })

    const [isAnyFileLogoGuild, setIsAnyFileLogoGuild] = useState(null)
    const logoGuildPreview = useRef()
    const logoGuildInput = useRef()
    const dropZoneLogoGuild = useDropzone({
        multiple: false,
        maxFiles: 1,
        onDrop: ([file]) => {
            if (onlyImage.includes(file.type)) {
                logoGuildPreview.current.style.backgroundSize = 'cover'
                logoGuildPreview.current.style.backgroundImage = `url('${URL.createObjectURL(file)}')`
                setIsAnyFileLogoGuild(file)
                const files = (new DataTransfer())
                files.items.add(file)
                logoGuildInput.current.files = files.files
            } else {
                toastRef.current = toast({
                    duration: 3000,
                    position: 'top-left',
                    render: ToastCustom('Data Guild', 'please use correct image', () => toast.close(toastRef.current))
                })
            }
        },
        onDragOver: () => logoGuildPreview.current.style.borderColor = color.pink,
        onDragEnter: () => logoGuildPreview.current.style.borderColor = color.grey,
        onDragLeave: () => logoGuildPreview.current.style.borderColor = color.grey,
        onDropAccepted: () => logoGuildPreview.current.style.borderColor = color.grey
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

                <Box
                    w='70vw'
                    mt='130px'
                    bg={color.white}
                    rounded='2xl'
                    boxShadow={`0px 0px 15px ${color.lightPink}`}
                    overflow='hidden'
                    position='relative'
                    transition={'height 0.5s ease'}
                    h={page == 1 ? '770px' : undefined}
                    className={`${CreateGuildStyle['create-guild-wrap']} ${page == 1 ? CreateGuildStyle['create-guild-page1-active'] : CreateGuildStyle['create-guild-page2-active']}`}
                >
                    <chakra.div display='flex' w='140vw' className={CreateGuildStyle['create-guild-slides']}>
                        <chakra.form
                            onSubmit={handleSubmit}
                            w='70vw'
                            marginLeft={page == 1 ? undefined : '-50%'}
                            transition='all 0.5s ease'
                            className={CreateGuildStyle['create-guild-page1']}
                        >
                            <HStack
                                mx='clamp(20px, 2.4vw, 40px)'
                                alignItems='center'
                            >
                                <VStack alignItems='start'>
                                    <chakra.h1
                                        color={color.pink}
                                        fontFamily={font.inter}
                                        fontSize='40px'
                                        fontWeight={900}
                                        mt='20px'
                                    >
                                        Create Your Guild
                                    </chakra.h1>
                                    <chakra.p
                                        color={color.black}
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                        fontSize='15px'
                                    >
                                        Become our partner to contribute on Guild Zone
                                    </chakra.p>
                                </VStack>

                                <Spacer />

                                <Show breakpoint="(min-width: 750px)">
                                    <HStack spacing='15px' mt='20px !important'>
                                        <Indicator number={1} isActive={page == 1} />
                                        <Indicator number={2} isActive={page == 2} />
                                    </HStack>
                                </Show>
                            </HStack>

                            <SimpleGrid minChildWidth='340px' mx='clamp(20px, 2.4vw, 40px)' alignItems='center' justifySelf='space-between'>
                                <chakra.div
                                    w='clamp(300px, 31vw, 500px)'
                                    display='flex'
                                    alignItems='center'
                                    flexDir='column'
                                    className={CreateGuildStyle['create-guild-page1-profile']}
                                >
                                    <chakra.h1
                                        color={color.pink}
                                        fontFamily={font.inter}
                                        fontSize='24px'
                                        fontWeight={800}
                                        mt='40px'
                                        w='full'
                                    >
                                        Profile Guild
                                    </chakra.h1>


                                    <Box
                                        as='div'
                                        w='full'
                                        display='flex'
                                        flexDir='column'
                                        mt='20px'
                                        rounded='xl'
                                        border={`2px dashed ${color.grey}`}
                                        justifyContent='center'
                                        alignItems='center'
                                        h='150px'
                                        transition='border-color 0.2s ease'
                                        cursor='pointer'
                                        _hover={{
                                            borderColor: `${color.pink} !important`
                                        }}
                                        {...dropZoneBannerGuild.getRootProps()}
                                        ref={bannerGuildPreview}
                                    >
                                        <Input type='file' name="banner" accept="image/png, image/jpeg" ref={bannerGuildInput} display='none' />

                                        {!isAnyFileBannerGuild && (
                                            <>
                                                <BsFillImageFill size='25px' color={color.grey} />
                                                <chakra.h1 fontFamily={font.inter} mt='5px' fontSize='13.5px' fontWeight={600} color={color.grey}>Banner Guild</chakra.h1>
                                            </>
                                        )}
                                    </Box>
                                    <Box
                                        w='120px'
                                        flexDir='column'
                                        mt='25px'
                                        h='120px'
                                        rounded='full'
                                        border={`2px dashed ${color.grey}`}
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                        transition='border-color 0.2s ease'
                                        cursor='pointer'
                                        _hover={{
                                            borderColor: `${color.pink} !important`
                                        }}
                                        {...dropZoneLogoGuild.getRootProps()}
                                        ref={logoGuildPreview}
                                    >
                                        <Input type='file' name="logo" accept="image/png, image/jpeg" ref={logoGuildInput} display='none' />

                                        {!isAnyFileLogoGuild && (
                                            <>
                                                <BsFillImageFill size='25px' color={color.grey} />
                                                <chakra.h1 fontFamily={font.inter} fontSize='13.5px' mt='5px' fontWeight={600} color={color.grey}>Logo Guild</chakra.h1>
                                            </>
                                        )}
                                    </Box>

                                    <chakra.h1
                                        mt='40px'
                                        w='full'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                        fontSize='14px'
                                        color={color.purple}
                                    >
                                        Name Guild
                                    </chakra.h1>
                                    <Input
                                        placeholder='Your guild name...'
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
                                </chakra.div>

                                <VStack w='clamp(300px, 31vw, 500px)' alignItems='end' placeSelf='end' h='full' className={CreateGuildStyle['create-guild-page1-social-media']}>
                                    <chakra.h1
                                        color={color.pink}
                                        fontFamily={font.inter}
                                        fontSize='24px'
                                        fontWeight={800}
                                        mt='40px'
                                        w='full'
                                    >
                                        Social Media
                                    </chakra.h1>

                                    <chakra.h1
                                        mt='12px !important'
                                        w='full'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                        fontSize='14px'
                                        color={color.purple}
                                    >
                                        Discord
                                    </chakra.h1>
                                    <Input
                                        placeholder='Your discord...'
                                        name="discord"
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
                                        mt='20px'
                                        fontSize='16px'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                    />
                                    <chakra.h1
                                        mt='20px !important'
                                        w='full'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                        fontSize='14px'
                                        color={color.purple}
                                    >
                                        Twitter
                                    </chakra.h1>
                                    <Input
                                        placeholder='Your twitter...'
                                        name="twitter"
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
                                        mt='20px'
                                        fontSize='16px'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                    />
                                    <chakra.h1
                                        mt='20px !important'
                                        w='full'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                        fontSize='14px'
                                        color={color.purple}
                                    >
                                        Telegram
                                    </chakra.h1>
                                    <Input
                                        placeholder='Your telegram...'
                                        name="telegram"
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
                                        mt='20px'
                                        fontSize='16px'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                    />
                                    <chakra.h1
                                        mt='20px !important'
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
                                        mt='20px'
                                        fontSize='16px'
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                    />
                                </VStack>
                            </SimpleGrid>

                            <HStack justifyContent='end' mb='40px' mx='40px' className={CreateGuildStyle['create-guild-page1-button-submit']}>
                                <Button
                                    type="submit"
                                    mt='20px !important'
                                    bg={`${color.pink} !important`}
                                    color={color.white}
                                    size='lg'
                                    py='20px'
                                    px='50px'
                                    boxShadow={`0px 0px 15px ${color.pink}`}
                                    fontSize='17px'
                                    fontWeight={800}
                                    fontFamily={font.inter}
                                    isLoading={isLoading}
                                >
                                    Create Guild
                                </Button>
                            </HStack>
                        </chakra.form>

                        <chakra.form
                            onSubmit={handleSubmit2}
                            w='70vw'
                            className={CreateGuildStyle['create-guild-page2']}
                        >
                            <HStack
                                mx='clamp(20px, 2.4vw, 40px)'
                                alignItems='center'
                            >
                                <VStack alignItems='start'>
                                    <chakra.h1
                                        color={color.pink}
                                        fontFamily={font.inter}
                                        fontSize='40px'
                                        fontWeight={900}
                                        mt='20px'
                                    >
                                        Complete Your Guild
                                    </chakra.h1>
                                    <chakra.p
                                        color={color.black}
                                        fontFamily={font.inter}
                                        fontWeight={500}
                                        fontSize='15px'
                                    >
                                        Become our partner to contribute on Guild Zone
                                    </chakra.p>
                                </VStack>

                                <Spacer />

                                <Show breakpoint="(min-width: 750px)">
                                    <HStack spacing='15px' mt='20px !important'>
                                        <Indicator number={1} isActive={page == 1} />
                                        <Indicator number={2} isActive={page == 2} />
                                    </HStack>
                                </Show>
                            </HStack>

                            <VStack
                                px='clamp(20px, 2.4vw, 40px)'
                            >
                                <chakra.h1
                                    color={color.pink}
                                    fontFamily={font.inter}
                                    fontSize='24px'
                                    fontWeight={800}
                                    mt='40px'
                                    w='full'
                                >
                                    Detail Guild
                                </chakra.h1>

                                <chakra.h1
                                    mt='12px !important'
                                    w='full'
                                    fontFamily={font.inter}
                                    fontWeight={500}
                                    fontSize='14px'
                                    color={color.purple}
                                >
                                    Description
                                </chakra.h1>
                                <Textarea
                                    placeholder='Your guild description...'
                                    name="description"
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
                                <SimpleGrid w='full' minChildWidth='230px' spacing='20px'>
                                    <VStack flex='1'>
                                        <chakra.h1
                                            mt='12px !important'
                                            w='full'
                                            fontFamily={font.inter}
                                            fontWeight={500}
                                            fontSize='14px'
                                            color={color.purple}
                                        >
                                            Total Guild Member
                                        </chakra.h1>
                                        <Input
                                            placeholder='Your total guild member...'
                                            name="total_member"
                                            type='number'
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
                                            Count Recruitment
                                        </chakra.h1>
                                        <Input
                                            placeholder='Your count recruitment...'
                                            name="open_recruitment"
                                            type='number'
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
                                            Region
                                        </chakra.h1>
                                        <Select
                                            placeholder='Select region guild...'
                                            name="region"
                                            type='number'
                                            size='lg'
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
                                            h='57px'
                                        >
                                            {regions.map((region, index) => <chakra.option key={index} value={region.name.toLowerCase()}>{region.name}</chakra.option>)}
                                        </Select>
                                    </VStack>
                                </SimpleGrid>

                                <HStack
                                    alignItems='center'
                                    mt='40px !important'
                                    w='full'
                                >
                                    <chakra.h1
                                        color={color.pink}
                                        fontFamily={font.inter}
                                        fontSize='24px'
                                        fontWeight={800}
                                        mr='5px'
                                    >
                                        Select Available Game of Guild
                                    </chakra.h1>
                                    {Boolean(selectedGame.length) && (
                                        <Box
                                            rounded='full'
                                            h='27px'
                                            bg={color.pink}
                                            zIndex='2'
                                            display='flex'
                                            justifyContent='center'
                                            alignItems='center'
                                            color={color.white}
                                            fontFamily={font.inter}
                                            fontWeight={700}
                                            px='10px'
                                        >
                                            {selectedGame.length} 
                                            <Show breakpoint="(min-width: 741px)">
                                            &nbsp;Selected
                                            </Show>
                                        </Box>
                                    )}
                                </HStack>
                                <SimpleGrid mt='15px !important' py='25px' px='15px' minChildWidth='260px' spacingY='35px' boxShadow={`0px 0px 20px -10px ${color.grey}`} rounded='xl' w='full' position='relative' overflow='auto'>
                                    {games.map((g, index) => {
                                        const isSelected = selectedGame.filter(e => e == g.id).length
                                        console.log(g, g.id)
                                        return (
                                            <Game
                                                key={index}
                                                game={g}
                                                isSelected={isSelected}
                                                onClick={() => setSelectedGame(isSelected ? [...selectedGame.filter(e => e != g.id)] : [...selectedGame, g.id])}
                                            />
                                        )
                                    })}
                                </SimpleGrid>
                            </VStack>

                            <HStack justifyContent='end' mb='40px' mx='40px' mt='40px'>
                                <Button
                                    type="submit"
                                    mt='20px !important'
                                    bg={`${color.pink} !important`}
                                    color={color.white}
                                    size='lg'
                                    py='20px'
                                    px='50px'
                                    boxShadow={`0px 0px 15px ${color.pink}`}
                                    fontSize='17px'
                                    fontWeight={800}
                                    fontFamily={font.inter}
                                    isLoading={isLoading2}
                                >
                                    Complete Your Guild
                                </Button>
                            </HStack>
                        </chakra.form>
                    </chakra.div>
                </Box>
                <Footer marginTop={'100px'} />
            </chakra.div>
        </chakra.div>
    )
}

export default CreateGuildPage