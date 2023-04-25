import { useState, useEffect, useCallback, ReactNode } from "react"
import { useRouter } from "next/router"
import {
  useDisclosure,
  Grid,
  GridItem,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"

// Components
import { Navbar } from "@/components/layouts/Navbar"
import { Sidebar } from "@/components/layouts/Sidebar"
import { ModalSearch } from "@/components/layouts/ModalSearch"

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)

  // OpenSidebar for frist load (default)
  useEffect(() => onOpen(), [])

  const handleOpenModal = () => {
    setOpenModal(!openModal ? true : false)
  }

  // handle what happens on key press
  useCallback((event: any) => {
    if (event.ctrlKey === true && event.key === ("k" || "K")) {
      event.preventDefault()
      console.log(`ctrl with K pressed: ${event.key}`)
      handleOpenModal()
    }
  }, [])

  return (
    <Grid
      templateAreas={`"sidebar nav" "sidebar main"`}
      gridTemplateRows={"60px 1fr"}
      gridTemplateColumns={isOpen ? "230px" : "60px" + " 1fr"}
      fontWeight="bold"
    >
      <GridItem area={"nav"}>
        <Navbar
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          openModalSearch={handleOpenModal}
        />
      </GridItem>

      {/* Auto Open & Close with pointer */}
      <GridItem area={"sidebar"} onMouseEnter={onOpen} onMouseLeave={onClose}>
        <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </GridItem>

      <ModalSearch openModal={openModal} handleModal={handleOpenModal} />

      <GridItem minH="80vh" area={"main"}>
        <main>{children}</main>
      </GridItem>
    </Grid>
  )
}
