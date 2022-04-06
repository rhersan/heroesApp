import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {
  heroe !: Heroe;
  constructor(
    private activeRoute: ActivatedRoute,
    private heroeService: HeroesService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroeById(id))
    )
    .subscribe((heroe) => this.heroe = heroe);
  }

}
