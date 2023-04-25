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

export const CardProposal = (props: any) => {
  const { listProposal } = props;

  return (
    <Box my={"6"}>
      <Wrap spacing={'24px'} justify={'center'}>
        {listProposal.length > 0 && listProposal.map((item: any) => {
          let totalQuantity = 0;
          let totalValue = 0;
          return (
            <WrapItem key={item.id}>
              <Card minW={'xs'} minH={'100%'} key={item.id} boxShadow="base" bg={'darkness.500'}>
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
                    <Box>
                      <Image src="/assets/vote.svg" />
                    </Box>
                    <Box w={'100%'}>
                      <Flex direction={'column'} justify={'space-between'}>
                        {item.contract.map((item: any) => {
                          totalQuantity += item.quantity;
                          totalValue += item.value * item.quantity;
                          return (
                            <Flex key={item.id} direction={'column'} justify={'space-around'}>
                              <Flex direction={'column'}>
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