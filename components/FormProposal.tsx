import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Stack,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { HiOutlineHashtag } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";

export const FormProposal = () => {
  const [selectedVoteType, setSelectedVoteType] = useState("A");

  const handleVoteTypeChange = (event: any) => {
    setSelectedVoteType(event.target.value);
  };

  return (
    <Box as="form" w={"50vw"} bg={"darkness.900"} p={"8"} borderRadius={"20"}>
      <Stack>
        <Flex
          w={"90px"}
          p={"2"}
          borderRadius={"6"}
          align={"center"}
          bg={"primary.50"}
          justify={"center"}
        >
          <HiOutlineHashtag />
          <Text>101523</Text>
        </Flex>

        <FormControl>
          <FormLabel color={"primary.50"}>Title</FormLabel>
          <Input bg={"darkness.500"} placeholder="Ex: Ma Super Proposal" />
        </FormControl>

        <Flex>
          <HStack w={'100%'}>
            <FormControl>
              <FormLabel color={"primary.50"}>Thématique</FormLabel>
              <Select bg={"darkness.500"}>
                <option>Label 1</option>
                <option>Label 2</option>
                <option>Label 3</option>
                <option>Label 4</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>Timelock</FormLabel>
              <Select bg={"darkness.500"}>
                <option>15 DAYS</option>
                <option>15 DAYS (x2)</option>
                <option>15 DAYS (x4)</option>
                <option>15 DAYS (x8)</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>Vote type</FormLabel>
              <Select
                bg={"darkness.500"}
                value={selectedVoteType}
                onChange={handleVoteTypeChange}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Select>
            </FormControl>
          </HStack>
        </Flex>

        {selectedVoteType === "A" && (
          <Flex>
            <FormControl>
              <FormLabel color={"primary.50"}>A</FormLabel>
              <Input bg={"darkness.500"} placeholder="type a" />
            </FormControl>
          </Flex>
        )}
        {selectedVoteType === "B" && (
          <Flex justify={"space-between"}>
            <HStack w={'100%'}>
            <FormControl>
              <FormLabel color={"primary.50"}>A</FormLabel>
              <Input bg={"darkness.500"} placeholder="type a" />
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>B</FormLabel>
              <Input bg={"darkness.500"} placeholder="type b" />
            </FormControl>
            </HStack>
          </Flex>
        )}
        {selectedVoteType === "C" && (
          <Flex justify={"space-between"}>
            <HStack w={'100%'}>
            <FormControl>
              <FormLabel color={"primary.50"}>A</FormLabel>
              <Input bg={"darkness.500"} placeholder="type a" />
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>B</FormLabel>
              <Input bg={"darkness.500"} placeholder="type b" />
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>C</FormLabel>
              <Input bg={"darkness.500"} placeholder="type c" />
            </FormControl>
            </HStack>
          </Flex>
        )}
        {selectedVoteType === "D" && (
          <Flex justify={"space-between"}>
            <HStack w={'100%'}>
            <FormControl>
              <FormLabel color={"primary.50"}>A</FormLabel>
              <Input bg={"darkness.500"} placeholder="type a" />
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>B</FormLabel>
              <Input bg={"darkness.500"} placeholder="type b" />
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>C</FormLabel>
              <Input bg={"darkness.500"} placeholder="type c" />
            </FormControl>
            <FormControl>
              <FormLabel color={"primary.50"}>D</FormLabel>
              <Input bg={"darkness.500"} placeholder="type d" />
            </FormControl>
            </HStack>
          </Flex>
        )}

        <FormControl>
          <FormLabel color={"primary.50"}>Description</FormLabel>
          <Textarea bg={"darkness.500"} placeholder="Message" />
        </FormControl>

        <Flex justify={"end"}>
          <Button type="submit" leftIcon={<AiOutlineCheck />}>Completed</Button>
        </Flex>
      </Stack>
    </Box>
  );
};
