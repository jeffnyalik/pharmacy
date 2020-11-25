import { Component, OnInit, TemplateRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastrService } from 'ngx-toastr';

import { first } from 'rxjs/operators';

import { CompanyBank } from './../../Entities/companyBank';
import { CompanyService } from './../../shared/company.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  id: any;
  bank: CompanyBank;
  bankDetails;
  modalRef: BsModalRef;
  submitted = false;
  allCompanies;
  formModel: FormGroup = new FormGroup({});

  constructor(private bankServe: CompanyService, private router: Router, private route: ActivatedRoute,
    private fb:FormBuilder, private modalService: BsModalService, private toastr: ToastrService) {
      this.formModel = this.fb.group({
        bank_name: ['', Validators.required],
        bank_account_no: ['', Validators.required],
      });
    }

    get f(){
      return this.formModel.controls;
    }

  ngOnInit(): void {
    this.getBankDetails(this.route.snapshot.paramMap.get('id'));
    this.id = this.route.snapshot.paramMap.get('id');
  }

  // Get Bank details
  getBankDetails(id){
    this.bankServe.bankDetail(id).subscribe(data => {
      this.bankDetails = data;
      console.log(this.bankDetails);
    });
  }

  editModal(edittemplate: TemplateRef<any>){
    this.modalRef = this.modalService.show(edittemplate);
  }

  onSubmit(){
    this.submitted = true;
    if (this.formModel.invalid){
      return;
    }else{
      this.bankServe.updateBank(this.id, this.formModel.value).subscribe(data => {
        this.bankDetails = data;
        this.toastr.success('updated successfully..');
        console.log(this.bankDetails);
      }, error => {
        this.toastr.error('An error has occured');
        console.log(error);
      });
    }
  }
  deleteBank(){
    this.bankServe.deleteBank(this.id).subscribe(data =>{
      console.log('DELETED', data);
      this.toastr.info('deleted...');
      this.router.navigate(['company-bank']);
    })
  }
}
