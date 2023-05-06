// On fera des Schema avec "yup" par la suite

// Check if date is above a actual time
export const dateStartIsValid = (date: number) => {
    switch (true) {
        case date === 0:
            return true
        case (date >= Math.floor(Date.now() / 1000)) :
            return true
        default:
            return false
    }
}

// Check if votingPeriod is greater than 1
export const dateVotingPeriodIsValid = (d: number) => {
    if (d >= 1) return true
    else return false
}

// Check if gracePeriod is greater than 1
export const dateGracePeriodIsValid = (d: number) => {
    if (d >= 1) return true
    else return false
}

// Check if total threshold is between to 8000 and 10000
export const thresholdIsValid = (total: number) => {
    if (total >= 8000 && total <= 10000) return true
    else return false
}