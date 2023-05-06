import { Box, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { getProposal } from "@/lib/getProposal"
import { useDao } from "@/hooks/useDao"
import { Proposal } from "@/interfaces/IProposal"
import { ErrorContext } from "@/providers/ErrorProvider"

export function GetProposalId() {
    const [id, setId] = useState<number>()

    const { dao } = useDao()
    const [data, setData] = useState<Proposal | null>()
    const { error, setError } = useContext(ErrorContext)

    useEffect(() => {
        if (!id || !dao) return;
        (async () => {
            const proposal = await getProposal(dao.gov, Number(id))
            if (!proposal) setError(`ID (${id}) not exist`)
            setData(proposal)
        })()
    }, [id])

    return (
        <>
            <Heading>Get Proposal By ID</Heading>
            <Flex justify="center">
                <Box
                    as="form"
                    w={"50vw"}
                    bg={"darkness.900"}
                    p={"8"}
                    borderRadius={"20"}
                >
                    <Stack>
                        {/* Form */}
                        <FormControl>
                            <FormLabel color={"primary.50"}>
                                Id de la proposal ( {id} )
                            </FormLabel>
                            <Input
                                type="number"
                                bg={"darkness.500"}
                                placeholder="Entrer id '1'"
                                onChange={(e: any) => setId(e.target.value)}
                            />
                        </FormControl>

                        {/* Results */}
                        {id && data ? (
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
                    </Stack>
                </Box>
            </Flex>

            {error && (
                <div>An error occurred preparing the transaction: {error}</div>
            )}
        </>
    )
}
