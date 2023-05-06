import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Call from "./Call"
import { submit } from "@/lib/submit"
import { useDao } from "@/hooks/useDao"
import { TxProgression } from "@/lib/utils"
import { dateStartIsValid, dateVotingPeriodIsValid, dateGracePeriodIsValid, thresholdIsValid } from "@/lib/validations"

export type ProposalDraft = {
  startAt: number
  votingPeriod: number
  gracePeriod: number
  threshold: number
  calls: string[]
}

const optionsDay = [1, 3, 5, 10]

const CreateProposal = () => {
  const toast = useToast()
  const { dao } = useDao()

  const [txProgression, setTxProgression] = useState<TxProgression>()
  const [time, setTime] = useState(0)
  const [draft, setDraft] = useState<ProposalDraft>({
    startAt: Math.floor(Date.now() / 1000),
    votingPeriod: 1,
    gracePeriod: 1,
    threshold: 8000,
    calls: [],
  })

  const formIsValid = () => {
    if (
      dateStartIsValid(draft.startAt)
      && dateVotingPeriodIsValid(draft.votingPeriod)
      && dateGracePeriodIsValid(draft.gracePeriod)
      && thresholdIsValid(draft.threshold)
    ) return true
    else return false
  }

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

        {/* Start at */}
        <FormControl isRequired isInvalid={!dateStartIsValid(draft.startAt)}>
          <FormLabel>Start at (s) | '0' is now</FormLabel>
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
          {!dateStartIsValid(draft.startAt) && (
            <FormErrorMessage>Should be above of actual time.</FormErrorMessage>
          )}
          <Text>Actual Time: {time}</Text>
        </FormControl>

        {/* Voting Period */}
        <FormControl isRequired isInvalid={!dateVotingPeriodIsValid(draft.votingPeriod)}>
          <FormLabel color={"primary.50"}>
            Voting period (d)
          </FormLabel>
          <Select
            onChange={(e) => setDraft((d) => {
              return { ...d, votingPeriod: Number(e.target.value) }
            })}
            bg={"darkness.500"}
            value={draft.votingPeriod}
          >
            {optionsDay.map(d =>
              <option key={d} value={d}>{d}</option>
            )}
          </Select>
          {!dateVotingPeriodIsValid(draft.votingPeriod) && (
            <FormErrorMessage>Must be greater than 1.</FormErrorMessage>
          )}
        </FormControl>

        {/* Grace Period */}
        <FormControl isRequired isInvalid={!dateGracePeriodIsValid(draft.gracePeriod)}>
          <FormLabel color={"primary.50"}>
            Grace period (d)
          </FormLabel>
          <Select
            onChange={(e) => setDraft((d) => {
              return { ...d, gracePeriod: Number(e.target.value) }
            })}
            bg={"darkness.500"}
            value={draft.gracePeriod}
          >
            {optionsDay.map(d =>
              <option key={d} value={d}>{d}</option>
            )}
          </Select>
          {!dateGracePeriodIsValid(draft.gracePeriod) && (
            <FormErrorMessage>Must be greater than 1.</FormErrorMessage>
          )}
        </FormControl>

        {/* Threshold */}
        <FormControl isRequired isInvalid={!thresholdIsValid(draft.threshold)}>
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
          {!thresholdIsValid(draft.threshold) && (
            <FormErrorMessage>Must be between 8000 & 10000.</FormErrorMessage>
          )}
        </FormControl>
      </Flex>

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

      <Text>
        ➜ bytes32(0) Type: bytes32 └ Data:
        0x0000000000000000000000000000000000000000000000000000000000000000 ➜
        address(vm.addr(5)) Type: address └ Data:
        0xe1ab8145f7e55dc933d51a18c793f901a3a0b276
      </Text>

      {/* SUBMIT */}
      <Button
        me="4"
        isLoading={
          txProgression === "Waiting for confirmation" ||
          txProgression === "Pending"
        }
        loadingText={txProgression}
        colorScheme={formIsValid() ? "green" : "orange"}
        onClick={() => {
          if (dao && formIsValid()) {
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
