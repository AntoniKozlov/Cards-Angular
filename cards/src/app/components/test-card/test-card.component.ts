
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TestCardDialogComponent } from './test-card-dialog/test-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { NoOptionals, TestCardService } from '../../services/test-card.service';
import { TestCard, TestCardDialogData, TestCardDialogDataStatuses } from 'src/app/models/test-cards/test-cards';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'cardItem';
  @Input() card: any;

  constructor(private dialog: MatDialog, private testCardService: TestCardService) { }

  ngOnInit() {
  }


  addCard(card?: TestCard) {
    const data: TestCardDialogData = {
      ...card,
      status: card ? TestCardDialogDataStatuses.UPDATE_CARD : TestCardDialogDataStatuses.CREATE_CARD
    };

    const dialogRef = this.dialog.open(TestCardDialogComponent, {
      data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((result: NoOptionals<TestCardDialogData>) => {
      if (result) {
        this.testCardService.addOrUpdateCard(result);
      }
    });
  }

  deleteCard(e: Event, card: TestCard) {
    e.stopPropagation();
    this.testCardService.deleteCard(card);
    
  }

  getDate() {
    console.log(new Date())
  }
}
