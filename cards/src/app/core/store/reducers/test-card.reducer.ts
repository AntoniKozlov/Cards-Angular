import { initialTestCardState, ITestCardState } from '../state/test-card.state';
import { ETestCardActions, TestCardActions } from '../actions/test-card.action';

export const testCardReducers = (
    state = initialTestCardState,
    action: TestCardActions
): ITestCardState => {
    switch(action.type) {
        case ETestCardActions.GetTestCardsSuccess: {
            return {
                testCards: action.payload
            };
        };

        // case EProgressSpinnerActions.HideProgressSpinner: {
        //     return {
        //         isDisplayed: false
        //     };
        // };

        default: {
            return state;
        };
    }
}