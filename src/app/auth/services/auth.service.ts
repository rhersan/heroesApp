import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable, of, tap } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth():Auth{
    return { ...this._auth! };
  }
  constructor(private http:HttpClient) { }

  checkAuth():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);// para convertir el resultado como observable
    }else{
      const url = `${this.baseUrl}/usuarios/1`;
      return this.http.get<Auth>(url)
      .pipe(
        map(
          (auth)=>{
            this._auth = auth;
            return true;
          }
        )
      );
    }
    return of(true);
  }

  login():Observable<Auth>{
    const url= `${this.baseUrl}/usuarios/1`;
    return this.http.get<Auth>(url)
    .pipe(
      tap( auth => this._auth = auth),
      tap( auth => localStorage.setItem('token', auth.id.toString() ) )
    );
  }
}
