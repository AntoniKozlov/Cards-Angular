import { ITestCard } from "src/app/models/test-card/test-card"

export interface ITestCardState {
    testCards: ITestCard[];
}

export const initialTestCardState: ITestCardState = {
    testCards: []
}