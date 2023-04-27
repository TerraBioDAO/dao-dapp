import { useContractRead } from "wagmi"
import contracts from "@/lib/contracts.json"
import { Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getProposal } from "@/lib/getProposal"
import { useDao } from "@/lib/useDao"
import { Proposal } from "./IProposal"
// // console.log(Date.now() / 1000 + 60, 86400, 0, 8000)



export function GetProposalId(props: any) {
    const { id } = props
    const { dao, members, functions } = useDao()
    const [data, setData] = useState<Proposal | null>()
    const [error, setError] = useState<any>()

    useEffect(() => {
        if (!id || !dao) return;

        const init = async () => {
            const proposal = await getProposal(dao.gov, id)

            if (!proposal) return

            setData(proposal)
        }

        try {
            init()
        } catch (err) {
            setError(err)
        }
    }, [id])

    return (
        <>
            {data ? (
                <Box>
                    <Text>Proposal : {id} </Text>
                    <Text> ---- Status ---- </Text>
                    <Text>active : {data.active.toString()} </Text>
                    <Text>proceeded : {data.proceeded.toString()} </Text>
                    <Text>cancelled : {data.cancelled.toString()} </Text>
                    <Text> ---- Timing ---- </Text>
                    <Text>startAt : {data.startAt.toString()} </Text>
                    <Text>endAt : {data.endAt.toString()} </Text>
                    <Text>gracePeriod : {data.gracePeriod.toString()} </Text>
                    <Text> ---- Params ---- </Text>
                    <Text>threshold : {data.threshold.toString()} </Text>
                    <Text> ---- Result ---- </Text>
                    <Text>nbYes : {data.nbYes.toString()} </Text>
                    <Text>nbNo : {data.nbNo.toString()} </Text>
                    <Text>nbNota : {data.nbNota.toString()} </Text>
                    <Text>membersVoted : {data.membersVoted.toString()} </Text>
                    <Text> ---- Info ---- </Text>
                    <Text>proposer : {data.proposer.toString()} </Text>
                    <Text> ---- Content ---- </Text>
                    <Text>calls : {JSON.stringify(data.calls)} </Text>
                    <Text>results : {JSON.stringify(data.results)} </Text>
                </Box>
            ) : (
                <Text>Rien à été trouver, </Text>
            )}

            {error && (
                <div>An error occurred preparing the transaction: {error.message}</div>
            )}
        </>
    )
}
