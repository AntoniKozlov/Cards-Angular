import { Injectable } from "@angular/core";
import { Actions, ofActionDispatched, Select, Store } from "@ngxs/store";
import { map, Observable } from "rxjs";

import { ITestCard } from './../../src/app/models/test-card/test-card';
import { TestCardState } from "./test-card.state";
import * as TestCardActions from './test-card.actions';


@Injectable()
export class TestCardFacade {
    @Select(TestCardState.loaded)
    loaded$!: Observable<boolean>;

    @Select(TestCardState.testCards)
    testCards$!: Observable<ITestCard[]>;

    @Select(TestCardState.testCard)
    testCard$!: Observable<ITestCard>;
    post$ = (id: number) => this.store.select(TestCardState.testCard(id));


    loadSuccess$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.LoadSuccess),
        map(({ testCards }) => testCards)
    );

    loadFailure$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.LoadFailure),
        map(({ error }) => error)
    );

    createSuccess$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.CreateSuccess),
        map(({ testCard }) => testCard)
      );
    
    createFailure$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.CreateFailure),
        map(({ error }) => error)
    );

    changeSuccess$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.ChangeSuccess),
        map(({ testCard }) => testCard)
    );
    
    changeFailure$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.ChangeFailure),
        map(({ error, id }) => ({ error, id }))
    );
    
    removeSuccess$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.RemoveSuccess),
        map(({ id }) => id)
    );
    
    removeFailure$ = this.actions.pipe(
        ofActionDispatched(TestCardActions.RemoveFailure),
        map(({ error, id }) => ({ error, id }))
    );


    constructor(private readonly store: Store, private actions: Actions) {}


    load() {
        this.store.dispatch(new TestCardActions.Load());
    }

    create(testCardCreate: ITestCard) {
        this.store.dispatch(new TestCardActions.Create(testCardCreate));
    }

    change(testCardChange: ITestCard): void {
        this.store.dispatch(new TestCardActions.Change(testCardChange));
    }

    remove(id: number): void {
        this.store.dispatch(new TestCardActions.Remove(id));
    }
    
}