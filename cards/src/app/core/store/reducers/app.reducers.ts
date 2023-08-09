import { IAppState } from './../state/app.state';
import { ActionReducerMap } from "@ngrx/store";
import { testCardReducers } from './test-card.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
    testCard: testCardReducers
}