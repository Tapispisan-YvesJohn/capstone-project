import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  token: any;

  canActivate() {
    this.token = localStorage.getItem('token');
    if(this.token){
        return true;
    } else {
        this.router.navigate(['/login']);
    }
  }
}
