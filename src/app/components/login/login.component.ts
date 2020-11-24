import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { first } from 'rxjs/operators';

import { UserService } from './../../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastr: ToastrService, private router: Router, private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // Get return url from the route parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    const alreadyLoggedIn = this.userService.getUserValue;
    if (alreadyLoggedIn){
      this.router.navigate(['admin/']);
    }else{
      this.router.navigate(['admin/login/']);
    }
  }
  get f() { return this.form.controls; }
  loginSubmit(){
    this.submitted = true;
    this.loading = true;
    this.userService.login(this.f.username.value, this.f.password.value).pipe(first())
    .subscribe(data => {
      setTimeout(() => {
        this.toastr.success('Success');
        this.loading = false;
        this.router.navigate(['admin/']);
        console.log(data);
      }, 3000);
    }, error => {
      this.loading = false;
      this.toastr.error('Incorrect username or password');
      console.log(error);
    });

  }

}
