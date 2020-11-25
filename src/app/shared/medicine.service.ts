import { HttpClient } from '@angular/common/http';
import { Medicines } from './../Entities/medicine';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  medicineUrl = 'http://127.0.0.1:8000/api/v1/medicine/';
  constructor(private http: HttpClient) { }

  getMedicine(){
   return this.http.get<Medicines[]>(`${this.medicineUrl}`);
  }
  addMedicine(medicine: Medicines){
    return this.http.post(`${this.medicineUrl}`, medicine);
  }
}
