import { ITestCard } from "src/app/models/test-card/test-card";


export class Load {
  static readonly type = '[TestCard] Load';
}

export class LoadSuccess {
  static readonly type = '[TestCard] Load Success';

  constructor(public readonly testCards: ITestCard[]) {}
}

export class LoadFailure {
  static readonly type = '[TestCard] Load Failure';

  constructor(public readonly error: unknown) {}
}



export class Create {
  static readonly type = '[TestCard] Create';

  constructor(public readonly testCardCreate: ITestCard) {}
}

export class CreateSuccess {
  static readonly type = '[TestCard] Create Success';

  constructor(public readonly testCard: ITestCard) {}
}

export class CreateFailure {
  static readonly type = '[TestCard] Create Failure';

  constructor(public readonly error: unknown) {}
}



export class Change {
  static readonly type = '[TestCard] Change';

  constructor(public readonly testCardChange: ITestCard) {}
}

export class ChangeSuccess {
  static readonly type = '[TestCard] Change Success';

  constructor(public readonly testCard: ITestCard) {}
}

export class ChangeFailure {
  static readonly type = '[TestCard] Change Failure';

  constructor(public readonly error: unknown, public readonly id: number) {}
}



export class Remove {
  static readonly type = '[TestCard] Remove';

  constructor(public readonly id: number) {}
}

export class RemoveSuccess {
  static readonly type = '[TestCard] Remove Success';

  constructor(public readonly id: number) {}
}

export class RemoveFailure {
  static readonly type = '[TestCard] Remove Failure';

  constructor(public readonly error: unknown, public readonly id: number) {}
}