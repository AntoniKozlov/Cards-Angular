import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestCardsComponent } from './pages/test-cards/test-cards.component';

const routes: Routes = [
  { path: '', component: TestCardsComponent, },
  { path: '', redirectTo: '', pathMatch: 'full' },
  //{ path: 'page-not-found', component: PageNotFoundComponent, canActivate: [SignInGuard] },
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
