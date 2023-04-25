import { Badge, Icon, Text } from "@chakra-ui/react"
import { getNetwork } from "@wagmi/core"
import { useEffect, useState } from "react"
import { useAccount, useNetwork } from "wagmi"

const Network = () => {
  const { chain } = useNetwork()
  const { isConnected } = useAccount()
  const [chainName, setChainName] = useState<string | undefined>("")

  useEffect(() => {
    console.log(chain)
    switch (getNetwork().chain?.id) {
      case 31337:
        setChainName("localhost:8545")
        break
      case 420:
        setChainName("Optimism goerli")
        break
      case undefined:
        setChainName("not connected")
        break
      default:
        setChainName(getNetwork().chain?.name)
    }
  }, [chain, isConnected])

  return (
    <>
      <Badge
        alignItems="center"
        gap="2"
        display="flex"
        py="1"
        px="2"
        fontSize="0.8rem"
        variant="subtle"
        colorScheme={
          chainName === "not connected"
            ? "red"
            : getNetwork().chain?.id !== 31337 && getNetwork().chain?.id !== 420
            ? "yellow"
            : "green"
        }
        borderRadius="5"
        mx="5"
      >
        <Icon
          viewBox="0 0 200 200"
          color={
            chainName === "not connected"
              ? "red.500"
              : getNetwork().chain?.id !== 31337 &&
                getNetwork().chain?.id !== 420
              ? "yellow.500"
              : "green.500"
          }
        >
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>
        <Text>
          {chainName} ({getNetwork().chain?.id})
        </Text>
      </Badge>

      {/* ADD SWITCH NETWORK */}
    </>
  )
}

export default Network
