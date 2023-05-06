import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Select,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { chooseVoteIsValid } from "@/lib/validations"
import ButtonVoteProposal from "./ButtonVoteProposal"

export type ProposalDraft = {
    decision: number
}

// 0 = No / 1 = Yes / 2 = Nota
const optionsChoose = [{
    id: 0,
    label: "No",
    value: 0
}, {
    id: 1,
    label: "Yes",
    value: 1
}, {
    id: 2,
    label: "Nota",
    value: 2
}]

export default function FormVoteProposal(props: any) {
    const { proposalId } = props
    const [draft, setDraft] = useState<ProposalDraft>({
        decision: 0
    })

    const formIsValid = () => {
        if (
            chooseVoteIsValid(draft.decision)
        ) return true
        else return false
    }

    return (
        <>
            <Heading>Vote on proposal</Heading>

            {/* Choose decision for voting */}
            <FormControl isRequired isInvalid={!chooseVoteIsValid(draft.decision)}>
                <FormLabel color={"primary.50"}>
                    Choose for vote: ({draft.decision})
                </FormLabel>
                <Select
                    onChange={(e) => setDraft({ ...draft, decision: Number(e.target.value) })}
                    bg={"darkness.500"}
                    value={draft.decision}
                >
                    {optionsChoose.map(d =>
                        <option key={d.id} value={d.value}>{d.label}</option>
                    )}
                </Select>
                {!chooseVoteIsValid(draft.decision) && (
                    <FormErrorMessage>Must be greater than 1.</FormErrorMessage>
                )}
            </FormControl>

            {/* SUBMIT */}
            {!formIsValid() ? (
                <Text>Form is not valid</Text>
            ) : (
                <ButtonVoteProposal
                    proposalId={proposalId}
                    descision={draft.decision}
                />
            )}

        </>
    )
}
