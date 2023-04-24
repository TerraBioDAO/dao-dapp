import "@/styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { getDefaultProvider } from "ethers"
import type { AppProps } from "next/app"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect"
import { MainLayout } from "@/components/layouts/Main"
import { localhost, foundry, mainnet, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const { chains, provider } = configureChains(
  [localhost, foundry, mainnet, goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `http://localhost:8545`,
      }),
    }),
    publicProvider()
  ]
)

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   chains
// });

const client = createClient({
  // autoConnect: true,
  connectors: [
    new MetaMaskConnector(),
    // new WalletConnectConnector({
    //   chains: undefined,
    //   options: {} as WalletConnectOptions,
    // }),
  ],
  // provider: getDefaultProvider()

  // For Rainbowkit
  // connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        {/* <RainbowKitProvider chains={chains}> */}
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </ChakraProvider>
  )
}
