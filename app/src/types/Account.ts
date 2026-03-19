export interface Account {
    experience: number,
    balance: number,
    restrictedItems: string[],
    children: string[],
    parents: string[]
}

export const createAccount = () => {
    return {
        experience: 0,
        balance: 0,
        restrictedItems: [],
        children: [],
        parents: []
    }
}