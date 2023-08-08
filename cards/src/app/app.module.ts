import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestCardDialogComponent } from './components/test-card/test-card-dialog/test-card-dialog.component';
import { TestCardComponent } from './components/test-card/test-card.component';
import { TestCardsGridComponent } from './components/test-card/test-cards-grid/test-cards-grid.component';
import { TestCardsComponent } from './pages/test-cards/test-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestCardsComponent,
    TestCardComponent,
    TestCardsGridComponent,
    TestCardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
