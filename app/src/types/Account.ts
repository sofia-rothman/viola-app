export interface Account {
    id: string,
    experience: number,
    balance: number,
    points: number,
    restrictedItems: string[],
    children: string[],
    parents: string[]
}

export const createAccount = (uid: string) => {
    return {
        id: uid,
        experience: 0,
        balance: 0,
        points: 0,
        restrictedItems: [],
        children: [],
        parents: []
    }
}