import { useContractRead } from "wagmi"
import contracts from "@/lib/contracts.json"
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getProposal } from "@/lib/getProposal"
import { useDao } from "@/lib/useDao"
import { Proposal } from "@/interfaces/IProposal"
// // console.log(Date.now() / 1000 + 60, 86400, 0, 8000)


export function GetProposalId() {
    const [id, setId] = useState<string | number>("")
    const [search, setSearch] = useState(false)

    const { dao } = useDao()
    const [data, setData] = useState<Proposal | null>()
    const [error, setError] = useState<any>()

    useEffect(() => {
        if (!id || !dao) return;

        const init = async () => {
            const proposal = await getProposal(dao.gov, Number(id))
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

                        <Button onClick={() => setSearch(!search ? true : false)}>
                            Get Proposal
                        </Button>


                        {/* Results */}
                        {id && search && data ? (
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
                <div>An error occurred preparing the transaction: {error.message}</div>
            )}
        </>
    )
}
