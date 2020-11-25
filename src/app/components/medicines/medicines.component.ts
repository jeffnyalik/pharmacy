import { MedicineService } from './../../shared/medicine.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicineInfo;
  modalRef: BsModalRef;
  submitted = false;
  formModel: FormGroup = new FormGroup({});
  constructor(private medService: MedicineService, private modalService: BsModalService, 
    private fb: FormBuilder, private router: Router, private toastr: ToastrService) { 
      this.formModel = this.fb.group({
        name: ['', Validators.required],
        medical_type: ['', Validators.required],
        buy_price: ['', Validators.required],
        sell_price: ['', Validators.required],
        batch_no: ['', Validators.required],
        shelf_no: ['', Validators.required],
        exp_date: ['', Validators.required],
        mfg_date: ['', Validators.required],
        in_stock_total: ['', Validators.required],
        description: ['', Validators.required]
      });
    }

    get f(){
      return this.formModel.controls;
    }

  ngOnInit(): void {
    this.medService.getMedicine().subscribe(data => {
      this.medicineInfo = data;
      console.log(this.medicineInfo);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(){
    this.submitted = true;
    if (this.formModel.invalid){
      return;
    }else{
      this.medService.addMedicine(this.formModel.value).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

}
