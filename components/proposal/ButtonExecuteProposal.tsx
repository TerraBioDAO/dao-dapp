import {
    useToast, Button
} from '@chakra-ui/react'
import { TxProgression } from '@/lib/utils';
import { execute } from '@/lib/execute';
import { useDao } from '@/lib/useDao';
import { useState } from 'react'

export default function ButtonVoteProposal(props: any) {
    const { proposalId } = props;
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
                    dao ? execute(dao?.gov, proposalId, setTxProgression, toast) : ""
                }
            >
                Execute {proposalId}
            </Button>
        </>
    )
}
