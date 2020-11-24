import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from './../shared/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authServ: UserService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authServ.getUserValue()){
      return true;
    }else{
      this.router.navigate(['/admin/login/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     const user = this.authServ.getUserValue;
  //     if (user){
  //       return true;
  //     }
  //     this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  //     return false;
  // }
}
