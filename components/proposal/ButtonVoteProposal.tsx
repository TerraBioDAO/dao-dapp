import {
    useToast, Button
} from '@chakra-ui/react'
import { TxProgression } from '@/lib/utils';
import { vote } from '@/lib/vote';
import { useDao } from '@/lib/useDao';
import { useState } from 'react'

export default function ButtonVoteProposal(props: any) {
    const { proposalId, descision } = props;
    const toast = useToast()
    const [txProgression, setTxProgression] = useState<TxProgression>()

    const { dao } = useDao()

    return (
        <>
            <Button
                isLoading={
                    txProgression === "Waiting for confirmation" ||
                    txProgression === "Pending"
                }
                loadingText={txProgression}
                onClick={() =>
                    dao ? vote(dao.gov, proposalId, 1, setTxProgression, toast) : ""
                }
            >
                Vote on proposal {proposalId}
            </Button>
        </>
    )
}
