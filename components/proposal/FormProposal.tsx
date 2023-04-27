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
} from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { HiOutlineHashtag } from "react-icons/hi"
import { AiOutlineCheck } from "react-icons/ai"
import { GetProposalId } from "./GetProposal"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import contracts from "@/lib/contracts.json"

// export const FormProposal = () => {
//   const [selectedVoteType, setSelectedVoteType] = useState("Yes/No")
//   const [timelock, setTimelock] = useState<string>("1") // 24H in ms

//   const { config, error } = usePrepareContractWrite({
//     address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
//     abi: contracts.abis.governance,
//     functionName: "propose",
//     args: [Date.now(), 86400, 0, 8000, []],
//   })

//   const { write } = useContractWrite(config)

//   // useEffect(() => {
//   //   console.log('effect timelock', timelock)
//   // }, [timelock])

//   const handleVoteTypeChange = (event: any) => {
//     setSelectedVoteType(event.target.value)
//   }

//   return (
//     <Flex justify={"center"}>
//       <Box as="form" w={"50vw"} bg={"darkness.900"} p={"8"} borderRadius={"20"}>
//         <Stack>
//           <Flex
//             w={"90px"}
//             p={"2"}
//             borderRadius={"6"}
//             align={"center"}
//             bg={"primary.50"}
//             justify={"center"}
//           >
//             <HiOutlineHashtag />
//             <Text>101523</Text>
//           </Flex>

//           <FormControl>
//             <FormLabel color={"primary.50"}>Title</FormLabel>
//             <Input bg={"darkness.500"} placeholder="Ex: Ma Super Proposal" />
//           </FormControl>

//           <Flex>
//             <HStack w={"100%"}>
//               <FormControl>
//                 <FormLabel color={"primary.50"}>Thématique</FormLabel>
//                 <Select bg={"darkness.500"}>
//                   <option>Label 1</option>
//                   <option>Label 2</option>
//                   <option>Label 3</option>
//                   <option>Label 4</option>
//                 </Select>
//               </FormControl>
//               <FormControl>
//                 <FormLabel color={"primary.50"}>
//                   Timelock ({timelock} days)
//                 </FormLabel>
//                 <Select
//                   onChange={(e) => setTimelock(e.target.value)}
//                   bg={"darkness.500"}
//                 >
//                   <option value="1">1 DAYS</option>
//                   <option value="5">5 DAYS (x5)</option>
//                   <option value="10">10 DAYS (x10)</option>
//                   <option value="15">15 DAYS (x15)</option>
//                 </Select>
//               </FormControl>
//               <FormControl>
//                 <FormLabel color={"primary.50"}>Vote type</FormLabel>
//                 <Select
//                   bg={"darkness.500"}
//                   value={selectedVoteType}
//                   onChange={handleVoteTypeChange}
//                 >
//                   <option value="Yes/No">Yes or No</option>
//                   <option value="A/B/C/D">A/B/C/D</option>
//                 </Select>
//               </FormControl>
//             </HStack>
//           </Flex>

//           {selectedVoteType === "Yes/No" && (
//             <Flex justify={"space-between"}>
//               <HStack w={"100%"}>
//                 <FormControl>
//                   <FormLabel color={"primary.50"}>Yes</FormLabel>
//                   <Input bg={"darkness.500"} placeholder="yes" />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel color={"primary.50"}>No</FormLabel>
//                   <Input bg={"darkness.500"} placeholder="no" />
//                 </FormControl>
//               </HStack>
//             </Flex>
//           )}
//           {selectedVoteType === "A/B/C/D" && (
//             <Flex justify={"space-between"}>
//               <HStack w={"100%"}>
//                 <FormControl>
//                   <FormLabel color={"primary.50"}>A</FormLabel>
//                   <Input bg={"darkness.500"} placeholder="type a" />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel color={"primary.50"}>B</FormLabel>
//                   <Input bg={"darkness.500"} placeholder="type b" />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel color={"primary.50"}>C</FormLabel>
//                   <Input bg={"darkness.500"} placeholder="type c" />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel color={"primary.50"}>D</FormLabel>
//                   <Input bg={"darkness.500"} placeholder="type d" />
//                 </FormControl>
//               </HStack>
//             </Flex>
//           )}

//           <FormControl>
//             <FormLabel color={"primary.50"}>Description</FormLabel>
//             <Textarea bg={"darkness.500"} placeholder="Message" />
//           </FormControl>

//           <Flex justify={"end"}>
//             <Button onClick={() => write?.()} leftIcon={<AiOutlineCheck />}>
//               Completed
//             </Button>
//           </Flex>
//         </Stack>
//       </Box>
//     </Flex>
//   )
// }

export const FormProposalId = () => {
  const [id, setId] = useState<string | number>("")
  const [search, setSearch] = useState(false)

  return (
    <Box>
      <Flex justify="center">
        <Box
          as="form"
          w={"50vw"}
          bg={"darkness.900"}
          p={"8"}
          borderRadius={"20"}
        >
          <Stack>
            <FormControl>
              <FormLabel color={"primary.50"}>
                Id de la proposal ( {id} )
              </FormLabel>
              <Input
                type="number"
                bg={"darkness.500"}
                placeholder="Entrer id '1'"
                onChange={(e: any) => setId(e.target.value)}
              />
            </FormControl>

            <Button onClick={() => setSearch(!search ? true : false)}>
              Get Proposal
            </Button>

            {id && search && <GetProposalId id={id} />}
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}
