import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  adminUser;
  constructor(private authUser: UserService, private router: Router) { }

  ngOnInit(): void {
    this.authUser.adminUser().subscribe(data => {
      this.adminUser = data;
      console.log(this.adminUser);
    }, error => {
      console.log(error);
    });
  }

  onLogOut(){
    this.authUser.logout();
    setTimeout(() => {
      this.router.navigate(['admin/login/']);
      console.log('LoggedOut successfully');
    }, 1000);
  }

}
