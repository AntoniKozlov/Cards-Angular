import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { selectTestCardData, selectTestCardStatus } from "../../selectors/test-card.selector";
import { IAppState } from "../../state/app.state";

@Injectable({
    providedIn: 'root'
})
export class TestCardFacade {
    selectTestCardData$ = this._store.select(selectTestCardData);
    selectTestCardStatus$ = this._store.select(selectTestCardStatus);

    constructor(private _store: Store<IAppState>) { }

    dispatch(action: Action) {
        this._store.dispatch(action);
    }
}