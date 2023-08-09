import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AddTestCard, ChangeTestCardStatus, UpdateTestCard } from 'src/app/core/store/actions/test-card.action';
import { TestCardFacade } from 'src/app/core/store/facades/test-card/test-card.facade';
import { TestCardStatuses } from 'src/app/core/store/state/test-card.state';
import { ITestCard, ITestCardDialogData, TestCard, TestCardDialogData, TestCardDialogDataStatuses } from 'src/app/models/test-card/test-card';



import { NoOptionals, TestCardService } from 'src/app/services/test-card.service';
import { latinLettersAndDigits, latinLettersOrDigits } from 'src/app/shared/regexp';

@Component({
  selector: 'app-test-card-dialog',
  templateUrl: './test-card-dialog.component.html',
  styleUrls: ['./test-card-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [TestCardService],
})
export class TestCardDialogComponent implements OnInit {
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
  }

  save() {
    const data: ITestCard = new TestCard(  
      this.name.value,
      this.description.value
    );
    
    this.testCardFacade.dispatch(
      this.isUpdateCard ? new UpdateTestCard(data) : new AddTestCard(data)
    );

    this.testCardFacade.selectTestCardStatus$.pipe(take(1)).subscribe((status) => {
      if (status === TestCardStatuses.SUCCESSFUL_ADDED) {
        this.closeDialog(status);
        this.testCardFacade.dispatch(new ChangeTestCardStatus(TestCardStatuses.EMPTY));
      }
    });
    
  }


  get name(): FormControl {
    return this.testCardForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.testCardForm.get('description') as FormControl;
  }

  closeDialog(data: TestCardStatuses) {
    this.dialogRef.close(data);
  }

}
