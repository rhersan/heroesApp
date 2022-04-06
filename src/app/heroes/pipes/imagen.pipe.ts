import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    let urlImg = '';
    (heroe)
    ?
      urlImg = `assets/heroes/${ heroe.id }.jpg`
    :
      urlImg = `assets/no-image.jpg`
    ;
    return urlImg;
  }

}
