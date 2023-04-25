import { Button, Heading, Text } from "@chakra-ui/react"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { fetchSigner, getNetwork } from "@wagmi/core"
import { useConnect, useAccount, useDisconnect } from "wagmi"
import { useEffect, useState } from "react"

const Account = () => {
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({ connector: new MetaMaskConnector() })

  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    ;(async () => {
      const signer = await fetchSigner()
      if (signer && getNetwork().chain?.id === 31337) {
        setNonce(await signer.getTransactionCount())
      }
    })()
  }, [address, isConnected])

  return (
    <>
      <Heading>Account details</Heading>

      {isConnected ? (
        <>
          <Text>
            Connected with {address}{" "}
            {nonce ? <Text as="b">(nonce: {nonce})</Text> : <></>}
          </Text>

          <Button onClick={() => disconnect()} colorScheme="twitter">
            Disconnect
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => connect()} colorScheme="twitter">
            Connect wallet
          </Button>
        </>
      )}
    </>
  )
}

export default Account
