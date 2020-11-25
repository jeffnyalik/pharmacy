import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { NotfoundComponent } from './404/notfound/notfound.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyComponent } from './components/company/company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { CompanyBankComponent } from './components/company-bank/company-bank.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminComponent,
    NotfoundComponent,
    CompanyComponent,
    CompanyDetailsComponent,
    UpdateCompanyComponent,
    CompanyBankComponent,
    BankDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    NgbModule, // ToastrModule added
    ModalModule.forRoot()
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
