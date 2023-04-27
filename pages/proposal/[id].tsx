import { MainLayout } from '@/components/layouts/Main'
import { useRouter } from 'next/router'

const ProposalId = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <MainLayout>
            <p>ProposalId: {id}</p>
        </MainLayout>
    )
}

export default ProposalId