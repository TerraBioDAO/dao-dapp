import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { ProposalDraft } from "./CreateProposal"

type Props = {
  i: number
  call: string
  setDraft: Dispatch<SetStateAction<ProposalDraft>>
}

const Call = ({ call, setDraft, i }: Props) => {
  const [onDao, setOnDao] = useState(false)

  const [target, setTarget] = useState("")

  return (
    <Box p="3" bg="cyan.100" borderRadius="5">
      <Flex>
        <Text minW="10ch">Call #{i + 1}</Text>

        {/* ON DAO? */}
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="multi" mb="0">
            Call on the DAO?
          </FormLabel>
          <Switch
            onChange={() => setOnDao((o) => !o)}
            colorScheme="teal"
            id="multi"
          />
        </FormControl>
      </Flex>

      {/* TARGET ADDRESS */}
      <FormControl>
        <FormLabel>Target address</FormLabel>
        <Input
          bg="white"
          isDisabled={onDao}
          focusBorderColor={target.length === 42 ? "green.500" : "red.500"}
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </FormControl>

      {/* METHOD */}
      <FormControl>
        <FormLabel>Method</FormLabel>
        {onDao ? (
          <Select></Select>
        ) : (
          <Input
            bg="white"
            isDisabled={onDao}
            focusBorderColor={target.length === 42 ? "green.500" : "red.500"}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        )}
      </FormControl>
    </Box>
  )
}

export default Call
