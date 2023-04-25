import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { WagmiConfig, createClient } from "wagmi"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { getDefaultProvider } from "ethers"

const client = createClient({
  connectors: [
    new MetaMaskConnector(),
    // new WalletConnectConnector({
    //   chains: undefined,
    //   options: {} as WalletConnectOptions,
    // }),
  ],
  provider: getDefaultProvider(),
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        {/* <RainbowKitProvider chains={chains}> */}
        <Component {...pageProps} />
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default App
