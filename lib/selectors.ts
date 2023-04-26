import { Contract } from "ethers"
import contracts from "./contracts.json"

export type DaoMethods = Implementation[]

type Implementation = {
  name: string
  functions: Method[]
}

type Method = {
  implName: string
  name: string
  signature: string
  stateMutability: string
  inputs: Args[]
  outputs: Args[]
  selector: string
}

export type Args = {
  type: string
  name: string
}

export const loadDaoMethods = async (router: Contract): Promise<DaoMethods> => {
  const selectorsList = await _getSelectorList(router)
  const daoMethods: DaoMethods = []

  selectorsList.forEach((selector: string) => {
    const method = __selectorToMethod(selector)

    // new impl
    let index = daoMethods.findIndex((impl) => impl.name === method.implName)
    if (index === -1) {
      index = daoMethods.push({ name: method.implName, functions: [] }) - 1
    }

    // add methods
    daoMethods[index].functions.push(method)
  })

  return daoMethods
}

const _getSelectorList = async (router: Contract): Promise<string[]> => {
  return await router.getSelectorList()
}

const _extractFromABI = (
  implName: string,
  abi: any[],
  signature: string,
  selector: string
): Method => {
  const name = signature.split("(")[0]
  const elem: any | undefined = abi.find((elem: any) => {
    if (elem.type === "function") {
      return elem.name === name
    }
  })

  if (elem) {
    elem.inputs.map((input: any) => {
      return { type: input.type, name: input.name }
    })
    elem.outputs.map((output: any) => {
      return { type: output.type, name: output.name }
    })
  }

  return {
    implName,
    name,
    selector,
    inputs: elem.inputs,
    outputs: elem.outputs,
    signature,
    stateMutability: elem.stateMutability,
  }
}

const __selectorToMethod = (selector: string): Method => {
  switch (selector) {
    // ----------------------------- DaoAccess
    case "0x248a9ca3":
      return _extractFromABI(
        "DaoAccess",
        contracts.abis.dao_access,
        "getRoleAdmin(bytes32)",
        selector
      )

    case "0x2f2ff15d":
      return _extractFromABI(
        "DaoAccess",
        contracts.abis.dao_access,
        "grantRole(bytes32,address)",
        selector
      )

    case "0x91d14854":
      return _extractFromABI(
        "DaoAccess",
        contracts.abis.dao_access,
        "hasRole(bytes32,address)",
        selector
      )

    case "0x36568abe":
      return _extractFromABI(
        "DaoAccess",
        contracts.abis.dao_access,
        "renounceRole(bytes32,address)",
        selector
      )

    case "0xd547741f":
      return _extractFromABI(
        "DaoAccess",
        contracts.abis.dao_access,
        "revokeRole(bytes32,address)",
        selector
      )

    case "0xdfde5e58":
      return _extractFromABI(
        "DaoAccess",
        contracts.abis.dao_access,
        "setAdminRole(bytes32,bytes32)",
        selector
      )

    // -------------------------------------- FallabackRouter
    case "0xc7467a2d":
      return _extractFromABI(
        "FallbackRouter",
        contracts.abis.fallback_router,
        "batchUpdateFunction(bytes4[],address[])",
        selector
      )

    case "0x18a9bb16":
      return _extractFromABI(
        "FallbackRouter",
        contracts.abis.fallback_router,
        "getFunctionHistory(bytes4)",
        selector
      )

    case "0xfdea4290":
      return _extractFromABI(
        "FallbackRouter",
        contracts.abis.fallback_router,
        "getFunctionImpl(bytes4)",
        selector
      )

    case "0x2c305779":
      return _extractFromABI(
        "FallbackRouter",
        contracts.abis.fallback_router,
        "getSelectorList()",
        selector
      )

    case "0x1bdf1eff":
      return _extractFromABI(
        "FallbackRouter",
        contracts.abis.fallback_router,
        "rollback(bytes4)",
        selector
      )

    case "0x1eea9243":
      return _extractFromABI(
        "FallbackRouter",
        contracts.abis.fallback_router,
        "updateFunction(bytes4,address)",
        selector
      )

    // ----------------------------------- Governance
    case "0xe0a8f6f5":
      return _extractFromABI(
        "Governance",
        contracts.abis.governance,
        "cancelProposal(uint256)",
        selector
      )

    case "0xfe0d94c1":
      return _extractFromABI(
        "Governance",
        contracts.abis.governance,
        "execute(uint256)",
        selector
      )

    case "0xc7f758a8":
      return _extractFromABI(
        "Governance",
        contracts.abis.governance,
        "getProposal(uint256)",
        selector
      )

    case "0x401853b7":
      return _extractFromABI(
        "Governance",
        contracts.abis.governance,
        "getProposalStatus(uint256)",
        selector
      )

    case "0x678abbf7":
      return _extractFromABI(
        "Governance",
        contracts.abis.governance,
        "propose(uint48,uint48,uint48,uint16,bytes[])",
        selector
      )

    case "0xb384abef":
      return _extractFromABI(
        "Governance",
        contracts.abis.governance,
        "vote(uint256,uint256)",
        selector
      )

    default:
      throw new Error(
        `An unknown selector has been detected: ${selector}, add it into the list or automatise the process`
      )
  }
}
