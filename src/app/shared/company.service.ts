import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Company } from './../Entities/company';
import { CompanyBank } from './../Entities/companyBank';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyUrl = 'http://127.0.0.1:8000/api/v1/company';
  companyBankUrl = 'http://127.0.0.1:8000/api/v1/companyBank/';
  constructor(private http: HttpClient) { }

  getCompany(){
    return this.http.get<Company[]>(`${this.companyUrl}`);
  }

  getCompanyDetail(id): Observable<any>{
    return this.http.get(`${this.companyUrl}/${id}`, id);
  }

  addCompany(company: Company){
    return this.http.post(`${this.companyUrl}/`, company);
  }

  updateCompany(id, data): Observable<any>{
    return this.http.put(`${this.companyUrl}/${id}/`, data);
  }

  deleteCompany(id): Observable<any>{
    return this.http.delete(`${this.companyUrl}/${id}`);
  }

  /////////////// Company bank
  getcompanyBank(){
    return this.http.get<CompanyBank[]>(`${this.companyBankUrl}`);
  }
  addcompanyBank(companyBank: CompanyBank){
    return this.http.post(`${this.companyBankUrl}`, companyBank);
  }
}
