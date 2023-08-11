import { ITestCard } from '../../../models/test-card/test-card';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit, Selector, createSelector } from '@ngxs/store';

import * as TestCardActions from './test-card.actions';
import { TestCardService } from 'src/app/services/test-card.service';
import { catchError, map } from 'rxjs';


export interface TestCardStateModel {
  readonly loaded: boolean;
  readonly ids: number[];
  readonly entities: Record<number, ITestCard>;
}

export const initialTestCardState: TestCardStateModel = {
  ids: [],
  entities: {},
  loaded: false,
};


@State<TestCardStateModel>({
  name: 'testCards',
  defaults: initialTestCardState
})
@Injectable()
export class TestCardState implements NgxsOnInit {


  @Selector()
  static loaded(state: TestCardStateModel): boolean {
    return state.loaded;
  }

  @Selector()
  static testCards(state: TestCardStateModel): ITestCard[] {
    return Object.values(state.entities);
  }

  static testCard(id: number): (state: TestCardStateModel) => ITestCard | null {
    return createSelector([TestCardState], (state: TestCardStateModel) => {
      return state.entities[id] ?? null;
    });
  }
  
  constructor(private readonly testCardService: TestCardService) {}

  ngxsOnInit(ctx: StateContext<TestCardStateModel>): void {
    ctx.dispatch(new TestCardActions.Load());
  }

  @Action(TestCardActions.Load)
  load(ctx: StateContext<TestCardStateModel>) {
    return this.testCardService.getCardsFromServer().pipe(
      map((cards) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          ids: cards.map((card) => card.id),
          entities: cards.reduce((acc, current) => ({ ...acc, [current.id]: current }), {}),
        });

        return ctx.dispatch(new TestCardActions.LoadSuccess(cards));
      }),
      catchError((error: unknown) => ctx.dispatch(new TestCardActions.LoadFailure(error)))
    );
  }

  @Action(TestCardActions.Create)
  create(ctx: StateContext<TestCardStateModel>, { testCardCreate }: TestCardActions.Create) {
    return this.testCardService.addCardServer(testCardCreate).pipe(
      map((card) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          ids: !state.ids.includes(card.id) ? [...state.ids, card.id] : state.ids,
          entities: { ...state.entities, [card.id]: card },
        });

        return ctx.dispatch(new TestCardActions.CreateSuccess(card));
      }),
      catchError((error: unknown) => ctx.dispatch(new TestCardActions.CreateFailure(error)))
    );
  }

  @Action(TestCardActions.Change)
  change(ctx: StateContext<TestCardStateModel>, { testCardChange }: TestCardActions.Change) {
    return this.testCardService.updateCardServer(testCardChange).pipe(
      map((card) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          ids: !state.ids.includes(card.id) ? [...state.ids, card.id] : state.ids,
          entities: { ...state.entities, [card.id]: card },
        });

        return ctx.dispatch(new TestCardActions.ChangeSuccess(card));
      }),
      catchError((error: unknown) => ctx.dispatch(new TestCardActions.ChangeFailure(error, testCardChange.id)))
    );
  }

  @Action(TestCardActions.Remove)
  remove(ctx: StateContext<TestCardStateModel>, { id }: TestCardActions.Remove) {
    return this.testCardService.deleteCardServer(id).pipe(
      map(() => {
        const state = ctx.getState();

        const entities = { ...state.entities };
        delete entities[id];

        ctx.setState({
          ...state,
          ids: state.ids.filter((existId) => existId !== id),
          entities,
        });

        return ctx.dispatch(new TestCardActions.RemoveSuccess(id));
      }),
      catchError((error: unknown) => ctx.dispatch(new TestCardActions.RemoveFailure(error, id)))
    );
  }
}
