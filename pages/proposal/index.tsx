import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { fetchSigner, getNetwork, getContract } from "@wagmi/core"
import { Box, Container, Grid, Text } from "@chakra-ui/react"
import contracts from "../../lib/contracts.json"

import { CardProposal } from "@/components/proposal/CardProposal"
import { HeaderProposal } from "@/components/proposal/HeaderProposal"
import { MainLayout } from "@/components/layouts/Main"
import { Dao } from "@/lib/utils"
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
