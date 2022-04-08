import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width:100;
    border-radius: 5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {
  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }
  constructor(
    private activeRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return;
    }

    this.activeRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroeById(id))
    )
    .subscribe((heroe) => this.heroe = heroe);
    
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      // Actualizar
      this.heroeService.actualizarHeroe(this.heroe)
      .subscribe((heroe)=>{        
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar(`Registro actualizado!`);
      } 
      );
    }else{
      // Crear
      this.heroeService.agregarHeroe(this.heroe)
      .subscribe((heroe: Heroe) => {        
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar(`Registro Creado!`);
      }    
      );
    }
    
  }
  borrar(){

   const dialog= this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: {...this.heroe} // indica que nada se va a modificar
    });

    dialog.afterClosed()
    .subscribe(
      (result) => {

        if(result){
          this.heroeService.eliminarHeroe(this.heroe.id!)
            .subscribe((resp) =>{
              this.router.navigate(['/heroes']);
              this.mostrarSnackBar(`Registro Borrado!`);
            }
          );
        }
        
      }
    );





  }

  mostrarSnackBar(mensaje: string){
    this.snackBar.open(mensaje,'OK!',{ duration: 2500 });
  }
}
