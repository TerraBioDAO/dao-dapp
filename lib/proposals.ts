import { Contract } from "ethers"
import { Proposal } from "@/components/proposal/IProposal"

export const getAllProposals = async (
  gov: Contract
): Promise<Proposal[]> => {
  try {

    const proposals = await gov.getAllProposals()
    let proposalsTmp: Proposal[] = [];

    proposals.map((proposal: any, i: any) => {
      const [
        // --- status ---
        active, proceeded, cancelled,
        // --- timing ---
        startAt, endAt, gracePeriod,
        // --- vote parameters ---
        threshold, // 0 ~ 10000
        // --- result ---
        nbYes, nbNo, nbNota, membersVoted,
        // --- vote info ---
        proposer,
        // --- content ---
        calls, results
      ] = proposal

      proposalsTmp.push({
        active, proceeded, cancelled,
        startAt, endAt, gracePeriod,
        threshold,
        nbYes, nbNo, nbNota, membersVoted,
        proposer,
        calls, results
      } as Proposal)
    })

    return proposalsTmp

  } catch (error) {
    console.log(error)
    return []
  }

}
