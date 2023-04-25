import {
  Box,
  Flex,
  Button,
  Stack,
  Link,
  Text,
  useColorModeValue,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  MenuDivider,
  Center,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { ColorModeSwitcher } from "@/components/ColorSwitcher"

export function Navbar({ isOpen, openModalSearch }: any) {
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

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link
            href={"#/home"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={"lg"}
            _hover={{
              textDecoration: "none",
              color: useColorModeValue("gray.800", "white"),
            }}
          >
            TerraBIO
          </Link>
        </Flex>

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
