import { Box, Grid, Heading } from "@chakra-ui/react"
import { CardArticle } from "@/components/vote/CardArticle"
import { MainLayout } from "@/components/layouts/Main"

const Vote = () => {
  return (
    <Box>
      <MainLayout>

        <Heading>Vote</Heading>

        {/* Liste of Proposals for vote */}
        <Grid py="5" minH="50vh">
          <CardArticle />
        </Grid>

      </MainLayout>
    </Box>
  )
}

export default Vote
