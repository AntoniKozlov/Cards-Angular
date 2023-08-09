import { ITestCard } from './../../../models/test-card/test-card';
import { Action } from "@ngrx/store";


export enum ETestCardActions {
    AddTestCard = '[Test Card] Add Test Card',
    UpdateTestCard = '[Test Card] Update Test Card',
    DeleteTestCard = '[Test Card] Delete Test Card',
    GetTestCards = '[Test Card] Get Test Cards',
    GetTestCardsSuccess = '[Test Card] Get Test Cards Success',
}

export class AddTestCard implements Action {
    public readonly type = ETestCardActions.AddTestCard;
}

export class UpdateTestCard implements Action {
    public readonly type = ETestCardActions.UpdateTestCard;
}

export class DeleteTestCard implements Action {
    public readonly type = ETestCardActions.DeleteTestCard;
}

export class GetTestCards implements Action {
    public readonly type = ETestCardActions.GetTestCards;
}

export class GetTestCardsSuccess implements Action {
    public readonly type = ETestCardActions.GetTestCardsSuccess;
    constructor(public payload: ITestCard[]) {}
  }

export type TestCardActions = AddTestCard | UpdateTestCard | DeleteTestCard | GetTestCards | GetTestCardsSuccess;