import { Contract } from "ethers"
import { prepareWriteContract } from "@wagmi/core"
import { Dispatch, SetStateAction } from "react"
import { TxProgression, _proceedCall, readErrorData } from "@/lib"
import { FormatTypes } from "ethers/lib/utils.js"

export const execute = async (
  dao: Contract,
  proposalId: number,
  setTxProgression: Dispatch<SetStateAction<TxProgression>>,
  toast: Function
) => {
  setTxProgression("Waiting for confirmation")
  console.log('dcsd', dao, proposalId, setTxProgression, toast)
  let config

  try {
    config = await prepareWriteContract({
      address: dao.address as `0x${string}`,
      abi: dao.interface.format(FormatTypes.json) as any,
      functionName: "execute(uint256)",
      args: [proposalId],
    })
  } catch (e: any) {
    console.log(e)
    setTxProgression(undefined)

    // message:"DAO:error"
    // data:"0xaaaabbbb00001"

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
