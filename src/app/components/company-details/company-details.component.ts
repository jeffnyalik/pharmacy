import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ToastrService } from 'ngx-toastr';

import { first } from 'rxjs/operators';

import { Company } from './../../Entities/company';
import { CompanyService } from './../../shared/company.service';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  formModel: FormGroup = new FormGroup({});
  id: any;
  companyDetails;
  bankInfo; // to be removed later;
  submitted = false;
  confirmDelete = false;
  modalRef: BsModalRef;

  constructor(private compService: CompanyService, private route: ActivatedRoute, 
    private modalService: BsModalService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
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

    this.getCompanyDetails(this.route.snapshot.paramMap.get('id'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.compService.getcompanyBank().subscribe(data =>{
      this.bankInfo = data;
      console.log(this.bankInfo);
    });
  }
  getCompanyDetails(id){
    this.compService.getCompanyDetail(id).subscribe(data => {
      this.companyDetails = data;
      console.log(this.companyDetails);
    }, error => {
      console.log(error);
    });
  }

  deleteCompany(){
    this.compService.deleteCompany(this.id).subscribe(data => {
      this.toastr.success('data has been deleted successfully..')
      this.router.navigate(['company']);
      console.log(data, 'DELETED');
    }, error => {console.log(error); });
  }

  editModal(edittemplate: TemplateRef<any>){
    this.modalRef = this.modalService.show(edittemplate);
  }

  onSubmit(){
    this.submitted = true;
    if (this.formModel.invalid){
      return;
    }else{
      this.compService.updateCompany(this.id, this.formModel.value).subscribe(data => {
        this.toastr.success('updated successfully');
        this.companyDetails = data;
        console.log(this.companyDetails);
      }, error => {
        this.toastr.error('Error');
        this.router.navigate(['/bank-details']);
        console.log(error);
       });
    }
  }

}
