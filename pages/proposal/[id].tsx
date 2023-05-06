import { MainLayout } from '@/components/layouts/Main'
import ButtonExecuteProposal from '@/components/proposal/ButtonExecuteProposal'
import FormVoteProposal from '@/components/proposal/FormVoteProposal'
import { Proposal } from '@/interfaces/IProposal'
import { getProposal } from '@/lib'
import { useDao } from '@/hooks/useDao'
import { Box, Text, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ProposalId = () => {
    const router = useRouter()
    const { id } = router.query
    const [proposal, setProposal] = useState<Proposal>()

    const { dao } = useDao()

    const getParams = async () => {
        if (!dao || !dao.gov) return;
        const data = await getProposal(dao.gov, Number(id))
        // console.log('getParams', data)
        setProposal(data)
    }

    useEffect(() => {
        getParams()
    }, [])

    return (
        <MainLayout>

            <Heading>Proposal ID: {id}</Heading>

            {proposal ? (
                <Box>
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
                    <Text>calls : {JSON.stringify(proposal.calls)} </Text>
                    <Text>results : {JSON.stringify(proposal.results)} </Text>

                    {/* Form for vote on proposal */}
                    <FormVoteProposal
                        proposalId={id}
                    />

                    {/* Button for execute proposal */}
                    <ButtonExecuteProposal
                        proposalId={id}
                    />

                </Box>
            ) : (
                <Text> Proposal introuvable ! </Text>
            )}

        </MainLayout>
    )
}

export default ProposalId