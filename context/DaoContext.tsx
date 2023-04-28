import { DaoMethods, loadDaoMethods } from "@/lib/selectors"
import { Dao } from "@/lib/utils"
import { ReactNode, createContext, useEffect, useState } from "react"
import contracts from "../lib/contracts.json"
import { fetchSigner, getNetwork, getContract } from "@wagmi/core"
import { useAccount, useChainId, useNetwork } from "wagmi"
import { getAllCurrentMembers } from "@/lib/members"
import { getAllProposals } from "@/lib/proposals"
import { Proposal } from "@/components/proposal/IProposal"

type Props = {
  children: ReactNode
}

type DaoContextType = {
  dao: Dao | null
  members: string[]
  proposals: Proposal[]
  functions: DaoMethods
}

export const DaoContext = createContext<DaoContextType>({
  dao: null,
  members: [],
  proposals: [],
  functions: [],
})

const DaoProvider = ({ children }: Props) => {
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()

  const [dao, setDao] = useState<Dao | null>(null)
  const [members, setMembers] = useState<string[]>([])
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [functions, setFunctions] = useState<DaoMethods>([])
  // proposals

  // fetch contracts
  useEffect(() => {
    setTimeout(() => {
      ;(async () => {
        const signer = await fetchSigner()
        // create Provider read-only
        const chain = getNetwork().chain
        if (signer && chain && chain.id === 31337) {
          const mainAddress = contracts.addresses[chain.id].main
          const abis = contracts.abis

          // implementation
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

          // libraries
          console.log("load contract")
          const members = getContract({
            address: mainAddress,
            abi: abis.lib_members,
            signerOrProvider: signer,
          })
          // .on("Proposed", (proposalId, proposer) => {
          //   console.log(proposalId)
          //   console.log(proposer)
          // })

          setDao({ access, router, gov, members, address: mainAddress })
        } else {
          setDao(null)
        }
      })()
    }, 500) // small timeout to load at the first render
  }, [isConnected, address, chain?.id])

  // fetch members & selectors
  useEffect(() => {
    ;(async () => {
      if (dao) {
        // console.log('DaoContext', dao.gov, await getAllProposals(dao.gov))
        dao.members.on("MembersUpdated", (address, bool) => {
          console.log(address)
          console.log(bool)
        })
        setMembers(await getAllCurrentMembers(dao.members))
        setProposals(await getAllProposals(dao.gov))
        setFunctions(await loadDaoMethods(dao.router))
      }
    })()
  }, [dao])

  return (
    <DaoContext.Provider value={{ dao, members, proposals, functions }}>
      {children}
    </DaoContext.Provider>
  )
}

export default DaoProvider
