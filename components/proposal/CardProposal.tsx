import { useDao } from '@/lib/useDao';
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
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import { getProposal } from '@/lib/getProposal';
import { Proposal } from '@/interfaces/IProposal';
import Link from 'next/link';
import ButtonVoteProposal from './ButtonVoteProposal';
import ButtonExecuteProposal from './ButtonExecuteProposal';

export const CardProposal = (props: any) => {
  const { id } = props;
  const [proposal, setProposal] = useState<Proposal>()

  const { dao } = useDao()

  const getParams = async () => {
    if (!dao || !dao.gov) return;
    const data = await getProposal(dao.gov, id)
    setProposal(data)
  }

  useEffect(() => {
    try {
      getParams()
    } catch (error) {
      console.log(error)
    }

  }, [])

  return (
    <>
      {proposal && (
        <Grid
          templateAreas={`"img header" "img social"`}
          gridTemplateRows={'1fr 1fr'}
          gridTemplateColumns={'1fr 1fr'}
          gap="1"
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

                    {/* Button for vote on proposal */}
                    <ButtonVoteProposal
                      proposalId={id}
                      descision={1}
                    />

                    {/* Button for execute proposal */}
                    <ButtonExecuteProposal
                      proposalId={id}
                    />

                    <Link href={`/proposal/${id}`}>
                      <Button
                      >
                        + info
                      </Button>
                    </Link>
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
      )}
    </>
  );
};
