import { Contract } from "ethers"
import { Dispatch, SetStateAction } from "react"
import { prepareWriteContract } from "@wagmi/core"
import { FormatTypes } from "ethers/lib/utils.js"
import { readErrorData, TxProgression, _proceedCall } from "@/lib"

export const vote = async (
  dao: Contract,
  proposalId: number,
  descision: number,
  setTxProgression: Dispatch<SetStateAction<TxProgression>>,
  toast: Function
) => {
  setTxProgression("Waiting for confirmation")
  let config

  try {
    config = await prepareWriteContract({
      address: dao.address as `0x${string}`,
      abi: dao.interface.format(FormatTypes.json) as any,
      functionName: "vote(uint256,uint256)",
      args: [proposalId, descision],
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
