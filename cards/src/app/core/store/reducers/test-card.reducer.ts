import { initialTestCardState, ITestCardState, TestCardStatuses } from '../state/test-card.state';
import { ETestCardActions, TestCardActions } from '../actions/test-card.action';
import { ITestCard, TestCard } from 'src/app/models/test-card/test-card';

export const testCardReducers = (
    state = initialTestCardState,
    action: TestCardActions
): ITestCardState => {
    switch(action.type) {
        case ETestCardActions.GetTestCardsSuccess: {
            return {
                testCards: action.payload,
                status: state.status
            };
        };

        case ETestCardActions.AddTestCardSuccess: {
            
            return {
                testCards: state.testCards.concat(action.payload),
                status: TestCardStatuses.SUCCESSFUL_ADDED
            };
        };

        case ETestCardActions.ChangeTestCardStatus: {
            return {
                testCards: state.testCards,
                status: action.payload
            };
        };

        case ETestCardActions.UpdateTestCardSuccess: {
            const updatedCard = action.payload;
            const existingCardIndex = state.testCards.findIndex(existingCard => existingCard.id == updatedCard.id);
            const clonedCards: ITestCard[] = [...state.testCards];

            if (existingCardIndex !== -1) {
              const newUpdatedCard = new TestCard(updatedCard.name, updatedCard.description, updatedCard.id, updatedCard.date);
              clonedCards.splice(existingCardIndex, 1, newUpdatedCard);
            }

            return {
                testCards: clonedCards,
                status: TestCardStatuses.SUCCESSFUL_UPDATED
            };
        };

        case ETestCardActions.DeleteTestCardSuccess: {
            const deletedCard = action.payload;
            const existingCardIndex = state.testCards.findIndex(existingCard => existingCard.id == deletedCard.id);
            const clonedCards: ITestCard[] = [...state.testCards];

            if (existingCardIndex !== -1) {
                clonedCards.splice(existingCardIndex, 1);
            }

            return {
                testCards: clonedCards,
                status: TestCardStatuses.SUCCESSFUL_DELETED
            };
        };

        default: {
            return state;
        };
    }
}