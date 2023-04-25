import { Contract } from "ethers"

export type Dao = {
  address: string
  access: Contract
  router: Contract
  gov: Contract
  members: Contract
}
