import ButtonExecuteProposal from '@/components/proposal/ButtonExecuteProposal'
import FormVoteProposal from '@/components/proposal/FormVoteProposal'
import { Box, Text, Flex, HStack, Tag } from '@chakra-ui/react'
import ChartResultYesNo from '@/components/proposal/ChartResultYesNo'

export default function HeroProposalId(props: any) {
    const { proposalId, proposal } = props;

    return (
        <Box>
            <Flex justify={'space-between'}>

                <Box w="65%">
                    <Text> ---- Status ---- </Text>
                    <Text>active : {proposal.active.toString()} </Text>
                    <Text>proceeded : {proposal.proceeded.toString()} </Text>
                    <Text>cancelled : {proposal.cancelled.toString()} </Text>
                    <Text> ---- Timing ---- </Text>
                    <Text>startAt : {proposal.startAt.toString()} </Text>
                    <Text>endAt : {proposal.endAt.toString()} </Text>
                    <Text>gracePeriod : {proposal.gracePeriod.toString()} </Text>
                    <Text> ---- Params ---- </Text>
                    <Text>threshold : {proposal.threshold.toString()} </Text>
                    <Text> ---- Result ---- </Text>
                    <Text>nbYes : {proposal.nbYes.toString()} </Text>
                    <Text>nbNo : {proposal.nbNo.toString()} </Text>
                    <Text>nbNota : {proposal.nbNota.toString()} </Text>
                    <Text>membersVoted : {proposal.membersVoted.toString()} </Text>
                    <Text> ---- Info ---- </Text>
                    <Text>proposer : {proposal.proposer.toString()} </Text>
                    <Text> ---- Content ---- </Text>
                    <Text maxWidth="320px">calls : {JSON.stringify(proposal.calls)} </Text>
                    <Text>results : {JSON.stringify(proposal.results)} </Text>
                </Box>

                <Flex w="35%" direction="column" justify={'center'} alignContent={"center"}>

                    <Text>Author: {proposal.proposer.toString()}</Text>

                    {/* Status active/proceeded/cancelled */}
                    <HStack spacing={'10px'} my={2} justify={'center'}>
                        {[
                            { id: 0, label: "Active: ", value: proposal.active.toString() },
                            { id: 1, label: "Proceeded: ", value: proposal.proceeded.toString() },
                            { id: 2, label: "Cancelled: ", value: proposal.cancelled.toString() }
                        ].map((tag: any, i: number) => {
                            return <Tag key={tag.id} p={2} fontSize={'10'} color={'secondary.500'} borderRadius={'full'}>
                                <Text>{tag.label}</Text>
                                <Text>{tag.value}</Text>
                            </Tag>;
                        })}
                    </HStack>

                    {/* Time start/grace/end */}
                    <HStack spacing={'10px'} my={2} justify={'center'}>
                        {[
                            { id: 0, label: "StartAt: ", value: proposal.startAt },
                            { id: 1, label: "gracePeriod: ", value: proposal.gracePeriod },
                            { id: 2, label: "End: ", value: proposal.endAt }
                        ].map((tag: any, i: number) => {
                            return <Tag key={tag.id} p={2} fontSize={'10'} color={'secondary.500'} borderRadius={'full'}>
                                <Text>{tag.label}</Text>
                                <Text>{tag.value}</Text>
                            </Tag>;
                        })}
                    </HStack>

                    {/* Total Voters/limit*/}
                    <HStack spacing={'10px'} my={2} justify={'center'}>
                        {[
                            { id: 0, label: "Voters: ", value: Number(proposal.membersVoted) },
                            { id: 1, label: "Threshold: ", value: Number(proposal.threshold) }
                        ].map((tag: any, i: number) => {
                            return <Tag key={tag.id} p={2} fontSize={'10'} color={'secondary.500'} borderRadius={'full'}>
                                <Text>{tag.label}</Text>
                                <Text>{tag.value}</Text>
                            </Tag>;
                        })}
                    </HStack>

                    {/* Chart result vote */}
                    <ChartResultYesNo
                        result={{
                            nbYes: Number(proposal.nbYes),
                            nbNo: Number(proposal.nbNo),
                            nbNota: Number(proposal.nbNota),
                            membersVoted: Number(proposal.membersVoted),
                        }}
                    />

                    {/* Form for vote on proposal */}
                    <FormVoteProposal
                        proposalId={proposalId}
                    />

                    {/* Button for execute proposal */}
                    <ButtonExecuteProposal
                        proposalId={proposalId}
                    />

                </Flex>

            </Flex>


        </Box>
    )
}
