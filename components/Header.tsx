import {
    Box,
    Button,
    Text
} from '@chakra-ui/react';
import { useContract, useContractRead, useProvider, useAccount, usePrepareContractWrite, useContractWrite, useContractEvent } from 'wagmi';

import { TerrabioDaoABI } from "@/config/TerrabioDaoABI"
import { DaoAccessABI } from "@/config/DaoAccessABI"
import { FallbackRouterABI } from "@/config/FallbackRouterABI"
import { GovernanceABI, LibGovernanceABI } from "@/config/GovernanceABI"
import { useEffect } from 'react';
import { ButtonCreateProposal } from './proposal/ButtonCreateProposal';

export function Header() {
    const { address, isConnected } = useAccount()
    const provider = useProvider()

    // Test Contract
    const FallbackRouter = useContract({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi: FallbackRouterABI,
        signerOrProvider: provider,
    })

    const DaoAccess = useContract({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi: DaoAccessABI,
        signerOrProvider: provider,
    })

    const TerraBioDao = useContract({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi: TerrabioDaoABI,
        signerOrProvider: provider,
    })

    const Governance = useContract({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi: GovernanceABI,
        signerOrProvider: provider,
    })

    // Test Interact with Contract
    const { data: readData, isLoading: readLoading } = useContractRead({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi: FallbackRouterABI,
        functionName: 'getSelectorList'
    })
    
    // Event
    useContractEvent({
        address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
        abi: LibGovernanceABI,
        eventName: 'Proposed',
        listener(proposalId, owner) {
            console.log("useContractEvent", proposalId, owner)
        },
    })
    
    // Read contract
    const getFnImpl = async () => {
        if (!Governance) return;
        console.log('getFnImpl', await Governance.getProposal(0))
        console.log('getSelectorList', readData)
    }

    useEffect(() => {
        if (!address || !isConnected) return;
        getFnImpl()
    }, [address])

    console.log('Contract', FallbackRouter, DaoAccess, Governance, TerraBioDao)

    return (
        <>
            {isConnected ? (
                <Box>
                    <Text>Header</Text>
                    <Text>Account: {address}</Text>
                    <Text>FallbackRouter: {FallbackRouter?.address}</Text>
                    <Text>DaoAccess: {DaoAccess?.address}</Text>
                    <Text>TerraBioDao: {TerraBioDao?.address}</Text>

                    {/* <Button onClick={() => createProposal()} > Create Proposal </Button> */}
                    <ButtonCreateProposal />
                </Box>
            ) : (
                <Box>
                    <Text>Vous devez être connecter</Text>
                </Box>
            )}
        </>
    );
}