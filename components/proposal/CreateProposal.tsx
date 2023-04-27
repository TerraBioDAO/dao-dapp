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
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Call from "./Call"
import { TxProgression, submit } from "@/lib/submit"
import { useDao } from "@/lib/useDao"

export type ProposalDraft = {
  startAt: number
  votingPeriod: number
  gracePeriod: number
  threshold: number
  calls: string[]
}

const CreateProposal = () => {
  const toast = useToast()
  const { dao } = useDao()

  const [txProgression, setTxProgression] = useState<TxProgression>()
  const [time, setTime] = useState(0)
  const [draft, setDraft] = useState<ProposalDraft>({
    startAt: Math.floor(Date.now() / 1000),
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
      <Button
        onClick={() =>
          setDraft((d) => {
            return { ...d, calls: [...d.calls, "0x"] }
          })
        }
      >
        Add a call
      </Button>

      {draft.calls.map((call, i) => {
        return <Call key={call + i} i={i} setDraft={setDraft} call={call} />
      })}

      {/* SUBMIT */}
      <Button
        me="4"
        isLoading={
          txProgression === "Waiting for confirmation" ||
          txProgression === "Pending"
        }
        loadingText={txProgression}
        colorScheme="green"
        onClick={() => {
          if (dao) {
            console.log(draft)
            submit(dao.gov, draft, setTxProgression, toast)
          }
        }}
      >
        Submit
      </Button>

      <Button
        onClick={() => {
          dao?.gov.interface.fragments.forEach((e, i) => {
            console.log(dao.gov.interface.getSighash(e))
            console.log(e)
          })
        }}
      >
        Log
      </Button>
    </>
  )
}

export default CreateProposal