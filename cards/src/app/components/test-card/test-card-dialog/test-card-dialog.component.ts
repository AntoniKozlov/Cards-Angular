import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestCardDialogData, TestCardDialogDataStatuses } from 'src/app/models/test-cards/test-cards';


import { NoOptionals, TestCardService } from 'src/app/services/test-card.service';
import { latinLettersAndDigits, latinLettersOrDigits } from 'src/app/shared/regexp';

@Component({
  selector: 'app-test-card-dialog',
  templateUrl: './test-card-dialog.component.html',
  styleUrls: ['./test-card-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TestCardService],
})
export class TestCardDialogComponent implements OnInit {

  testCardForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern(latinLettersOrDigits)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern(latinLettersOrDigits)
    ]),
  });

  public get testCardDialogDataStatuses(): typeof TestCardDialogDataStatuses {
    return TestCardDialogDataStatuses;
  }

  public dialogData: TestCardDialogData;
  private isUpdateCard: boolean;
    
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TestCardDialogData,
    private dialogRef: MatDialogRef<TestCardDialogComponent>,
    private testCardService: TestCardService
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
    const data: NoOptionals<TestCardDialogData> = {
      id: this.isUpdateCard ? this.dialogData.id : this.testCardService.generateId,
      ...this.testCardForm.value,
      date: this.testCardService.newDate,
      status: this.dialogData.status,
    }
    this.closeDialog(data);
  }


  get name(): FormControl {
    return this.testCardForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.testCardForm.get('description') as FormControl;
  }

  closeDialog(data: TestCardDialogData) {
    this.dialogRef.close(data);
  }

}
