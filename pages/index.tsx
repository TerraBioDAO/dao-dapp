import { Button, Container, Heading, Text } from "@chakra-ui/react"
import { fetchSigner, getNetwork, getContract } from "@wagmi/core"
import { MainLayout } from "@/components/layouts/Main"
import { useEffect, useState } from "react"
import { Contract, Signer } from "ethers"

import contracts from "../lib/contracts.json"
import { useAccount } from "wagmi"
import { getAllCurrentMembers } from "@/lib/members"

export type Dao = {
  access: Contract
  router: Contract
  gov: Contract
  members: Contract
}

const Home = () => {
  const { isConnected, address } = useAccount()

  const [dao, setDao] = useState<Dao | null>(null)
  const [members, setMembers] = useState<string[]>([])

  // fetch contracts
  useEffect(() => {
    ;(async () => {
      const signer = await fetchSigner()
      const chain = getNetwork().chain
      if (signer && chain && chain.id === 31337) {
        const mainAddress = contracts.addresses[chain.id].main
        const abis = contracts.abis

        const access = getContract({
          address: mainAddress,
          abi: abis.dao_access,
          signerOrProvider: signer,
        })
        const router = getContract({
          address: mainAddress,
          abi: abis.fallback_router,
          signerOrProvider: signer,
        })
        const gov = getContract({
          address: mainAddress,
          abi: abis.governance,
          signerOrProvider: signer,
        })
        const members = getContract({
          address: mainAddress,
          abi: abis.lib_members,
          signerOrProvider: signer,
        })

        setDao({ access, router, gov, members })
      }
    })()
  }, [isConnected, address])

  // fetch members
  useEffect(() => {
    ;(async () => {
      if (dao) {
        setMembers(await getAllCurrentMembers(dao.members))
      }
    })()
  }, [dao])

  return (
    <>
      <MainLayout>
        <Container pt="5">
          <Heading>Welcome to Terrabio DAO</Heading>

          {/* MEMBERS */}
          <Heading mt="5" as="h3">
            Members list:
          </Heading>
          {members.map((member) => {
            return <Text key={member}>{member}</Text>
          })}
        </Container>
      </MainLayout>
    </>
  )
}

export default Home
