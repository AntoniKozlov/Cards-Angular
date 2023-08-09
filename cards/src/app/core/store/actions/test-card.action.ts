import { TestCardStatuses } from './../state/test-card.state';
import { ITestCard } from './../../../models/test-card/test-card';
import { Action } from "@ngrx/store";


export enum ETestCardActions {
    AddTestCard = '[Test Card] Add Test Card',
    AddTestCardSuccess = '[Test Card] Add Test Card Success',
    UpdateTestCard = '[Test Card] Update Test Card',
    UpdateTestCardSuccess = '[Test Card] Update Test Card Success',
    DeleteTestCard = '[Test Card] Delete Test Card',
    GetTestCards = '[Test Card] Get Test Cards',
    GetTestCardsSuccess = '[Test Card] Get Test Cards Success',
    ChangeTestCardStatus = '[Test Card] Change Test Card Status',
}

export class AddTestCard implements Action {
    public readonly type = ETestCardActions.AddTestCard;
    constructor(public payload: ITestCard) {}
}

export class AddTestCardSuccess implements Action {
    public readonly type = ETestCardActions.AddTestCardSuccess;
    constructor(public payload: ITestCard) {}
}

export class UpdateTestCard implements Action {
    public readonly type = ETestCardActions.UpdateTestCard;
    constructor(public payload: ITestCard) {}
}

export class UpdateTestCardSuccess implements Action {
    public readonly type = ETestCardActions.UpdateTestCardSuccess;
    constructor(public payload: ITestCard) {}
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

export class ChangeTestCardStatus implements Action {
    public readonly type = ETestCardActions.ChangeTestCardStatus;
    constructor(public payload: TestCardStatuses) {}
}


export type TestCardActions = 
    AddTestCard | 
    UpdateTestCard | 
    UpdateTestCardSuccess |
    DeleteTestCard | 
    GetTestCards | 
    GetTestCardsSuccess | 
    AddTestCardSuccess |
    ChangeTestCardStatus;