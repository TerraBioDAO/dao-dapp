import {
    useToast, Button
} from '@chakra-ui/react'
import { TxProgression, vote } from '@/lib';
import { useDao } from '@/hooks/useDao';
import { useState } from 'react'

export default function ButtonVoteProposal(props: any) {
    const { proposalId, descision } = props;
    const toast = useToast()
    const [txProgression, setTxProgression] = useState<TxProgression>()

    const { dao } = useDao()

    return (
        <Button
            my={"3"}
            isLoading={
                txProgression === "Waiting for confirmation" ||
                txProgression === "Pending"
            }
            loadingText={txProgression}
            onClick={() =>
                dao ? vote(dao.gov, proposalId, descision, setTxProgression, toast) : ""
            }
        >
            Vote on proposal {proposalId}
        </Button>
    )
}
