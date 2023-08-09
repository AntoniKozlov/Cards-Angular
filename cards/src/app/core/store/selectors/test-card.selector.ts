import { createSelector } from '@ngrx/store';
import { ITestCardState } from '../state/test-card.state';
import { IAppState } from '../state/app.state';

const selectTestCard = (appState: IAppState) => appState.testCard;

export const selectTestCardData = createSelector(
    selectTestCard,
    (state: ITestCardState) => state.testCards
)

export const selectTestCardStatus = createSelector(
    selectTestCard,
    (state: ITestCardState) => state.status
)


