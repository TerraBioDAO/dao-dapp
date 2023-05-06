import {
  Box,
  Button,
  CloseButton,
  Code,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Spacer,
  Switch,
  Text,
} from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"
import { ProposalDraft } from "./CreateProposal"
import { useDao } from "@/hooks/useDao"
import { Args } from "@/lib"
import { CloseIcon } from "@chakra-ui/icons"
import { ethers } from "ethers"

type Props = {
  i: number
  call: string
  setDraft: Dispatch<SetStateAction<ProposalDraft>>
}

const Call = ({ call, setDraft, i }: Props) => {
  const { dao, functions } = useDao()
  const [onDao, setOnDao] = useState(false)

  const [target, setTarget] = useState("")
  const [method, setMethod] = useState<{
    signature: string
    inputs: Args[]
    args: any[]
  }>({ signature: "", inputs: [], args: [] })

  function saveCall() {
    // extract from signature
    const name = method.signature.split("(")[0]
    const isPayable = false

    // create an interface
    const abi = new ethers.utils.Interface([
      `function ${method.signature}${isPayable ? " payable" : ""}`,
    ])

    // abi.getSighash(name)

    // encode call
    const encodedCall = abi.encodeFunctionData(name, method.args)

    // check call
    console.log(encodedCall)

    // store call
    setDraft((d) => {
      d.calls[i] = ethers.utils.hexConcat([target, encodedCall])
      return d
    })
  }

  return (
    <Box p="3" bg="cyan.500" borderRadius="5" my="5">
      <Flex mb="3" alignItems="center">
        <Text fontSize="1.3rem" minW="10ch">
          Call #{i + 1}
        </Text>

        <Button onClick={() => saveCall()}>Save Tx</Button>

        {/* ON DAO? */}
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="multi" mb="0">
            Call on the DAO?
          </FormLabel>
          <Switch
            onChange={() =>
              setOnDao((o) => {
                if (!o) {
                  setTarget(dao ? dao.address : "")

                  return true
                } else {
                  setTarget("")
                  setMethod({ signature: "", inputs: [], args: [] })
                  return false
                }
              })
            }
            colorScheme="teal"
            id="multi"
          />
        </FormControl>
        <Spacer />
        <IconButton
          onClick={() => {
            setDraft((d) => {
              return { ...d, calls: d.calls.filter((e, index) => index !== i) }
            })
          }}
          colorScheme="red"
          aria-label="remove call"
          icon={<CloseIcon />}
        />
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
          <Select
            bg={"darkness.500"}
            onChange={(e) => {
              const index = e.target.value.indexOf(",")
              const implName = e.target.value.slice(0, index)
              const signature = e.target.value.slice(index + 1)
              const inputs = functions
                .find((impl) => impl.name === implName)
                ?.functions.find((fn) => fn.signature === signature)?.inputs
              if (inputs === undefined) {
                throw new Error(
                  `Sig: ${signature} not find on impl: ${implName}`
                )
              }
              setMethod({ signature, inputs, args: new Array(inputs.length) })
            }}
          >
            {functions.map((impl) => {
              return (
                <optgroup key={impl.name} label={impl.name}>
                  {impl.functions.map((fn) => {
                    if (fn.stateMutability === "view") return
                    return (
                      <option
                        key={fn.selector}
                        value={[fn.implName, fn.signature]}
                        disabled={fn.name === "propose"}
                      >
                        {fn.name}
                      </option>
                    )
                  })}
                </optgroup>
              )
            })}
          </Select>
        ) : (
          <Input
            placeholder="methodSignature(type,type)"
            bg="white"
            isDisabled={onDao}
            focusBorderColor={target.length === 42 ? "green.500" : "red.500"}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        )}
      </FormControl>

      {/* ARGUMENTS */}
      {method.inputs.map((input, index) => {
        return (
          <FormControl key={input.name}>
            <FormLabel>{input.name}</FormLabel>
            <Input
              onChange={(e) =>
                setMethod((m) => {
                  m.args[index] = e.target.value
                  return m
                })
              }
              bg="darkness.500"
              placeholder={input.type}
            />
          </FormControl>
        )
      })}

      {/* RESULT */}
      <Text mt="5">
        Raw call:{" "}
        <Text color="pink.300" as="span">
          target address
        </Text>
        <Text as="span"> - </Text>
        <Text color="green.300" as="span">
          selector
        </Text>
        <Text as="span"> - </Text>
        <Text as="span">args</Text>
      </Text>
      <Code maxW="container.md" p="3">
        <Text color="pink.300" as="span">
          {call.slice(0, 42)}
        </Text>
        <Text color="green.300" as="span">
          {call.slice(43, 51)}
        </Text>
        {call.slice(52)}
      </Code>
    </Box>
  )
}

export default Call
