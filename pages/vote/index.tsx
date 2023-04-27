import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { CardArticle } from "@/components/forum/CardArticle"
import { MainLayout } from "@/components/layouts/Main"
import { vote } from "@/lib/vote"
import { useState } from "react"
import { TxProgression } from "@/lib/utils"
import { useDao } from "@/lib/useDao"

const listArticle = [
  {
    id: 0,
    title: "Blockchain developer best practices on innovationchain",
    tags: ["finance", "bitcoin", "crypto"],
    username: "Pavel Gvay",
    avatar: "https://cdn.iconscout.com/icon/free/png-512/avatar-375-456327.png",
    published_date: "3 weeks ago",
    views: 651324,
    likes: 366545,
    comments: 56,
  },
  {
    id: 1,
    title: "What is Blockchain ?",
    tags: ["blockchain", "novice", "learn"],
    username: "Raph P",
    avatar:
      "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-366-456318-512.png",
    published_date: "2 years ago",
    views: 999999,
    likes: 456789,
    comments: 789,
  },
  {
    id: 2,
    title: "Pas d'idée",
    tags: ["no idea", "think", "imagination"],
    username: "Jean-Michel Apeupré",
    avatar:
      "https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-373-456325-512.png",
    date: "21 Mars 2023, 06.48AM",
    published_date: "4 months ago",
    views: 1234,
    likes: 5678,
    comments: 12,
  },
]

const Vote = () => {
  const toast = useToast()
  const [txProgression, setTxProgression] = useState<TxProgression>()

  const { dao } = useDao()
  return (
    <Box>
      <MainLayout>
        <Button
          isLoading={
            txProgression === "Waiting for confirmation" ||
            txProgression === "Pending"
          }
          loadingText={txProgression}
          onClick={() =>
            dao ? vote(dao.gov, 1, 1, setTxProgression, toast) : ""
          }
        >
          Vote on proposal 1
        </Button>
      </MainLayout>
      {/* <Text>Vote</Text>

            <CardArticle listArticle={listArticle} /> */}
    </Box>
  )
}

export default Vote
