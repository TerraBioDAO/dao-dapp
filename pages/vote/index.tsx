import {
    Box,
    Text
} from '@chakra-ui/react';
import { MainLayout } from '@/components/layouts/Main'
import { CardArticle } from '@/components/forum/CardArticle';

const listArticle = [
    {
        id: 0,
        title: "Blockchain developer best practices on innovationchain",
        tags: ["finance", "bitcoin", "crypto"],
        username: "Pavel Gvay",
        avatar:
            "https://cdn.iconscout.com/icon/free/png-512/avatar-375-456327.png",
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
];

export default function ProfilePage() {

    return (
        <MainLayout>
            <Text>Vote</Text>

            <CardArticle listArticle={listArticle} />
        </MainLayout>
    );
}