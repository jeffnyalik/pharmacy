import { CustomersRequestComponent } from './components/customers-request/customers-request.component';
import { MedicinesComponent } from './components/medicines/medicines.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './404/notfound/notfound.component';
import { AdminComponent } from './components/admin/admin.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { CompanyBankComponent } from './components/company-bank/company-bank.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CompanyComponent } from './components/company/company.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { CustomersComponent } from './components/customers/customers.component';



const routes: Routes = [
  {path: '',  pathMatch: 'full', redirectTo: 'admin'},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'company', component: CompanyComponent, canActivate: [AuthGuard]},
  {path: 'medicines', component: MedicinesComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'customer-request', component:CustomersRequestComponent},
  {path: 'company/:id', component: CompanyDetailsComponent},
  {path: 'company-bank', component: CompanyBankComponent},
  {path: 'bank-details/:id', component: BankDetailsComponent},
  {path: '**', redirectTo: 'notfound'}
  // {path: '', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
