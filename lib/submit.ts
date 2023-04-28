import { ProposalDraft } from "@/components/proposal/CreateProposal"
import { Contract } from "ethers"
import { Dispatch, SetStateAction } from "react"
import { prepareWriteContract } from "@wagmi/core"
import { FormatTypes } from "ethers/lib/utils.js"
import { readErrorData } from "./errors"
import { TxProgression, _proceedCall } from "./utils"

export const submit = async (
  dao: Contract,
  { startAt, votingPeriod, gracePeriod, threshold, calls }: ProposalDraft,
  setTxProgression: Dispatch<SetStateAction<TxProgression>>,
  toast: Function
) => {
  console.log(startAt, votingPeriod, gracePeriod, threshold, calls)
  votingPeriod *= 86400
  gracePeriod *= 86400
  console.log(startAt, votingPeriod, gracePeriod, threshold, calls)

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
