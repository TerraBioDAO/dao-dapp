import { Box, Grid, Heading, Text } from "@chakra-ui/react"
import { MainLayout } from "@/components/layouts/Main"
import { useDao } from "@/lib/useDao"
import { Header } from "@/components/Header"

export default function Home () {
  return (
    <>
      <MainLayout>

        {/* Header DAO */}
        <Grid py="5" minH="50vh">
          <Header />
        </Grid>

      </MainLayout>
    </>
  )
}

