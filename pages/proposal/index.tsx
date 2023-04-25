import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { fetchSigner, getNetwork, getContract } from "@wagmi/core"
import { Box, Container, Text } from "@chakra-ui/react"
import contracts from "../../lib/contracts.json"

import { FormProposal } from "@/components/proposal/FormProposal"
import { CardProposal } from "@/components/proposal/CardProposal"
import { MainLayout } from "@/components/layouts/Main"
import { Dao } from "@/lib/utils"
import CreateProposal from "@/components/proposal/CreateProposal"

const listProposal = [
  {
    id: 0,
    avatar: "https://cdn.iconscout.com/icon/free/png-512/avatar-375-456327.png",
    date: "22 Février 2023, 12.21PM",
    contract: [
      { id: 0, content: "Name #1", value: 12.5, quantity: 1 },
      { id: 1, content: "Name #2", value: 6, quantity: 2 },
    ],
    is_rejected: 0,
    is_completed: 0,
  },
  {
    id: 1,
    avatar:
      "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-366-456318-512.png",
    date: "24 Décembre 2022, 23.59PM",
    contract: [{ id: 0, content: "Name #404", value: 1, quantity: 404 }],
    is_rejected: 1,
    is_completed: 0,
  },
  {
    id: 2,
    avatar:
      "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-373-456325-512.png",
    date: "21 Mars 2023, 06.48AM",
    contract: [
      { id: 0, content: "Name #1792", value: 10, quantity: 8 },
      { id: 1, content: "Name #1789", value: 14, quantity: 7 },
      { id: 2, content: "Name #1789", value: 4, quantity: 8 },
    ],
    is_rejected: 0,
    is_completed: 1,
  },
]

const Proposal = () => {
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

        setDao({ access, router, gov, members, address: mainAddress })
      }
    })()
  }, [isConnected, address])

  return (
    <Box>
      <MainLayout>
        <CreateProposal />

        <CardProposal listProposal={listProposal} />
      </MainLayout>
    </Box>
  )
}

export default Proposal
