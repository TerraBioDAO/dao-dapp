import {
  Container,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import Head from "next/head"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  const { isOpen } = useDisclosure()
  return (
    <>
      {/* HEAD */}
      <Head>
        <title>Terrabio DAO</title>
        <meta
          name="description"
          content="dApp for interacting with terrabio DAO contracts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAVBAR */}
      <Flex
        w={isOpen ? "calc(100% - 230px)" : "calc(100% - 60px)"}
        position="fixed"
        zIndex="10"
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.100", "primary.100")}
        align={"center"}
      ></Flex>
      {/* CONTAINER - MAIN */}
      <Container as="main" pt="20">
        {children}
      </Container>
    </>
  )
}

export default Layout
