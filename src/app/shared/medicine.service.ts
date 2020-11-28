import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Medicines } from './../Entities/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  medicineUrl = 'http://127.0.0.1:8000/api/v1/medicine/';
  constructor(private http: HttpClient) { }

  getMedicine(){
   return this.http.get<Medicines[]>(`${this.medicineUrl}`);
  }

  getMedInfo(id): Observable<any>{
    return this.http.get(`${this.medicineUrl}${id}`, id);
  }

  addMedicine(medicine: Medicines){
    return this.http.post(`${this.medicineUrl}`, medicine);
  }

  updateMedicine(id, data): Observable<any>{
    return this.http.put(`${this.medicineUrl}${id}/`, data);
  }

  deleteMedicine(id): Observable<any>{
    return this.http.delete(`${this.medicineUrl}${id}/`, id);
  }
}
