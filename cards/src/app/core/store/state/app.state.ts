
import { initialTestCardState, ITestCardState } from "./test-card.state";

export interface IAppState {
    testCard: ITestCardState
}

export const initialAppState: IAppState = {
    testCard: initialTestCardState
}

export function getInitialState(): IAppState {
    return initialAppState;
}