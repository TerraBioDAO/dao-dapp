import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

export const ModalSearch = ({ openModal, handleModal }: any) => {
  return (
    <>
      <Modal isOpen={openModal} onClose={handleModal}>
        <ModalOverlay />
        <ModalContent
          backgroundColor={useColorModeValue("gray.100", "darkness.900")}
        >
          <ModalHeader>Recherche:</ModalHeader>
          <Box px="2">
            <InputGroup w="100%">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                focusBorderColor="primary.100"
                borderRadius="0"
                type="number"
                placeholder="Search: "
              />
            </InputGroup>
          </Box>

          <ModalFooter>
            <Button type="submit" bg="primary.100" mr={3} onClick={handleModal}>
              Rechercher
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
