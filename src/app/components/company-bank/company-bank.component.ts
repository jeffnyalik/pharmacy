import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastrService } from 'ngx-toastr';

import { CompanyBank } from './../../Entities/companyBank';
import { CompanyService } from './../../shared/company.service';

@Component({
  selector: 'app-company-bank',
  templateUrl: './company-bank.component.html',
  styleUrls: ['./company-bank.component.css']
})
export class CompanyBankComponent implements OnInit {
  companyBankInfo;
  nothing;
  formModel: FormGroup = new FormGroup({});
  modalRef: BsModalRef;
  submitted = false;
  constructor(private  compService: CompanyService, private modalService: BsModalService,
    private fb:FormBuilder, private toastr: ToastrService
    ) {
    this.formModel = this.fb.group({
      bank_name: ['', Validators.required],
      bank_account_no: ['', Validators.required],
     
    });
  }
  get f(){
    return this.formModel.controls;
  }

  ngOnInit(): void {
    this.compService.getcompanyBank().subscribe(data => {
      this.companyBankInfo = data;
      console.log(this.companyBankInfo);
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
      this.compService.addcompanyBank(this.formModel.value).pipe(first()).subscribe(
        data =>{
          this.toastr.success('Data has been inserted');
          console.log('Data has been inserted successfully');
        }, error => {
          this.toastr.error('Error has occured.');
          console.log(error);
        }
      );
    }
  }

}
