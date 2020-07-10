import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

declare var swal:any ;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos:number = 0 ;

  constructor(public http:HttpClient,
              public _usuarioService:UsuarioService) { }


  cargarMedicos(){
    
    let url = URL_SERVICES + '/medico' ;

    return this.http.get(url)
      .pipe( map((resp:any)=>{

          this.totalMedicos = resp.total;
          
        return resp.medicos ;
      }));

  };

  buscarMedicos(termino:string){

    
    
    let url = URL_SERVICES + '/busqueda/coleccion/medicos/'+ termino ;
    return this.http.get(url).pipe(map((resp:any) => resp.medicos)) ;

  };

  borrarMedico(idMedico:string){
    
    let url = URL_SERVICES+ '/medico/'+ idMedico ;
    url +='?token='+ this._usuarioService.token ;

    return this.http.delete(url)
      .pipe(map((resp:any)=>{
        
        swal('Medico Borrado','Medico borrado correctamente', 'success');

        return resp ;
      }))
  }

  guardarMedico(medico:Medico){

    let url = URL_SERVICES + '/medico/' ;

    if (medico._id) {  
      // Actualizando
      
      url += medico._id ;
      url += '?token='+ this._usuarioService.token ;

      return this.http.put(url,medico)
        .pipe(map((resp:any)=>{
          
          swal('Medico actualizado', medico.nombre, 'success');

          return resp.medico ;
        }));


    }else{
      // creando
      url += this._usuarioService.usuario._id +'/'+ medico.hospital ;
  
      url += '?token='+ this._usuarioService.token ;
      
      return this.http.post(url,medico)
        .pipe(map((resp:any) =>{
          
          swal('Medico creado', medico.nombre, 'success');
          return resp.medico
        }));
    }


  }

  cargarMedico(id:string){

    let url = URL_SERVICES + '/medico/' + id ;

    return this.http.get(url)
      .pipe( map((resp:any)=> resp.medico)) ;

  }
}
