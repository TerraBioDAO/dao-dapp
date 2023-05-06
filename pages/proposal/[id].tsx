import { MainLayout } from '@/components/layouts/Main'
import { Proposal } from '@/interfaces/IProposal'
import { getProposal } from '@/lib'
import { useDao } from '@/hooks/useDao'
import { Text, Heading, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import HeroProposalId from '@/components/proposal/HeroProposalId'

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

            <Grid py="5" minH="50vh">
                {proposal ? (
                    <HeroProposalId
                        proposal={proposal}
                        proposalId={id}
                    />
                ) : (
                    <Text> Proposal introuvable ! </Text>
                )}
            </Grid>

        </MainLayout>
    )
}

export default ProposalId