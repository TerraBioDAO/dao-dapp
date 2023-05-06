import { useDao } from '@/hooks/useDao';
import {
    Box,
    Heading,
    VStack,
} from '@chakra-ui/react';
import { CardProposal } from './CardProposal';

export const ListCardProposals = () => {
    const { proposals } = useDao()

    return (
        <Box>
            <Heading>List Proposals</Heading>
            <VStack spacing={'10px'}>
                {proposals.length > 0 && proposals.map((proposal: any, i: any) => {
                    return (
                        <Box key={i} >
                            <CardProposal id={Number(proposal.args[0])} />
                        </Box>

                    );
                })}
            </VStack>
        </Box>
    );
};
