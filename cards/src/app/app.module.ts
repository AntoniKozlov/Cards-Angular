import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestCardDialogComponent } from './components/test-card/test-card-dialog/test-card-dialog.component';
import { TestCardComponent } from './components/test-card/test-card.component';
import { TestCardsGridComponent } from './components/test-card/test-cards-grid/test-cards-grid.component';
import { TestCardsComponent } from './pages/test-cards/test-cards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { CutTextDirective } from './directives/cut-text.directive';
import { appReducers } from './core/store/reducers/app.reducers';
import { TestCardEffects } from './core/store/effects/test-card/test-card.effects';
import { NgxsModule } from '@ngxs/store';



@NgModule({
  declarations: [
    AppComponent,
    TestCardsComponent,
    TestCardComponent,
    TestCardsGridComponent,
    TestCardDialogComponent,
    CutTextDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([TestCardEffects]),
    NgxsModule.forRoot([], {
      developmentMode: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
