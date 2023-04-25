import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

type ProposalDraft = {
  startAt: number
  votingPeriod: number
  gracePeriod: number
  threshold: number
  calls: string[]
}

const CreateProposal = () => {
  const [time, setTime] = useState(0)
  const [draft, setDraft] = useState<ProposalDraft>({
    startAt: 0,
    votingPeriod: 0,
    gracePeriod: 0,
    threshold: 0,
    calls: [],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.floor(Date.now() / 1000)), 1000
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Heading>Create a proposal</Heading>

      {/* METADATA - title, description, docs */}
      <FormControl mt="10">
        <FormLabel>Metadata</FormLabel>
        <Input
          bg={"darkness.500"}
          placeholder="Not available yet..."
          isDisabled={true}
        />
      </FormControl>

      {/* VOTE PARAMETERS */}

      <Flex gap="2" mt="10">
        <FormControl>
          <FormLabel>Start at (s)</FormLabel>
          <Input
            bg={"darkness.500"}
            type="number"
            value={draft.startAt}
            onChange={(e) =>
              setDraft((d) => {
                return { ...d, startAt: Number(e.target.value) }
              })
            }
            min={Math.floor(Date.now() / 1000) + 60}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Voting period (d)</FormLabel>
          <Input
            bg={"darkness.500"}
            type="number"
            min={1}
            max={31}
            value={draft.votingPeriod}
            onChange={(e) =>
              setDraft((d) => {
                return { ...d, votingPeriod: Number(e.target.value) }
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Grace period (d)</FormLabel>
          <Input
            bg={"darkness.500"}
            type="number"
            min={0}
            max={7}
            value={draft.gracePeriod}
            onChange={(e) =>
              setDraft((d) => {
                return { ...d, gracePeriod: Number(e.target.value) }
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Threshold</FormLabel>
          <Input
            bg={"darkness.500"}
            type="number"
            min={8000}
            max={10000}
            value={draft.threshold}
            onChange={(e) =>
              setDraft((d) => {
                return { ...d, threshold: Number(e.target.value) }
              })
            }
          />
        </FormControl>
      </Flex>
      <Text>Actual Time: {time}</Text>

      {/* CALLS */}
      {draft.calls.map((call, i) => {
        return (
          <FormControl mb="5" borderRadius="10" bg="blue.100" p="5" key={call}>
            <Text fontSize="1.3rem">Call #{i + 1}</Text>
            <FormLabel>Target address</FormLabel>
            <Input bg={"darkness.500"} />
            <FormLabel>Function signature</FormLabel>
            <Input bg={"darkness.500"} />
            <FormLabel>Function arguments</FormLabel>
            <Input bg={"darkness.500"} />
            {/* Address (=DAO if in dao) Functions name (if in dao) + Args (if in DAO) */}
          </FormControl>
        )
      })}

      <Button
        onClick={() =>
          setDraft((d) => {
            return { ...d, calls: [...d.calls, "0x"] }
          })
        }
      >
        Add a call
      </Button>

      {/* SUBMIT */}
      <Button my="5" colorScheme="green">
        Submit
      </Button>
    </>
  )
}

export default CreateProposal
