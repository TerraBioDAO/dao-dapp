import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { CreateClientConfig, configureChains, createClient, WagmiConfig } from "wagmi";
import { Chain, sepolia, foundry, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import DaoProvider from "@/context/DaoContext"
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
    injectedWallet,
    rainbowWallet,
    metaMaskWallet,
    coinbaseWallet,
    walletConnectWallet,
    ledgerWallet,
    argentWallet,
    trustWallet
} from '@rainbow-me/rainbowkit/wallets';

const { chains, provider } = configureChains(
    [sepolia, polygon, polygonMumbai, foundry] as Chain[],
    [
      publicProvider(),
    ]
);

/*const { connectors } = getDefaultWallets({
  appName: "TerrabioDAO dApp",
  chains,
});*/
const projectId = "TerrabioDAO dApp";

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            injectedWallet({ chains }),
            rainbowWallet({ projectId, chains }),
            metaMaskWallet({ projectId, chains }),
            coinbaseWallet({ chains, appName: "TerrabioDAO dApp" }),
            walletConnectWallet({ projectId, chains }),
        ],
    },
    {
        groupName: 'Others',
        wallets: [
            ledgerWallet(projectId, chains),
            argentWallet(projectId, chains),
            trustWallet(projectId, chains)
        ],
    },
]);

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
