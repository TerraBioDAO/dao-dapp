import { Button, Flex, Text } from "@chakra-ui/react"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { useConnect, useAccount, useDisconnect } from "wagmi"

import { MainLayout } from "@/components/layouts/Main"

export default function Home() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({ connector: new MetaMaskConnector() })

  return (
    <MainLayout>
      <>

        <Text>Home</Text>

        <Flex justify="center">

          {isConnected ? (
            <Button onClick={() => disconnect()}>Disconnect</Button>
          ) : (
            <Button onClick={() => connect()}>Connect</Button>
          )}

        </Flex>

      </>
    </MainLayout>
  )
}
