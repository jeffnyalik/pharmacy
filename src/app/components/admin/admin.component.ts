import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../shared/user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminInfo;
  constructor(private userService: UserService, private router: Router) { }

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
  }

  onLogOut(){
    this.userService.logout();
    setTimeout(() => {
      this.router.navigate(['admin/login/']);
      console.log('LoggedOut successfully');
    }, 1000);
  }

}
