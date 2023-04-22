import {
    Box,
    Text
} from '@chakra-ui/react';
import { useContract, useContractRead, useAccount } from 'wagmi';

import { TerrabioDaoABI } from "@/config/TerrabioDaoABI"
import { DaoAccessABI } from "@/config/DaoAccessABI"
import { FallbackRouterABI } from "@/config/FallbackRouterABI"
import { useEffect } from 'react';

export function Header() {
    const { address, isConnected } = useAccount()

    // Test Contract
    const FallbackRouter = useContract({
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: FallbackRouterABI,
    })

    const DaoAccess = useContract({
        address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
        abi: DaoAccessABI,
    })

    const TerraBioDao = useContract({
        address: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
        abi: TerrabioDaoABI,
    })

    // Test Interact with Contract
    const { data: readData, isLoading: readLoading } = useContractRead({
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        abi: FallbackRouterABI,
        functionName: 'getSelectorList',
        args: [],
    })

    const getFnImpl = async () => {
        if (!readData) return;
        console.log('getFnImpl', readData,)
    }

    useEffect(() => {
        if (!address) return;
        getFnImpl()
    }, [address])

    console.log('Contract', FallbackRouter, DaoAccess, TerraBioDao)

    return (
        <>
            {isConnected ? (
                <Box>
                    <Text>Header</Text>
                    <Text>Account: {address}</Text>
                    <Text>FallbackRouter: {FallbackRouter?.address}</Text>
                    <Text>DaoAccess: {DaoAccess?.address}</Text>
                    <Text>TerraBioDao: {TerraBioDao?.address}</Text>
                </Box>
            ) : (
                <Box>
                    <Text>Vous devez être connecter</Text>
                </Box>
            )}
        </>
    );
}