import { Button, Flex, Text } from "@chakra-ui/react"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { useConnect, useAccount, useDisconnect } from "wagmi"

import { Header } from "@/components/Header"
// import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Home() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({ connector: new MetaMaskConnector() })

  return (
    <>

      <Text>Home</Text>

      <Flex justify="center">

        {isConnected ? (
          <Button onClick={() => disconnect()}>Disconnect</Button>
        ) : (
          <>
            <Button onClick={() => connect()}>Connect</Button>
            
            {/* Rainboxkit */}
            {/* <ConnectButton />  */}
          </>
        )}

      </Flex>

      {/* Header */}
      {isConnected && (
        <Flex justify="center">
          <Header />
        </Flex>
      )}

    </>
  )
}
