import {
  Box,
  Button,
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
import { useDao } from "@/lib/useDao"
import { readABI } from "@/lib/selectors"

type Props = {
  i: number
  call: string
  setDraft: Dispatch<SetStateAction<ProposalDraft>>
}

const Call = ({ call, setDraft, i }: Props) => {
  const { dao, functions } = useDao()
  const [onDao, setOnDao] = useState(false)

  const [target, setTarget] = useState("")

  return (
    <Box p="3" bg="cyan.500" borderRadius="5">
      <Button onClick={() => readABI()}>log</Button>
      <Flex>
        <Text minW="10ch">Call #{i + 1}</Text>

        {/* ON DAO? */}
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="multi" mb="0">
            Call on the DAO?
          </FormLabel>
          <Switch
            onChange={() =>
              setOnDao((o) => {
                if (!o) {
                  setTarget(dao.address)
                  return true
                } else {
                  setTarget("")
                  return false
                }
              })
            }
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
          <Select bg={"darkness.500"}>
            <optgroup label="DaoAccess">
              {functions.dao_access.map((fn) => {
                return (
                  <option key={fn.selector} value={fn.selector}>
                    {fn.name}
                  </option>
                )
              })}
            </optgroup>
            <optgroup label="FallbackRouter">
              {functions.fallaback_router.map((fn) => {
                return (
                  <option key={fn.selector} value={fn.selector}>
                    {fn.name}
                  </option>
                )
              })}
            </optgroup>
            <optgroup label="Governance">
              {functions.governance.map((fn) => {
                return (
                  <option key={fn.selector} value={fn.selector}>
                    {fn.name}
                  </option>
                )
              })}
            </optgroup>
          </Select>
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
