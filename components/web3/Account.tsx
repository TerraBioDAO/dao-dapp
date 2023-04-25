import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask"
import { fetchSigner, getNetwork } from "@wagmi/core"
import { useConnect, useAccount, useDisconnect } from "wagmi"
import { useEffect, useState } from "react"

const Account = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      {isConnected ? (
        <>
          <Button
            colorScheme="cyan"
            variant="outline"
            onClick={() => onOpen()}
            maxW="15ch"
          >
            <Text isTruncated={true}>{address}</Text>
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => onOpen()} colorScheme="twitter">
            Connect wallet
          </Button>
        </>
      )}

      {/* ACCOUNT MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="5">
          {isConnected ? (
            <>
              {" "}
              <ModalHeader>Account details</ModalHeader>
              <ModalCloseButton />
              <ModalBody flexDirection="column" display="flex" gap="3">
                <Text>
                  Connected with {address}{" "}
                  {nonce ? <Text as="b">(nonce: {nonce})</Text> : <></>}
                </Text>
                <Text>Balance: ??? ETH (TBA)</Text>

                {/* ADD TERRABIO INFO in a componant */}

                <Spacer />

                <Button
                  onClick={() => {
                    disconnect()
                    onClose()
                  }}
                  colorScheme="red"
                >
                  Disconnect
                </Button>
              </ModalBody>
            </>
          ) : (
            <>
              <ModalHeader>Connect wallet</ModalHeader>
              <ModalCloseButton />
              <ModalBody flexDirection="column" display="flex" gap="3">
                <Text>Choose which wallet connect:</Text>
                <Button
                  onClick={() => {
                    connect()
                    onClose()
                  }}
                  colorScheme="orange"
                >
                  Metamask
                </Button>
                <Button
                  isDisabled={true}
                  onClick={() => {
                    connect()
                    onClose()
                  }}
                  colorScheme="twitter"
                >
                  WalletConnect
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Account
