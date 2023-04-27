// import { useContractRead } from "wagmi"
// import contracts from "../../lib/contracts.json"
// import { Box, Text } from "@chakra-ui/react"
// import { useEffect, useState } from "react"

// // console.log(Date.now() / 1000 + 60, 86400, 0, 8000)

// // interface Proposal {
// //     // --- status ---
// //     active: boolean;
// //     proceeded: boolean;
// //     cancelled: boolean;

// //     // --- timing ---
// //     startAt: number;
// //     endAt: number;
// //     gracePeriod: number;
// //     // --- vote parameters ---
// //     threshold: number; // 0 ~ 10000
// //     // --- result ---
// //     nbYes: number;
// //     nbNo: number;
// //     nbNota: number;
// //     membersVoted: number;
// //     // --- vote info ---
// //     proposer: string;
// //     // --- content ---
// //     calls: [];
// //     results: [];
// // }

// export function GetProposalId(props: any) {
//   const { id } = props
//   const [data, setData] = useState<any>()
//   const [error, setError] = useState<any>()

//   const { data: proposal, error: err }: any = useContractRead({
//     address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
//     abi: contracts.abis.governance,
//     functionName: "getProposal",
//     args: [id],
//   })

//   console.log("GetProposalId 0", proposal)

//   useEffect(() => {
//     if (!proposal || !proposal[0]) return
//     setData({
//       // --- status ---
//       active: Boolean(proposal[0]),
//       proceeded: Boolean(proposal[1]),
//       cancelled: Boolean(proposal[2]),

//       // --- timing ---
//       startAt: String(proposal[3]),
//       endAt: String(proposal[4]),
//       gracePeriod: String(proposal[5]),
//       // --- vote parameters ---
//       threshold: Number(proposal[6]), // 0 ~ 10000
//       // --- result ---
//       nbYes: Number(proposal[7]),
//       nbNo: Number(proposal[8]),
//       nbNota: Number(proposal[9]),
//       membersVoted: Number(proposal[10]),
//       // --- vote info ---
//       proposer: String(proposal[11]),
//       // --- content ---
//       calls: Array(proposal[12]),
//       results: Array(proposal[13]),
//     })
//     setError(err)
//   }, [id])

//   console.log("GetProposalId 1", data)

//   return (
//     <>
//       {data ? (
//         <Box>
//           <Text>Proposal : {id} </Text>
//           <Text> ---- Status ---- </Text>
//           <Text>active : {data.active.toString()} </Text>
//           <Text>proceeded : {data.proceeded.toString()} </Text>
//           <Text>cancelled : {data.cancelled.toString()} </Text>
//           <Text> ---- Timing ---- </Text>
//           <Text>startAt : {data.startAt.toString()} </Text>
//           <Text>endAt : {data.endAt.toString()} </Text>
//           <Text>gracePeriod : {data.gracePeriod.toString()} </Text>
//           <Text> ---- Params ---- </Text>
//           <Text>threshold : {data.threshold.toString()} </Text>
//           <Text> ---- Result ---- </Text>
//           <Text>nbYes : {data.nbYes.toString()} </Text>
//           <Text>nbNo : {data.nbNo.toString()} </Text>
//           <Text>nbNota : {data.nbNota.toString()} </Text>
//           <Text>membersVoted : {data.membersVoted.toString()} </Text>
//           <Text> ---- Info ---- </Text>
//           <Text>proposer : {data.proposer.toString()} </Text>
//           <Text> ---- Content ---- </Text>
//           <Text>calls : {JSON.stringify(data.calls)} </Text>
//           <Text>results : {JSON.stringify(data.results)} </Text>
//         </Box>
//       ) : (
//         <Text>Rien à été trouver, </Text>
//       )}

//       {error && (
//         <div>An error occurred preparing the transaction: {error.message}</div>
//       )}
//     </>
//   )
// }
