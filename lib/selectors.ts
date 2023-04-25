import { Contract } from "ethers"

export type DaoFunctions = {
  dao_access: Function[]
  fallaback_router: Function[]
  governance: Function[]
  all: Function[]
}

export type Function = {
  name: string
  selector: string
}

export const getAllFunctions = async (
  router: Contract
): Promise<DaoFunctions> => {
  const selectors = await router.getSelectorList()
  return _selectorsToDaoFunctions(selectors)
}

const _selectorsToDaoFunctions = (selectors: string[]): DaoFunctions => {
  const daoFunctions: DaoFunctions = {
    dao_access: [],
    fallaback_router: [],
    governance: [],
    all: [],
  }

  selectors.map((selector) => {
    switch (selector) {
      // ----------------------------- DaoAccess
      case "0x248a9ca3":
        daoFunctions.dao_access.push({
          name: "getRoleAdmin(bytes32)",
          selector,
        })
        break
      case "0x2f2ff15d":
        daoFunctions.dao_access.push({
          name: "grantRole(bytes32,address)",
          selector,
        })
        break
      case "0x91d14854":
        daoFunctions.dao_access.push({
          name: "hasRole(bytes32,address)",
          selector,
        })
        break
      case "0x36568abe":
        daoFunctions.dao_access.push({
          name: "renounceRole(bytes32,address)",
          selector,
        })
        break
      case "0xd547741f":
        daoFunctions.dao_access.push({
          name: "revokeRole(bytes32,address)",
          selector,
        })
        break
      case "0xdfde5e58":
        daoFunctions.dao_access.push({
          name: "setAdminRole(bytes32,bytes32)",
          selector,
        })
        break

      // -------------------------------------- FallabackRouter
      case "0xc7467a2d":
        daoFunctions.fallaback_router.push({
          name: "batchUpdateFunction(bytes4[],address[])",
          selector,
        })
        break
      case "0x18a9bb16":
        daoFunctions.fallaback_router.push({
          name: "getFunctionHistory(bytes4)",
          selector,
        })
        break
      case "0xfdea4290":
        daoFunctions.fallaback_router.push({
          name: "getFunctionImpl(bytes4)",
          selector,
        })
        break
      case "0x2c305779":
        daoFunctions.fallaback_router.push({
          name: "getSelectorList()",
          selector,
        })
        break
      case "0x1bdf1eff":
        daoFunctions.fallaback_router.push({
          name: "rollback(bytes4)",
          selector,
        })
        break
      case "0x1eea9243":
        daoFunctions.fallaback_router.push({
          name: "updateFunction(bytes4,address)",
          selector,
        })
        break

      // ----------------------------------- Governance
      case "0xe0a8f6f5":
        daoFunctions.governance.push({
          name: "cancelProposal(uint256)",
          selector,
        })
        break
      case "0xfe0d94c1":
        daoFunctions.governance.push({ name: "execute(uint256)", selector })
        break
      case "0xc7f758a8":
        daoFunctions.governance.push({ name: "getProposal(uint256)", selector })
        break
      case "0x401853b7":
        daoFunctions.governance.push({
          name: "getProposalStatus(uint256)",
          selector,
        })
        break
      case "0x678abbf7":
        daoFunctions.governance.push({
          name: "propose(uint48,uint48,uint48,uint16,bytes[])",
          selector,
        })
        break
      case "0xb384abef":
        daoFunctions.governance.push({
          name: "vote(uint256,uint256)",
          selector,
        })
        break
    }
  })

  daoFunctions.all = daoFunctions.dao_access.concat(
    daoFunctions.fallaback_router,
    daoFunctions.governance
  )
  return daoFunctions
}
