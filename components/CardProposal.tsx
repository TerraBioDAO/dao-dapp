import {
  Box,
  Text,
  Card,
  CardHeader,
  Flex,
  CardBody,
  Image,
  Divider,
  CardFooter,
  Button,
  IconButton,
  HStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import vote from '../../assets/vote.svg';

export const CardProposal = (props: any) => {
  const { listProposal } = props;

  return (
    <Box>
      <Wrap spacing={'24px'} justify={'center'}>
        {listProposal.map((item: any) => {
          let totalQuantity = 0;
          let totalValue = 0;
          return (
            <WrapItem>
              <Card minW={'xs'} key={item.id} boxShadow="base" bg={'darkness.500'}>
                <CardHeader>
                  <Flex justify={'space-between'}>
                    <Box>
                      <Text>Proposal #{item.id}</Text>
                      <Text fontSize={'sm'} color={'secondary.500'}>
                        {item.date}
                      </Text>
                    </Box>
                    <Image w={'64px'} src={item.avatar} alt="avatar" />
                  </Flex>
                </CardHeader>

                <Divider />

                <CardBody>
                  <Flex>
                    <Image src={vote} />
                    <Box w={'100%'}>
                      <Flex direction={'column'} justify={'space-between'}>
                        {item.contract.map((item: any) => {
                          totalQuantity += item.quantity;
                          totalValue += item.value * item.quantity;
                          return (
                            <Flex direction={'column'} justify={'space-around'}>
                              <Flex direction={'column'}>
                                <Text>Item :</Text>
                                <Text fontSize={'sm'} color={'secondary.500'}>
                                  {item.content}
                                </Text>
                              </Flex>
                              <Flex justify={'space-between'}>
                                <Text>${item.value}</Text>
                                <Text>Qty: {item.quantity}</Text>
                              </Flex>
                            </Flex>
                          );
                        })}
                      </Flex>
                    </Box>
                  </Flex>
                </CardBody>

                <Divider />

                <CardFooter>
                  <Flex w={'100%'} justify={'space-between'}>
                    <Box>
                      <Text fontSize={'sm'} color={'secondary.500'}>
                        x{totalQuantity} Items
                      </Text>
                      <Text>${totalValue}</Text>
                    </Box>
                    {item.is_completed ? (
                      <Box>
                        <Button leftIcon={<CheckIcon />} variant={'sm'}>
                          Completed
                        </Button>
                      </Box>
                    ) : item.is_rejected ? (
                      <Box>
                        <Button leftIcon={<CloseIcon />} variant={'solid'}>
                          Rejected
                        </Button>
                      </Box>
                    ) : (
                      <Box>
                        <HStack spacing={'24px'}>
                          <IconButton
                            aria-label='Search database'
                            icon={<CheckIcon />}
                          />
                          <IconButton
                            aria-label='Search database'
                            variant={'solid'}
                            icon={<CloseIcon />}
                          />
                        </HStack>
                      </Box>
                    )}
                  </Flex>
                </CardFooter>
              </Card>
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
};
