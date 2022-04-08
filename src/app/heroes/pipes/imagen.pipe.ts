import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen',
  //pure: true
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    console.log('Se proceso');
    if(!heroe.id)
    {
      return `assets/no-image.png`;
    }else if(heroe.alt_img){      
      return heroe.alt_img;
    }else{
      return `assets/heroes/${ heroe.id }.jpg`;
    }

  }

}
