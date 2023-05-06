import { Box, Grid } from "@chakra-ui/react"
import { MainLayout } from "@/components/layouts/Main"
import CreateProposal from "@/components/proposal/CreateProposal"
import { GetProposalId } from "@/components/proposal/GetProposal"
import { ListCardProposals } from "@/components/proposal/ListCardProposals"

const Proposal = () => {
  return (
    <Box>
      <MainLayout>
        {/* <Grid py="5" minH="50vh">
          <HeaderProposal />
        </Grid> */}

        <Grid py="5" minH="50vh">
          <CreateProposal />
          {/* <FormProposal /> */}
        </Grid>

        <Grid py="5" minH="50vh">
          <GetProposalId />
        </Grid>

        <Grid py="5" minH="50vh">
          <ListCardProposals />
        </Grid>
      </MainLayout>
    </Box>
  )
}

export default Proposal
