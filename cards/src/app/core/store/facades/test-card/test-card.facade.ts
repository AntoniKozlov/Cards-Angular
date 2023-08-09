import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { selectTestCardData } from "../../selectors/test-card.selector";
import { IAppState } from "../../state/app.state";

@Injectable({
    providedIn: 'root'
})
export class TestCardFacade {
    selectTestCardData$ = this._store.select(selectTestCardData);

    constructor(private _store: Store<IAppState>) { }

    dispatch(action: Action) {
        this._store.dispatch(action);
    }
}