import { Box, Button, Grid, Heading, Input, useToast } from "@chakra-ui/react"
import { CardArticle } from "@/components/vote/CardArticle"
import { MainLayout } from "@/components/layouts/Main"
import { useState } from "react"
import { vote } from "@/lib/vote"
import { TxProgression } from "@/lib/utils"
import { useDao } from "@/lib/useDao"
import { execute } from "@/lib/execute"

const Vote = () => {
  const [{ id, des }, setVote] = useState({ id: 0, des: 0 })
  const toast = useToast()
  const [txProgression, setTxProgression] = useState<TxProgression>()

  const { dao } = useDao()
  return (
    <Box>
      <MainLayout>
        <Heading>Vote</Heading>
        <Input
          placeholder="proposal id"
          onChange={(e) =>
            setVote((v) => {
              return { ...v, id: Number(e.target.value) }
            })
          }
        />
        <Input
          placeholder="vote desision"
          onChange={(e) =>
            setVote((v) => {
              return { ...v, des: Number(e.target.value) }
            })
          }
        />
        <Button
          isLoading={
            txProgression === "Waiting for confirmation" ||
            txProgression === "Pending"
          }
          loadingText={txProgression}
          onClick={() =>
            dao ? vote(dao.gov, id, des, setTxProgression, toast) : ""
          }
        >
          Vote {des} on proposal {id}
        </Button>

        <Button
          onClick={() =>
            dao ? execute(dao.gov, id, setTxProgression, toast) : ""
          }
        >
          Execute {id}
        </Button>

        {/* Liste of Proposals for vote */}
        <Grid py="5" minH="50vh">
          <CardArticle />
        </Grid>
      </MainLayout>
    </Box>
  )
}

export default Vote
