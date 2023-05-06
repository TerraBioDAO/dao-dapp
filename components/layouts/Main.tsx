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
  Container,
  Text,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react"

// Components
import { Navbar } from "@/components/layouts/Navbar"
import { Sidebar } from "@/components/layouts/Sidebar"
import { ModalSearch } from "@/components/layouts/ModalSearch"
import { useDao } from "@/hooks/useDao"
import {ConnectButton} from "@rainbow-me/rainbowkit";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { dao } = useDao()
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
      pb="20"
      templateAreas={`"sidebar nav" "sidebar main"`}
      gridTemplateRows={"60px 1fr"}
      gridTemplateColumns={isOpen ? "230px" : "60px" + " 1fr"}
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
        <Container as="main" maxW="container.lg" pt="5">
          {dao === null ? (
            <>
              <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  chainStatus={{
                    smallScreen: "none",
                    largeScreen: "full",
                  }}
              />
              <Heading>
                DAO is not initializated, ensure you are on the right network
              </Heading>
              <Text>Network supported:</Text>
              <List>
                <ListItem>31337 (if deployed)</ListItem>
                <ListItem>420 (soon)</ListItem>
                <ListItem>10 (soon soon)</ListItem>
              </List>
            </>
          ) : (
            children
          )}
        </Container>
      </GridItem>
    </Grid>
  )
}
