import { Button, Container, Heading, Text } from "@chakra-ui/react"
import { fetchSigner, getNetwork, getContract } from "@wagmi/core"
import { MainLayout } from "@/components/layouts/Main"
import { useEffect, useState } from "react"
import { Contract, Signer } from "ethers"

import contracts from "../lib/contracts.json"
import { useAccount } from "wagmi"
import { getAllCurrentMembers } from "@/lib/members"
import { DaoFunctions, getAllFunctions } from "@/lib/selectors"
import { Dao } from "@/lib/utils"

const Home = () => {
  const { isConnected, address } = useAccount()

  const [dao, setDao] = useState<Dao | null>(null)
  const [members, setMembers] = useState<string[]>([])
  const [functions, setFunctions] = useState<DaoFunctions>({
    dao_access: [],
    governance: [],
    fallaback_router: [],
    all: [],
  })

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

        setDao({ access, router, gov, members, address: mainAddress })
      }
    })()
  }, [isConnected, address])

  // fetch members & selectors
  useEffect(() => {
    ;(async () => {
      if (dao) {
        setMembers(await getAllCurrentMembers(dao.members))
        setFunctions(await getAllFunctions(dao.router))
      }
    })()
  }, [dao])

  return (
    <>
      <MainLayout>
        <Heading as="h1">Welcome to Terrabio DAO</Heading>
        <Text as="i">Terrabio DAO contract: {dao?.address}</Text>

        {/* MEMBERS */}
        <Heading mt="5" as="h2">
          Members list
        </Heading>
        {members.map((member) => {
          return <Text key={member}>{member}</Text>
        })}

        {/* SELECTORS */}
        <Heading mt="5" as="h2">
          Selectors list
        </Heading>
        <Text mt="5" fontWeight="bold">
          DaoAccess:
        </Text>
        {functions.dao_access.map((fn) => {
          return (
            <Text key={fn.selector}>
              {fn.name}{" "}
              <Text as="span" color="gray.300">
                ({fn.selector})
              </Text>
            </Text>
          )
        })}
        <Text mt="5" fontWeight="bold">
          FallbackRouter:
        </Text>
        {functions.fallaback_router.map((fn) => {
          return (
            <Text key={fn.selector}>
              {fn.name}{" "}
              <Text as="span" color="gray.300">
                ({fn.selector})
              </Text>
            </Text>
          )
        })}
        <Text mt="5" fontWeight="bold">
          Governance:
        </Text>
        {functions.governance.map((fn) => {
          return (
            <Text key={fn.selector}>
              {fn.name}{" "}
              <Text as="span" color="gray.300">
                ({fn.selector})
              </Text>
            </Text>
          )
        })}
      </MainLayout>
    </>
  )
}

export default Home
