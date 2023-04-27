import { ErrorFragment } from "ethers/lib/utils.js"
import contracts from "./contracts.json"
import { ethers } from "ethers"

export type KnownError = {
  fragment: ErrorFragment
  selector: string
}

export const loadErrors = (): KnownError[] => {
  const errors: KnownError[] = []

  const access = new ethers.utils.Interface(contracts.abis.dao_access)
  access.fragments.forEach((f, i) => {
    if (f.type === "error") {
      errors.push({ fragment: f, selector: access.getSighash(f) })
    }
  })

  const router = new ethers.utils.Interface(contracts.abis.fallback_router)
  router.fragments.forEach((f) => {
    if (f.type === "error") {
      errors.push({ fragment: f, selector: router.getSighash(f) })
    }
  })

  const gov = new ethers.utils.Interface(contracts.abis.governance)
  gov.fragments.forEach((f) => {
    if (f.type === "error") {
      errors.push({ fragment: f, selector: gov.getSighash(f) })
    }
  })

  return errors
}

export const selectorToName = (selector: string): string => {
  if (selector.length !== 10) throw new Error("Not a selector")

  const error = loadErrors().find((e) => selector === e.selector)

  if (!error) throw new Error(`Unknown selector ${selector}`)

  return error.fragment.name
}

export const selectorToError = (selector: string): ErrorFragment => {
  if (selector.length !== 10) throw new Error("Not a selector")

  const error = loadErrors().find((e) => selector === e.selector)

  if (!error) throw new Error(`Unknown selector ${selector}`)

  return error.fragment
}

export const readErrorData = (data: string): ErrorFragment => {
  const selector = data.slice(0, 10)
  return selectorToError(selector)
}
