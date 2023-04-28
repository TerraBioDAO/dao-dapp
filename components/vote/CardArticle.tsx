import { execute } from '@/lib/execute';
import { useDao } from '@/lib/useDao';
import { TxProgression } from '@/lib/utils';
import { vote } from '@/lib/vote';
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Flex,
  Tag,
  HStack,
  IconButton,
  VStack,
  useToast,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';

/* !!! Warning

  - On a besoin de mettre des id ou un identifiant sur les proposals sinon les key des components react vont etre chiante

*/

export const CardArticle = () => {
  const toast = useToast()
  const [txProgression, setTxProgression] = useState<TxProgression>()

  const { dao, proposals } = useDao()

  return (
    <Box>
      <VStack spacing={'10px'}>
        {proposals.length > 0 && proposals.map((proposal: any, i: any) => {
          return (
            <Grid
              templateAreas={`"img header" "img social"`}
              gridTemplateRows={'1fr 1fr'}
              gridTemplateColumns={'1fr 1fr'}
              gap="1"
              key={i}
              bg={'darkness.500'}
              borderRadius={'20px'}
              p={'6'}
              maxW={'80vw'}
            >
              <GridItem area={'img'}>
                <Image src={"/assets/article.svg"} />
              </GridItem>
              <GridItem w={'60vw'} area={'header'}>
                <Flex justify={'space-between'}>
                  <Box>
                    <Text>{proposal.active}</Text>
                    <Flex>
                      <HStack spacing={'10px'}>
                        {[proposal.startAt, proposal.gracePeriod, proposal.endAt, Number(proposal.membersVoted)].map((tag: any, i: number) => {
                          return <Tag key={tag + i.toString()} fontSize={'9'} color={'secondary.500'} borderRadius={'full'}>{tag}</Tag>;
                        })}
                      </HStack>
                    </Flex>
                  </Box>
                  <IconButton
                    aria-label='Search database'
                    borderRadius={'full'}
                    icon={<AiTwotoneHeart />}
                  />
                </Flex>
              </GridItem>

              <GridItem area={'social'}>
                <Flex align={'center'} justify={'space-between'}>
                  <Flex>
                    <HStack>
                      <Image w={'50px'} src={"https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-373-456325-512.png"} />
                      <Box>
                        <Text>{proposal.proposer}</Text>
                        <Button
                          isLoading={
                            txProgression === "Waiting for confirmation" ||
                            txProgression === "Pending"
                          }
                          loadingText={txProgression}
                          onClick={() =>
                            dao ? vote(dao.gov, 1, 1, setTxProgression, toast) : ""
                          }
                        >
                          Vote on proposal {i + 1}
                        </Button>

                        <Button
                          isLoading={
                            txProgression === "Waiting for confirmation" ||
                            txProgression === "Pending"
                          }
                          loadingText={txProgression}
                          onClick={() =>
                            dao ? execute(dao?.gov, 1, setTxProgression, toast) : ""
                          }
                        >
                          Execute {i + 1}
                        </Button>
                      </Box>
                    </HStack>
                  </Flex>
                  <Flex>
                    <HStack>
                      <Text fontSize={'xs'} color={'secondary.500'}>{Number(proposal.nbYes)} Yes</Text>
                      <Text fontSize={'xs'} color={'secondary.500'}>{Number(proposal.nbNo)} No</Text>
                      <Text fontSize={'xs'} color={'secondary.500'}>{Number(proposal.nbNota)} Nota</Text>
                    </HStack>
                  </Flex>
                </Flex>
              </GridItem>
            </Grid>
          );
        })}
      </VStack>
    </Box>
  );
};
