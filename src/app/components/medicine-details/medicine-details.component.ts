import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastrService } from 'ngx-toastr';

import { MedicineService } from 'src/app/shared/medicine.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css']
})
export class MedicineDetailsComponent implements OnInit {
  id: any;
  medDetailsInfo;
  medicineInfo;
  modalRef: BsModalRef;
  submitted = false;
  formModel: FormGroup = new FormGroup({});
  constructor(private medService: MedicineService, private modalService: BsModalService,
    private fb: FormBuilder, private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute) {
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

    // get the id
    this.id = this.route.snapshot.paramMap.get('id');
    this.getMedicineDetail(this.route.snapshot.paramMap.get('id'));
  }

  getMedicineDetail(id){
    this.medService.getMedInfo(id).subscribe(data => {
      this.medDetailsInfo = data;
      console.log(this.medDetailsInfo);
    }, error => {
      console.log(error);
    });
  }

  editModal(editTemplate: TemplateRef<any>){
    this.modalRef = this.modalService.show(editTemplate);
  }

  onSubmit(){
    if (this.formModel.invalid){
      return;
    }else{
      this.medService.updateMedicine(this.id, this.formModel.value).subscribe(data => {
        this.toastr.success('updated successfully');
        console.log(data);
      }, error => {
        this.toastr.error('Error updating');
        console.log(error);
      });
    }
    console.log('the form is working...');
  }

  deleteMed(){
    this.medService.deleteMedicine(this.id).subscribe(data => {
      this.toastr.warning('deleted');
      console.log(data); // should return nothing
      console.log('DELETED SUCCESSFULLY');
      this.router.navigate(['/medicines']);
    }, error => {
      console.log(error);
    });
  }

}
