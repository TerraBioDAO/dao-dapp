import { Contract } from "ethers"
import { Proposal } from "@/interfaces/IProposal"

export const getProposal = async (
    gov: Contract,
    proposalId: number
) => {
    try {

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
        ] = await gov.getProposal(proposalId)

        if (!startAt) return

        return {
            active, proceeded, cancelled,
            startAt, endAt, gracePeriod,
            threshold,
            nbYes, nbNo, nbNota, membersVoted,
            proposer,
            calls, results
        } as Proposal

    } catch (error) {
        console.log(error)
    }

}
