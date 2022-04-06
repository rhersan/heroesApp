import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesServices.getSugerencias(this.termino.trim())
    .subscribe(herores => this.heroes = herores);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    // validar si viene un string valcio
    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe:Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesServices.getHeroeById(heroe.id!)
    .subscribe((heroe) => this.heroeSeleccionado = heroe);
    
  }

}
