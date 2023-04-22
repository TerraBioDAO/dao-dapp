export const TerrabioDaoABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "daoAccess",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "fallbackRouter",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    }
]
