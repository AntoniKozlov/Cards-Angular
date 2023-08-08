import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITestCardDialogData, TestCardDialogData, TestCardDialogDataStatuses } from 'src/app/models/test-card/test-card';



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
    const data: NoOptionals<ITestCardDialogData> = new TestCardDialogData(
      this.dialogData.status,
      this.name.value,
      this.description.value,
      this.isUpdateCard ? this.dialogData.id : undefined,
    );
    
    this.closeDialog(data);
  }


  get name(): FormControl {
    return this.testCardForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.testCardForm.get('description') as FormControl;
  }

  closeDialog(data: ITestCardDialogData) {
    this.dialogRef.close(data);
  }

}
