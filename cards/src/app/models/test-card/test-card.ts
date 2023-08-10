export interface ITestCard {
    id: number;
    name: string;
    description: string;
    date: Date;
}

export class TestCard implements ITestCard {
    readonly id: number;
    public name: string;
    public description: string;
    readonly date: Date;

    constructor(name: string, description: string, id?: number, date?: Date) {
        this.name = name;
        this.description = description;
        this.id = id ?? 0;
        this.date = date ?? this.newDate;
    }

    get newDate(): Date {
        return new Date();
    }
}

export interface ITestCardDialogData extends Partial<TestCard> {
    status: TestCardDialogDataStatuses
}

export class TestCardDialogData extends TestCard implements ITestCardDialogData{
    public status: TestCardDialogDataStatuses;

    constructor(status: TestCardDialogDataStatuses, name: string, description: string, id?: number, date?: Date) {
        super(name, description, id, date);
        this.status = status;
    }
}

export enum TestCardDialogDataStatuses {
    CREATE_CARD,
    UPDATE_CARD
}