export const FallbackRouterABI = [
    {
        "inputs": [],
        "name": "ListLengthMismatch",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "MissingRole",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4[]",
                "name": "selectors",
                "type": "bytes4[]"
            },
            {
                "internalType": "address[]",
                "name": "impls",
                "type": "address[]"
            }
        ],
        "name": "batchUpdateFunction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "bootstrap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "selector",
                "type": "bytes4"
            }
        ],
        "name": "getFunctionHistory",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "selector",
                "type": "bytes4"
            }
        ],
        "name": "getFunctionImpl",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getSelectorList",
        "outputs": [
            {
                "internalType": "bytes4[]",
                "name": "selectors",
                "type": "bytes4[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "selector",
                "type": "bytes4"
            }
        ],
        "name": "rollback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "selector",
                "type": "bytes4"
            },
            {
                "internalType": "address",
                "name": "impl",
                "type": "address"
            }
        ],
        "name": "updateFunction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
