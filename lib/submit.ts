import { ProposalDraft } from "@/components/proposal/CreateProposal"
import { Contract, ethers } from "ethers"
import { Dispatch, SetStateAction } from "react"
import {
  writeContract,
  prepareWriteContract,
  SendTransactionResult,
} from "@wagmi/core"
import { ErrorFragment, FormatTypes } from "ethers/lib/utils.js"
import { readErrorData } from "./errors"

export type TxProgression = undefined | "Waiting for confirmation" | "Pending"

export const submit = async (
  dao: Contract,
  { startAt, votingPeriod, gracePeriod, threshold, calls }: ProposalDraft,
  setTxProgression: Dispatch<SetStateAction<TxProgression>>,
  toast: Function
) => {
  votingPeriod *= 86400
  gracePeriod *= 86400

  setTxProgression("Waiting for confirmation")
  let config

  console.log([startAt, votingPeriod, gracePeriod, threshold, calls])

  try {
    config = await prepareWriteContract({
      address: dao.address as `0x${string}`,
      abi: dao.interface.format(FormatTypes.json) as any,
      functionName: "propose(uint48,uint48,uint48,uint16,bytes[])",
      args: [startAt, votingPeriod, gracePeriod, threshold, calls],
    })
  } catch (e: any) {
    console.log(e)
    setTxProgression(undefined)
    toast({
      title: e.code === 4001 ? "Transaction aborted" : "Transaction failure",
      description:
        e.code === 4001 ? e.message : readErrorData(e.error.data.data).name,
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }

  if (config) {
    await _proceedCall(setTxProgression, toast, config)
  }
}

// process any call
const _proceedCall = async (
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
