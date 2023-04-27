import {
  Box,
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
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { GovernanceABI } from "@/config/GovernanceABI";
import Call from "./Call"

export type ProposalDraft = {
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

  const { config, error } = usePrepareContractWrite({
    address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
    abi: GovernanceABI,
    functionName: 'propose',
    args: [1882950011, 86400, 0, 8000, []]
})

  const { write } = useContractWrite(config)

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
        return <Call key={call} i={i} setDraft={setDraft} call={call} />
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
      <Button my="5" colorScheme="green" onClick={() => write?.()}>
        Submit
      </Button>
    </>
  )
}

export default CreateProposal
