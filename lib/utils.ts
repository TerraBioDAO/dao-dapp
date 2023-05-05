import { Contract } from "ethers"
import { Dispatch, SetStateAction } from "react"
import {
  writeContract,
  prepareWriteContract,
  SendTransactionResult,
} from "@wagmi/core"

export type Dao = {
  address: string
  access: Contract
  router: Contract
  gov: Contract
  members: Contract
  proposals: Contract
}

// write contract
export type TxProgression = undefined | "Waiting for confirmation" | "Pending"

export const _proceedCall = async (
  setTxProgression: Dispatch<SetStateAction<TxProgression>>,
  toast: Function,
  config: any
) => {
  let tx: SendTransactionResult
  try {
    tx = await writeContract(config)
    setTxProgression("Pending")
    toast({
      title: "Transaction in progress",
      description: `Hash: ${tx.hash}`,
      status: "info",
      duration: 9000,
      isClosable: true,
    })
  } catch (e: any) {
    setTxProgression(undefined)
    console.log(e)
    console.log(e.message)
    toast({
      title: e.code === 4001 ? "Transaction aborted" : "Transaction failure",
      description: e.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    })
    return
  }

  let result = await tx.wait()
  setTxProgression(undefined)
  toast({
    title: "Transaction succeeded",
    description: `Mined in block ${result.blockNumber}`,
    status: "success",
    duration: 9000,
    isClosable: true,
  })
}
