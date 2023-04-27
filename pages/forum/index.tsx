import {
    Box,
    Text
} from '@chakra-ui/react';

import { CardAnnonce } from '@/components/vote/CardAnnonce';
import { MainLayout } from '@/components/layouts/Main';

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
        <MainLayout>

            <Text>Forum</Text>

            <CardAnnonce listAnnonce={listAnnonce} />

        </MainLayout>
    );
}