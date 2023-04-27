import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { MainLayout } from "@/components/layouts/Main"
import { useDao } from "@/lib/useDao"

const Home = () => {
  const { dao, members, functions } = useDao()

  return (
    <>
      <MainLayout>
        <Heading as="h1">Welcome to Terrabio DAO</Heading>
        <Text as="i">Terrabio DAO contract: {dao?.address}</Text>

        {/* <Button onClick={() => console.log(readABI())}>LOG</Button> */}

        {/* MEMBERS */}
        <Heading mt="5" as="h2">
          Members list
        </Heading>
        {members.map((member) => {
          return <Text key={member}>{member}</Text>
        })}

        {/* SELECTORS */}
        <Heading mt="5" as="h2">
          Selectors list
        </Heading>
        {functions.map((impl) => {
          return (
            <Box key={impl.name}>
              <Text mt="5" fontWeight="bold">
                {impl.name}{" "}
              </Text>

              {impl.functions.map((fn) => {
                return (
                  <Text key={fn.selector}>
                    {fn.name}{" "}
                    <Text as="span" color="gray.300">
                      ({fn.selector})
                    </Text>
                  </Text>
                )
              })}
            </Box>
          )
        })}
      </MainLayout>
    </>
  )
}

export default Home
