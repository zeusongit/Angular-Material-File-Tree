import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { HistoryComponent } from '../app/history/history.component';
import { NotfoundComponent } from '../app/notfound/notfound.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'history', component: HistoryComponent},
  { path: '404', component: NotfoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
