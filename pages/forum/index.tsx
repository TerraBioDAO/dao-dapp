import { CardAnnonce } from '@/components/CardAnnonce';
import { CardArticle } from '@/components/CardArticle';
import { CardProposal } from '@/components/CardProposal';
import { FormProposal } from '@/components/FormProposal';

import {
    Box,
    Text
} from '@chakra-ui/react';
const listProposal = [
    {
        id: 0,
        avatar:
            "https://cdn.iconscout.com/icon/free/png-512/avatar-375-456327.png",
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
];

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

const listAnnonce = [
    {
        id: 0,
        avatar:
            "https://lens-storage.storage.googleapis.com/png/7230448a-e0f6-4a6e-8ecc-f654ce2d8d56",
        firstname: "John",
        lastname: "Wick",
        job_title: "A retired hitman who is legendary in the criminal underworld",
        rating: 5,
        students_nb: 0,
    },
    {
        id: 1,
        avatar: "https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png",
        firstname: "Bruce",
        lastname: "Wayne",
        job_title:
            "A wealthy American playboy, philanthropist, and industrialist who resides in Gotham City",
        rating: 5,
        students_nb: 27,
    },
];

export default function ProfilePage() {

    return (
        <Box>

            <Text>Forum</Text>

            <CardAnnonce listAnnonce={listAnnonce} />
            <CardArticle listArticle={listArticle} />
            <CardProposal listProposal={listProposal} />
            <FormProposal />

        </Box>
    );
}