import { Grid } from "@chakra-ui/react"
import { MainLayout } from "@/components/layouts/Main"
import { Header } from "@/components/Header"

export default function Home() {
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

