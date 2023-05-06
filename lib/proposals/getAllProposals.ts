import { Contract } from "ethers"

export const getAllProposals = async (
  proposals: Contract
): Promise<any[]> => {

  try {
    const proposalsEntries = (await proposals.queryFilter("Proposed"))
    return proposalsEntries.map(proposal => proposal)

  } catch (error) {
    console.log(error)
    return [].map(e => e)
  }
}