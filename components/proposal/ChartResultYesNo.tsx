import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartResultYesNo(props: any) {
    const { result } = props;
    console.log('ChartResulYesNo', result)

    return (
        <>
            <Box>
                <Doughnut data={{
                    labels: ['Yes', 'No', 'Nota'],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [result.nbYes, result.nbNo, result.nbNota],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }} />
            </Box>
        </>
    )
}
