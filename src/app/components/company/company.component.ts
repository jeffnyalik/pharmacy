import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { first, switchMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { Observable, BehaviorSubject } from 'rxjs';

import { Company } from './../../Entities/company';
import { CompanyService } from './../../shared/company.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyInfo;
  modalRef: BsModalRef;
  submitted = false;
  refreshList$ = new BehaviorSubject<boolean>(true);
  formModel: FormGroup = new FormGroup({});
  constructor(private compService: CompanyService, private modalService: BsModalService, 
    private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.formModel = this.fb.group({
      bank_id: ['', Validators.required],
      name: ['', Validators.required],
      license_no: ['', Validators.required],
      contact_no: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  get f(){
    return this.formModel.controls;
  }

  ngOnInit(): void {
    this.compService.getCompany().subscribe(data => {
      this.companyInfo = data;
      console.log(this.companyInfo);

    }, error => {
      console.log(error);
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
      this.compService.addCompany(this.formModel.value).pipe(first()).subscribe(data => {
        this.formModel.reset();
        this.toastr.success('Added successfully');
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }
  


}
