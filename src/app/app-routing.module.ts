import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PersonasComponent } from './personas/personas.component';

const routes: Routes = [
 {path: 'persona-list', component: PersonasComponent},
 {path: '', redirectTo: '/persona-list', pathMatch: 'full'}
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }