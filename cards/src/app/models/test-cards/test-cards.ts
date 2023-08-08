export interface TestCard {
    id: number,
    name: string,
    description: string,
    date: Date
}

export interface TestCardDialogData extends Partial<TestCard> {
    status: TestCardDialogDataStatuses
}

export enum TestCardDialogDataStatuses {
    CREATE_CARD,
    UPDATE_CARD
}
