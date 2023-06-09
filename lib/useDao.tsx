import { DaoContext } from "@/providers/DaoProvider"
import { useContext } from "react"

export const useDao = () => {
  const { dao, members, proposals, functions } = useContext(DaoContext)

  // block initialisation
  // if (dao === null) {
  //   throw new Error(
  //     "It seems that you are trying to use useDao outside its provider OR you are on the wrong network"
  //   )
  // }

  return { dao, members, proposals, functions }
}
