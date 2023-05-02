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
import { FormProposal } from "@/components/proposal/FormProposal"

const listProposal = [
  {
    id: 0,
    avatar: "https://cdn.iconscout.com/icon/free/png-512/avatar-375-456327.png",
    date: "22 Février 2023, 12.21PM",
    contract: [
      { id: 0, content: "Name #1", value: 12.5, quantity: 1 },
      { id: 1, content: "Name #2", value: 6, quantity: 2 },
    ],
    is_rejected: 0,
    is_completed: 0,
  },
  {
    id: 1,
    avatar:
      "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-366-456318-512.png",
    date: "24 Décembre 2022, 23.59PM",
    contract: [{ id: 0, content: "Name #404", value: 1, quantity: 404 }],
    is_rejected: 1,
    is_completed: 0,
  },
  {
    id: 2,
    avatar:
      "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-373-456325-512.png",
    date: "21 Mars 2023, 06.48AM",
    contract: [
      { id: 0, content: "Name #1792", value: 10, quantity: 8 },
      { id: 1, content: "Name #1789", value: 14, quantity: 7 },
      { id: 2, content: "Name #1789", value: 4, quantity: 8 },
    ],
    is_rejected: 0,
    is_completed: 1,
  },
]

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

        {/* <Grid py="5" minH="50vh">
          <CardProposal listProposal={listProposal} />
        </Grid>

        <Grid py="5" minH="50vh">
          <FormProposalId />
        </Grid> */}
      </MainLayout>
    </Box>
  )
}

export default Proposal
