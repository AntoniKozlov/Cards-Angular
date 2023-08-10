import { AddTestCard, AddTestCardSuccess, DeleteTestCard, DeleteTestCardSuccess, GetTestCards, GetTestCardsSuccess, UpdateTestCard, UpdateTestCardSuccess } from './../../actions/test-card.action';
import { TestCardService } from 'src/app/services/test-card.service';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { ETestCardActions } from '../../actions/test-card.action';
import { ITestCard, TestCard } from 'src/app/models/test-card/test-card';
import { IAppState } from '../../state/app.state';

@Injectable()
export class TestCardEffects {

    getTestCards$ = createEffect(() =>  
        this._actions$.pipe(
            ofType<GetTestCards>(ETestCardActions.GetTestCards),
            switchMap(() => this._testCardService.getCardsFromServer()),
            switchMap((testCardsHttp: ITestCard[]) => of(new GetTestCardsSuccess(testCardsHttp)))
        )
    );

    addTestCard$ = createEffect(() =>  
        this._actions$.pipe(
            ofType<AddTestCard>(ETestCardActions.AddTestCard),
            map(action => action.payload),
            switchMap((card: ITestCard) => this._testCardService.addCardServer(card)),
            switchMap((card: ITestCard) => of(new AddTestCardSuccess(card)))
        )
    );

    updateTestCard$ = createEffect(() =>  
        this._actions$.pipe(
            ofType<UpdateTestCard>(ETestCardActions.UpdateTestCard),
            map(action => action.payload),
            switchMap((card: ITestCard) => this._testCardService.updateCardServer(card)),
            switchMap((card: ITestCard) => of(new UpdateTestCardSuccess(card)))
        )
    );

    deleteTestCard$ = createEffect(() =>  
        this._actions$.pipe(
            ofType<DeleteTestCard>(ETestCardActions.DeleteTestCard),
            map(action => action.payload),
            switchMap((card: ITestCard) => this._testCardService.deleteCardServer(card)),
            switchMap((card: ITestCard) => of(new DeleteTestCardSuccess(card)))
        )
    );
  

    constructor(
        private _testCardService: TestCardService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) {}
}