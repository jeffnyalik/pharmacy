import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MedicineService } from 'src/app/shared/medicine.service';

import { UserService } from './../../shared/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminInfo;
  medInfo;
  constructor(private userService: UserService, private medServ: MedicineService, private router: Router) { }

  ngOnInit(): void {
    this.userService.adminUser().subscribe(res => {
      this.adminInfo = res;
      console.log(res);
    }, error => {
      console.log(error);
    });

    // Check if the user is logged in
    const checkUser = this.userService.getUserValue;
    if (!checkUser){
      this.router.navigate(['admin/login/']);
    }
    // Medicine list
    this.medServ.getMedicine().subscribe(data => {
      this.medInfo = data;
      console.log(this.medInfo);
    });
  }

  onLogOut(){
    this.userService.logout();
    setTimeout(() => {
      this.router.navigate(['admin/login/']);
      console.log('LoggedOut successfully');
    }, 1000);
  }
  

}
