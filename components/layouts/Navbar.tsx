import {
  Box,
  Flex,
  Stack,
  Link,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { ColorModeSwitcher } from "@/components/_global/ColorSwitcher"
import Account from "../web3/Account"
import Network from "../web3/Network"
import { useRouter } from "next/router"

export function Navbar({ isOpen, openModalSearch }: any) {
  const router = useRouter()
  return (
    <Box>
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
      >
        {/* HOME LINK */}
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link
            display="flex"
            href={"#/home"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"lg"}
            _hover={{
              textDecoration: "none",
              color: useColorModeValue("gray.800", "white"),
            }}
            fontWeight="bold"
          >
            Terrabio DAO
          </Link>
        </Flex>

        {/* NETWORK */}
        <Network />

        {/* ACCOUNT */}
        <Account />

        {/* COLOR MODE */}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
      </Flex>
    </Box>
  )
}

// SEARCH BAR
/*
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex" }}
        >
          <Button
            display={{ xs: "none" }}
            borderRadius="5% 0 0 5%"
            onClick={openModalSearch}
          >
            CTRL+K
          </Button>
          <InputGroup w="30%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              focusBorderColor="primary.100"
              borderRadius="0"
              type="number"
              placeholder="Search: "
              onClick={openModalSearch}
            />
          </InputGroup>
        </Flex>
        */

// PATH
/*
                    <Breadcrumb>
              {router.route.split("/").map((loc: any, i: number) => (
                <BreadcrumbItem key={loc + i}>
                  <BreadcrumbLink
                    href={
                      "/" +
                      router.route
                        .split("/")
                        .slice(1, i + 1)
                        .toString()
                        .replaceAll(",", "/")
                    }
                    style={{ textDecoration: "none" }}
                    _focus={{ boxShadow: "none" }}
                    _activeLink={{
                      color: "primary.100",
                    }}
                  >
                    {loc}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
            */
