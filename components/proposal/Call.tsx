import {
  Box,
  Code,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ProposalDraft } from "./CreateProposal"
import { useDao } from "@/lib/useDao"
import { Args } from "@/lib/selectors"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { ethers } from "ethers"
const abi = ethers.utils.defaultAbiCoder

type Props = {
  i: number
  call: string
  setDraft: Dispatch<SetStateAction<ProposalDraft>>
}

type CallType = "dao" | "label" | "custom" | "raw"

type InputMethod = {
  name: string
  signature: string
  selector: string
  inputs: Args[]
  args: any[]
}

const emptyInput: InputMethod = {
  name: "",
  signature: "",
  selector: "",
  inputs: [],
  args: [],
}

const Call = ({ call, setDraft, i }: Props) => {
  const { dao, functions } = useDao()

  const [callType, setCallType] = useState<CallType>("custom")
  const [target, setTarget] = useState("")
  const [inputMethod, setInputMethod] = useState<InputMethod>(emptyInput)
  const [validity, setValidity] = useState<{
    call: boolean
    target: boolean
    args: boolean[]
  }>({
    call: false,
    target: false,
    args: [],
  })

  // check target address validity
  useEffect(() => {
    const isValid = isArgValid("address", target)
    setValidity((v) => {
      return { ...v, target: isValid }
    })
    isCallValid(isValid, validity.args)
  }, [target, validity.args])

  // pure function
  function isArgValid(type: string, arg: string | number): boolean {
    let isValid = false
    try {
      abi.encode([type], [arg])
      isValid = true
    } catch {}
    return isValid
  }

  function isCallValid(target: boolean, args: boolean[]) {
    let isValid = true
    if (!target) isValid = false
    validity.args.forEach((arg) => {
      if (!arg) {
        isValid = false
      }
    })

    setValidity((v) => {
      return { ...v, call: isValid }
    })
  }

  function checkInputs(type: string, arg: string | number, index: number) {
    const args = validity.args
    try {
      abi.encode([type], [arg])
      args[index] = true
      setValidity((v) => {
        return { ...v, args }
      })
    } catch (e: any) {
      console.log(e.code)
      args[index] = false
      setValidity((v) => {
        return { ...v, args }
      })
    }
  }

  function checkCall(): boolean {
    let isValid = true
    if (!validity.target) isValid = false
    validity.args.forEach((arg) => {
      if (!arg) {
        isValid = false
      }
    })

    return isValid
  }

  function formatCall() {
    // format input to abi.encode
    if (callType !== "dao") {
      // extract name, signature & selectore
      // setInputMethod
    }

    const isPayable = false

    // create an interface
    const ifunc = new ethers.utils.Interface([
      `function ${inputMethod.signature}${isPayable ? " payable" : ""}`,
    ])

    // encode call
    const encodedCall = ifunc.encodeFunctionData(
      inputMethod.name,
      inputMethod.args
    )

    console.log(encodedCall)

    console.log(
      ethers.utils.defaultAbiCoder.encode(
        ["address", "bytes"],
        [target, encodedCall]
      )
    )
    setDraft((d) => {
      d.calls[i] = ethers.utils.defaultAbiCoder.encode(
        ["address", "bytes"],
        [target, encodedCall]
      )
      return d
    })
  }

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
        <Text fontWeight="bold" fontSize="1.3rem" minW="10ch">
          Call #{i + 1}
        </Text>

        {/* CHOOSE CALL INPUT */}
        <RadioGroup
          defaultValue="custom"
          onChange={(e: CallType) => {
            setCallType(e)
            setInputMethod(emptyInput)
            setValidity((v) => {
              return { ...v, call: false }
            })
            switch (e) {
              case "dao":
                setTarget(dao ? dao.address : "")
                break
              case "label":
                //
                break
              case "custom":
                setTarget("")
                break
              case "raw":
                setTarget("")
            }
          }}
        >
          <Flex gap="4">
            <Radio minW="15ch" colorScheme="green" value="dao">
              Call on the DAO
            </Radio>
            <Radio
              isDisabled={true}
              minW="15ch"
              colorScheme="green"
              value="label"
            >
              On the label (ERC721)
            </Radio>
            <Radio minW="15ch" colorScheme="green" value="custom">
              Custom call
            </Radio>
            <Radio minW="15ch" colorScheme="green" value="raw">
              Raw call
            </Radio>
          </Flex>
        </RadioGroup>

        {/* VALIDATE OR REMOVE CALL */}
        <Spacer />
        <IconButton
          me="3"
          onClick={() => formatCall()}
          colorScheme="green"
          aria-label="validate call"
          isDisabled={!validity.call}
          icon={<CheckIcon />}
        />
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

      {/* SELECT TARGET ADDRESS */}
      <FormControl>
        <FormLabel>Target address</FormLabel>
        <Input
          bg="white"
          isDisabled={callType === "dao" || callType === "label"}
          focusBorderColor={validity.target ? "green.500" : "red.500"}
          value={target}
          onChange={(e) => {
            setTarget(e.target.value)
            checkCall()
          }}
        />
      </FormControl>

      {/* SELECT METHOD */}
      <FormControl>
        <FormLabel>Method</FormLabel>
        {callType === "custom" ? (
          <Input
            placeholder="methodSignature(type,type)"
            bg="white"
            focusBorderColor={target.length === 42 ? "green.500" : "red.500"}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        ) : callType === "raw" ? (
          <>
            <Textarea
              bg="darkness.500"
              placeholder="Paste your raw transaction here"
            />
          </>
        ) : callType === "dao" ? (
          <Select
            bg={"darkness.500"}
            onChange={(e) => {
              setInputMethod(emptyInput)
              const index = e.target.value.indexOf(",")
              const implName = e.target.value.slice(0, index)
              const signature = e.target.value.slice(index + 1)
              const method = functions
                .find((impl) => impl.name === implName)
                ?.functions.find((fn) => fn.signature === signature)
              if (method === undefined) {
                throw new Error(
                  `Sig: ${signature} not find on impl: ${implName}`
                )
              }

              setInputMethod({
                name: method.name,
                signature,
                selector: method.selector,
                inputs: method.inputs,
                args: new Array(method.inputs.length),
              })
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
          <>
            <Text>Label not defined yet</Text>
          </>
        )}
      </FormControl>

      {/* ARGUMENTS */}
      {inputMethod.inputs.map((input, index) => {
        return (
          <FormControl key={input.name}>
            <FormLabel>{input.name}</FormLabel>
            <Input
              focusBorderColor={validity.args[index] ? "green.500" : "red.500"}
              onChange={(e) => {
                const temp = inputMethod.args
                temp[index] = e.target.value
                checkInputs(input.type, e.target.value, index)
                setInputMethod((m) => {
                  // m.args[index] = e.target.value
                  return { ...m, args: temp }
                })
                checkCall()
              }}
              bg="darkness.500"
              placeholder={input.type}
              value={inputMethod.args[index] ? inputMethod.args[index] : ""}
            />
          </FormControl>
        )
      })}

      {/* RESULT */}
      <Divider mt="5" border="solid white" />
      <Text>
        Raw call overview:{" "}
        <Text fontWeight="bold" color="pink.300" as="span">
          target address (encoded)
        </Text>
        <Text as="span"> - </Text>
        <Text fontWeight="bold" color="green.300" as="span">
          selector
        </Text>
        <Text as="span"> - </Text>
        <Text fontWeight="bold" as="span">
          args
        </Text>
      </Text>
      <Code my="3" maxW="container.md" p="3">
        {/* MANUAL DISPLAY OF ENCODED ADDR */}
        <Text color="pink.300" as="span">
          {target ? `0x000000000000000000000000${target.slice(2)}` : "0x"}
        </Text>

        {inputMethod.selector ? (
          <>
            <Text as="span">
              00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000044
            </Text>
            <Text color="green.300" as="span">
              {inputMethod.selector.slice(2)}
            </Text>
          </>
        ) : (
          <></>
        )}
        {call.slice(52)}
      </Code>
    </Box>
  )
}

export default Call
