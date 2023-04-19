import "@/styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { getDefaultProvider } from "ethers"
import type { AppProps } from "next/app"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect"

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        {/* <RainbowKitProvider chains={}> */}
        <Component {...pageProps} />
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </ChakraProvider>
  )
}
