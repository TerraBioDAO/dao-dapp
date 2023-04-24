import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import {
  AiOutlineStar,
  AiOutlineEye,
  AiOutlinePlayCircle,
} from 'react-icons/ai';

import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

export const CardAnnonce = (props: any) => {
  const { listAnnonce } = props;

  return (
    <Box>
      <VStack>
        {listAnnonce.length > 0 && listAnnonce.map((item: any) => {
          return (
            <Grid
              templateAreas={`"img main"`}
              gridTemplateColumns={'1fr 1fr'}
              gap="1"
              key={item.id}
              p={'3'}
              maxW={'80vw'}
              bg={'darkness.900'}
              borderRadius={'20px'}
            >
              <GridItem marginRight={'3'} area={'img'}>
                <Image maxH={'300px'} borderRadius={'full'} border={'2px'} borderColor={'primary.50'} bg={'darkness.500'} src={item.avatar} />
              </GridItem>

              <GridItem
                p={'3'}
                w={'60vw'}
                area={'main'}
                bg={'darkness.500'}
                borderRadius={'16px'}
              >
                <Flex h={'100%'} direction={'column'} justify={'space-between'}>
                  <Flex justify={'space-between'}>
                    <Box>
                      <Text fontSize={'xl'} fontWeight={'bold'}>
                        {item.firstname} {item.lastname}
                      </Text>
                      <Text fontSize={'xs'}>{item.job_title}</Text>
                    </Box>
                    <Button colorScheme={'green'} borderRadius={'10px'}>Enroll Now</Button>
                  </Flex>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt utlabore et dolore magna
                    aliqua. Ut enum ad minim veniam, quis nostrud
                  </Text>
                  <Flex fontSize={'xs'} justify={'space-between'}>
                    <Flex align={'center'}>
                      <AiOutlineStar />
                      <Text m={'1'}>{item.rating}</Text>
                      <Text>Instructor Rating</Text>
                    </Flex>
                    <Flex align={'center'}>
                      <AiOutlineEye />
                      <Text m={'1'}>{item.students_nb}</Text>
                      <Text>Students</Text>
                    </Flex>
                    <Flex align={'center'}>
                      <AiOutlinePlayCircle />
                      <Text m={'1'}>Courses</Text>
                    </Flex>
                    <Flex>
                      <HStack>
                        <IconButton
                          aria-label='Search'
                          borderRadius={'full'}
                          colorScheme={'green'}
                          icon={<FaTwitter />}
                        />
                        <IconButton
                          aria-label='Search'
                          borderRadius={'full'}
                          colorScheme={'green'}
                          icon={<FaYoutube />}
                        />
                        <IconButton
                          aria-label='Search'
                          borderRadius={'full'}
                          colorScheme={'green'}
                          icon={<FaInstagram />}
                        />
                      </HStack>
                    </Flex>
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
