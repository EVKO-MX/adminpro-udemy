import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo:string ='usuario'): any {

    let url = URL_SERVICES + '/img/' ;

    if (!img) {
      return url +'/usuarios/xxx' ;
    }

    if (img.indexOf('https')>= 0) {
      return img ;
    }

    switch (tipo){
      case 'usuario':

          return url += 'usuarios/' +img;
          
      case 'medico':
            
          return url += 'medicos/' +img;
        
      case 'hospital':
          
          return url += 'hospitales/' + img ;
      
      default:
        console.log('Tipo de imagen no existe, usuarios, medicos o hospital');
          
        url +'/usuarios/xxx' ;
        
    };



    return url;
  }

}
