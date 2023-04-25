import { Contract, Event as EtherEvent, Signer } from "ethers"
import { getContract } from "@wagmi/core"
import contracts from "../lib/contracts.json"

// filtering => because not getter so far
export const getAllCurrentMembers = async (
  members: Contract
): Promise<string[]> => {
  const joinned = members.filters.MembersUpdated(null, true)
  const quitted = members.filters.MembersUpdated(null, false)

  const membersEntries = (await members.queryFilter(joinned)).map((event) =>
    event.args
      ? { addr: event.args[0], block: event.blockNumber }
      : { addr: "", block: 0 }
  )
  const membersExits = (await members.queryFilter(quitted)).map((event) =>
    event.args
      ? { addr: event.args[0], block: event.blockNumber }
      : { addr: "", block: 0 }
  )

  const membersList = membersEntries.filter((member) => {
    if (member.addr == "") return false
    const same = membersExits.find((elem) => elem.addr === member.addr)
    if (same) {
      return member.block > same.block
    }
    return member
  })

  return membersList.map((member) => member.addr)
}

// const _filterMembers = (in:EtherEvent[],out:EtherEvent[]) => {
//   //
// }
