import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]>{
    const url = `${this.baseUrl}/heroes`;
    return this.http.get<Heroe[]>(url);
  }

  getHeroeById(id: string): Observable<Heroe>{    
    const url = `${this.baseUrl}/heroes/${id}`
    return this.http.get<Heroe>(url);
  }
  getSugerencias(termino: string):Observable<Heroe[]>{
    const url = `${this.baseUrl}/heroes?q=${termino}&_limit=6`;
    return this.http.get<Heroe[]>(url);
  }
  agregarHeroe(objHeroe: Heroe): Observable<Heroe>{
    const url = `${this.baseUrl}/heroes`;
    return this.http.post<Heroe>(url,objHeroe);
  }
  actualizarHeroe(objHeroe: Heroe): Observable<Heroe>{
    const url = `${this.baseUrl}/heroes/${objHeroe.id}`;
    return this.http.put<Heroe>(url,objHeroe);
  }
  eliminarHeroe(id: string): Observable<any> {
    const url = `${this.baseUrl}/heroes/${id}`
    return this.http.delete<any>(url);
  }

}
