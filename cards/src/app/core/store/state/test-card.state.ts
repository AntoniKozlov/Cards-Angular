import { ITestCard } from "src/app/models/test-card/test-card"


export enum TestCardStatuses {
    EMPTY,
    SUCCESSFUL_ADDED,
    SUCCESSFUL_UPDATED,
    SUCCESSFUL_DELETED
}

export interface ITestCardState {
    testCards: ITestCard[];
    status: TestCardStatuses
}

export const initialTestCardState: ITestCardState = {
    testCards: [],
    status: TestCardStatuses.EMPTY
}

