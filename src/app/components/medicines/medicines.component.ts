import { MedicineService } from './../../shared/medicine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicineInfo;
  constructor(private medService: MedicineService) { }

  ngOnInit(): void {
    this.medService.getMedicine().subscribe(data => {
      this.medicineInfo = data;
      console.log(this.medicineInfo);
    });
  }

}
