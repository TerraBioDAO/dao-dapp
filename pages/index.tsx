import { Button, Container, Heading, Text } from "@chakra-ui/react"
import { MainLayout } from "@/components/layouts/Main"
import { useDao } from "@/lib/useDao"

const Home = () => {
  const { dao, members, functions } = useDao()

  return (
    <>
      <MainLayout>
        <Heading as="h1">Welcome to Terrabio DAO</Heading>
        <Text as="i">Terrabio DAO contract: {dao?.address}</Text>

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
        <Text mt="5" fontWeight="bold">
          DaoAccess:
        </Text>
        {functions.dao_access.map((fn) => {
          return (
            <Text key={fn.selector}>
              {fn.name}{" "}
              <Text as="span" color="gray.300">
                ({fn.selector})
              </Text>
            </Text>
          )
        })}
        <Text mt="5" fontWeight="bold">
          FallbackRouter:
        </Text>
        {functions.fallaback_router.map((fn) => {
          return (
            <Text key={fn.selector}>
              {fn.name}{" "}
              <Text as="span" color="gray.300">
                ({fn.selector})
              </Text>
            </Text>
          )
        })}
        <Text mt="5" fontWeight="bold">
          Governance:
        </Text>
        {functions.governance.map((fn) => {
          return (
            <Text key={fn.selector}>
              {fn.name}{" "}
              <Text as="span" color="gray.300">
                ({fn.selector})
              </Text>
            </Text>
          )
        })}
      </MainLayout>
    </>
  )
}

export default Home
