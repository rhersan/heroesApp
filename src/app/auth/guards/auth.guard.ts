import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    
      // if(this.authService.auth.id){
      //   return true;
      // }
      // console.log('Bloqueado por el AuthGuard - CanActivate');

      return this.authService.checkAuth()
              .pipe(
                tap(
                  (estaAutenticado) =>{
                    if(!estaAutenticado){
                      this.router.navigate(['./auth/login']);
                    }
                  } 
                )
                
              );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    
      return this.authService.checkAuth()
              .pipe(
                tap(
                  (estaAutenticado) =>{
                    if(!estaAutenticado){
                      this.router.navigate(['./auth/login']);
                    }
                  } 
                )
                
              );
    
    //   if(this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el AuthGuard - CanLoad');
    // return false;
  }
}
