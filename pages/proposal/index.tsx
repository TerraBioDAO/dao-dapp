import {
    Box,
    Text
} from '@chakra-ui/react';
import { HeaderProposal } from '@/components/proposal/HeaderProposal';
import { MainLayout } from '@/components/layouts/Main';

export default function ProposalPage() {

    return (
        <Box>

            <Text>Proposal</Text>
            <HeaderProposal />

        </Box>
    );
}