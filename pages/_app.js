import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Head from "next/head";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import * as authentication from "services/authentication";
import 'styles/globals.scss'

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        if (authentication.isAuthenticated()) authentication.refreshUser()
    }, [])

    return (
        <ChakraProvider>
            <Head>
                <title>Guild Zone</title>
            </Head>
            <QueryClientProvider client={new QueryClient()}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default App