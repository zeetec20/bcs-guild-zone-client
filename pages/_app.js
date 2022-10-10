import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
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
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default App