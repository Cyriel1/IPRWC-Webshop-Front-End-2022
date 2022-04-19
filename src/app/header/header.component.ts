import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username:string = '';
  roles:string[] = [];
  isAuthenticated:boolean = false;

  userSub:Subscription = new Subscription();

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.username = user.username;    
        this.roles = user.roles;
      }
    })
  }

  isAdmin(): boolean{
    if (this.isAuthenticated) {
      return this.roles.indexOf('ROLE_ADMIN') > -1;
    }

    return false;
  }

  onLogout():void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
