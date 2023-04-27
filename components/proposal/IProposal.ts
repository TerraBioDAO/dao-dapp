export interface Proposal {
    // --- status ---
    active: boolean;
    proceeded: boolean;
    cancelled: boolean;

    // --- timing ---
    startAt: number;
    endAt: number;
    gracePeriod: number;
    // --- vote parameters ---
    threshold: number; // 0 ~ 10000
    // --- result ---
    nbYes: number;
    nbNo: number;
    nbNota: number;
    membersVoted: number;
    // --- vote info ---
    proposer: string;
    // --- content ---
    calls: [];
    results: [];
}