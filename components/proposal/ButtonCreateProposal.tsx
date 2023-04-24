import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { GovernanceABI } from "@/config/GovernanceABI"
import { Button } from "@chakra-ui/react"

// console.log(Date.now() / 1000 + 60, 86400, 0, 8000)

export function ButtonCreateProposal() {
    const { config, error } = usePrepareContractWrite({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi: GovernanceABI,
        functionName: 'propose',
        args: [1682350011, 86400, 0, 8000, []]
    })

    const { write } = useContractWrite(config)

    return (
        <>
            {config && (
                <Button onClick={() => write?.()}>Create Proposal</Button>
            )}

            {error && (
                <div>An error occurred preparing the transaction: {error.message}</div>
            )}
        </>
    )
}