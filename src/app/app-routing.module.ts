import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './404/notfound/notfound.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MedicineDetailsComponent } from './components/medicine-details/medicine-details.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { NavbarComponent } from './components/navbar/navbar.component';




const routes: Routes = [
  {path: '',  pathMatch: 'full', redirectTo: 'admin'},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'medicines', component: MedicinesComponent},
  {path: 'medicine-details/:id', component: MedicineDetailsComponent},
  {path: '**', redirectTo: 'notfound'}
  // {path: '', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
