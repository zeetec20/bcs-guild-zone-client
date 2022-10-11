import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import Head from "next/head";
import { useEffect } from "react";
import authentication from "services/authentication";
import 'styles/globals.scss'

const theme = extendTheme({
    components: {
        Steps,
    },
})

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        if (authentication.isAuthenticated()) authentication.refreshUser()
    }, [])

    return (
        <ChakraProvider theme={theme}>
            <Head>
                <title>Guild Zone</title>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default App