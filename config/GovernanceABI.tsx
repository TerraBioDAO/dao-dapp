
// Governance ABI
export const GovernanceABI = [
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
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "NotAnActiveProposal",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "NotReadyToExecute",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "OutOfCancellationPeriod",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfGracePeriodLimit",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfThresholdLimit",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "OutOfVotingPeriod",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfVotingPeriodLimit",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "ProposalAlreadyVoted",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UnknownDescision",
    "type": "error"
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
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "cancelProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "execute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "proceeded",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          },
          {
            "internalType": "uint48",
            "name": "startAt",
            "type": "uint48"
          },
          {
            "internalType": "uint48",
            "name": "endAt",
            "type": "uint48"
          },
          {
            "internalType": "uint48",
            "name": "gracePeriod",
            "type": "uint48"
          },
          {
            "internalType": "uint16",
            "name": "threshold",
            "type": "uint16"
          },
          {
            "internalType": "uint256",
            "name": "nbYes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nbNo",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nbNota",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "membersVoted",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "proposer",
            "type": "address"
          },
          {
            "internalType": "bytes[]",
            "name": "calls",
            "type": "bytes[]"
          },
          {
            "internalType": "bytes[]",
            "name": "results",
            "type": "bytes[]"
          }
        ],
        "internalType": "struct LibGovernance.Proposal",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposalStatus",
    "outputs": [
      {
        "internalType": "enum Governance.ProposalStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint48",
        "name": "startAt",
        "type": "uint48"
      },
      {
        "internalType": "uint48",
        "name": "votingPeriod",
        "type": "uint48"
      },
      {
        "internalType": "uint48",
        "name": "gracePeriod",
        "type": "uint48"
      },
      {
        "internalType": "uint16",
        "name": "threshold",
        "type": "uint16"
      },
      {
        "internalType": "bytes[]",
        "name": "calls",
        "type": "bytes[]"
      }
    ],
    "name": "propose",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "descision",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// Lib Governance ABI
export const LibGovernanceABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "NotAnActiveProposal",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "NotReadyToExecute",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "OutOfCancellationPeriod",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "OutOfGracePeriod",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfGracePeriodLimit",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfThresholdLimit",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "OutOfVotingPeriod",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfVotingPeriodLimit",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "ProposalAlreadyVoted",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UnknownDescision",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "Amended",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "proposer",
        "type": "address"
      }
    ],
    "name": "Proposed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "Voted",
    "type": "event"
  }
]
