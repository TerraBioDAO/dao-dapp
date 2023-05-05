import { useDao } from '@/lib/useDao';
import {
    Box,
    Heading,
    VStack,
} from '@chakra-ui/react';
import { CardProposal } from './CardProposal';

/* !!! Warning

  - On a besoin de mettre des id ou un identifiant sur les proposals sinon les key des components react vont etre chiante

*/

export const ListCardProposals = () => {
    const { proposals } = useDao()

    // console.log('listCardArticle', proposals)

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
