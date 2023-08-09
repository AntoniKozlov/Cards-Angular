import { AddTestCard, AddTestCardSuccess, GetTestCards, GetTestCardsSuccess, UpdateTestCard, UpdateTestCardSuccess } from './../../actions/test-card.action';
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
//   @Effect()
//   getUser$ = this._actions$.pipe(
//     ofType<GetUser>(EUserActions.GetUser),
//     map(action => action.payload),
//     withLatestFrom(this._store.pipe(select(selectUserList))),
//     switchMap(([id, users]) => {
//       const selectedUser = users.filter(user => user.id === +id)[0];
//       return of(new GetUserSuccess(selectedUser));
//     })
//   );

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
            switchMap((testCardHttp: ITestCard) => of(new AddTestCardSuccess(testCardHttp)))
        )
    );

    updateTestCard$ = createEffect(() =>  
        this._actions$.pipe(
            ofType<UpdateTestCard>(ETestCardActions.UpdateTestCard),
            map(action => action.payload),
            switchMap((card: ITestCard) => this._testCardService.updateCardServer(card)),
            switchMap((testCardHttp: ITestCard) => of(new UpdateTestCardSuccess(testCardHttp)))
        )
    );
  

  constructor(
    private _testCardService: TestCardService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}