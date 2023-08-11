import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { combineLatest, merge, Subscription, take } from 'rxjs';

import { ITestCard, ITestCardDialogData, TestCard, TestCardDialogData, TestCardDialogDataStatuses } from 'src/app/models/test-card/test-card';



import { NoOptionals, TestCardService } from 'src/app/services/test-card.service';
import { latinLettersAndDigits, latinLettersOrDigits } from 'src/app/shared/regexp';
import { TestCardFacade } from 'src/app/core/store/test-card/test-card.facade';

@Component({
  selector: 'app-test-card-dialog',
  templateUrl: './test-card-dialog.component.html',
  styleUrls: ['./test-card-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardDialogComponent implements OnInit, OnDestroy {
  public maxDescriptionLength: number = 400;
  public maxNameLength: number = 100;
  public minLength: number = 2;

  testCardForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxNameLength),
      Validators.pattern(latinLettersOrDigits)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxDescriptionLength),
      Validators.pattern(latinLettersOrDigits)
    ]),
  });

  public get testCardDialogDataStatuses(): typeof TestCardDialogDataStatuses {
    return TestCardDialogDataStatuses;
  }

  public dialogData: ITestCardDialogData;
  private isUpdateCard: boolean;

  private subscriptions = new Subscription();
    
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ITestCardDialogData,
    private dialogRef: MatDialogRef<TestCardDialogComponent>,
    private testCardService: TestCardService,
    private testCardFacade: TestCardFacade
  ) { 
    this.dialogData = data;
    this.isUpdateCard = data.status == TestCardDialogDataStatuses.UPDATE_CARD;
    if (this.isUpdateCard) {
      this.testCardForm.patchValue({
        ...data
      });
    }
  }

  ngOnInit() {
    this.subscriptions.add(
      merge(this.testCardFacade.changeSuccess$, this.testCardFacade.createSuccess$)
      .pipe(take(1))
      .subscribe((card) => {
        console.log(`card: `, card)
        this.closeDialog(card);
      })
    );
  
    this.subscriptions.add(
      merge(this.testCardFacade.changeFailure$, this.testCardFacade.createFailure$)
      .pipe(take(1))
      .subscribe((error) => {

        console.error(`${this.isUpdateCard ? 'change' : 'create'}: `, error)
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  save() {
    const data: ITestCard = new TestCard(  
      this.name.value,
      this.description.value,
      this.dialogData.id
    );

    this.testCardFacade[
      this.isUpdateCard ? 'change' : 'create'
    ](data);
  }


  get name(): FormControl {
    return this.testCardForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.testCardForm.get('description') as FormControl;
  }

  closeDialog(data: ITestCard) {
    this.dialogRef.close(data);
  }

}
