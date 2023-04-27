import { DaoMethods, loadDaoMethods } from "@/lib/selectors"
import { Dao } from "@/lib/utils"
import { ReactNode, createContext, useEffect, useState } from "react"
import contracts from "../lib/contracts.json"
import { fetchSigner, getNetwork, getContract } from "@wagmi/core"
import { useAccount, useChainId, useNetwork } from "wagmi"
import { getAllCurrentMembers } from "@/lib/members"

type Props = {
  children: ReactNode
}

type DaoContextType = {
  dao: Dao | null
  members: string[]
  functions: DaoMethods
}

export const DaoContext = createContext<DaoContextType>({
  dao: null,
  members: [],
  functions: [],
})

const DaoProvider = ({ children }: Props) => {
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()

  const [dao, setDao] = useState<Dao | null>(null)
  const [members, setMembers] = useState<string[]>([])
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
        setMembers(await getAllCurrentMembers(dao.members))
        setFunctions(await loadDaoMethods(dao.router))
      }
    })()
  }, [dao])

  return (
    <DaoContext.Provider value={{ dao, members, functions }}>
      {children}
    </DaoContext.Provider>
  )
}

export default DaoProvider
