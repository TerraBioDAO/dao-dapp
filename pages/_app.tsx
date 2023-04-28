import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { CreateClientConfig, configureChains, createClient, WagmiConfig } from "wagmi";
import { Chain, sepolia, foundry, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import DaoProvider from "@/context/DaoContext"

const { chains, provider } = configureChains(
    [sepolia, polygon, polygonMumbai, foundry] as Chain[],
    [
      publicProvider(),
    ]
);

const { connectors } = getDefaultWallets({
  appName: "TerrabioDAO dApp",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
} as CreateClientConfig);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default App
