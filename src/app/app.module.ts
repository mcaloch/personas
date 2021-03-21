import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/Table';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
 {path: 'persona-list', component: PersonasComponent},
 {path: '', redirectTo: '/persona-list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
