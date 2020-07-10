import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';

declare var swal:any ;



@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  hospital: Hospital ;
  token: string ;

  constructor(public http:HttpClient,
    public router: Router) { 

  }

  cargarHospitales(desde:number = 0){
    

    let url = URL_SERVICES + '/hospital?desde='+desde;
    
    
    
    return this.http.get(url)
      .pipe(map((resp:any)=>{
          console.log(resp);
          
        return [resp,resp.hospitales];
      }))
      
  }

  obtenerHospitales(id:string){

    let url = URL_SERVICES +'/hospital/'+ id ;

    return this.http.get(url)
      .pipe(map((resp:any)=> resp.hospital));
  }

  actualizarHospital(nombre:string,idhospital:string,token:string){
    let url = URL_SERVICES + '/hospital/'+ idhospital;

    url+= '?token='+token ;

    return this.http.put(url,{nombre:nombre})
      .pipe( map((resp:any)=>{
        console.log(resp);
        
        swal('Hospital actualizado','El hospital: '+ resp.hospital.nombre+ ' se ha actualizado correctamente','success' )
        return true;

      }));
  }


  buscarHospitales(termino:string){

    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/'+ termino ;

    return this.http.get(url)
      .pipe(map((resp:any)=> resp.hospitales));
  }

  crearHospital(nombre:string, idUsuario:string, token:string){
    
    let url = URL_SERVICES + '/hospital/'+ idUsuario;

    url += '?token='+ token ;
    console.log(token);
    
    return this.http.post(url,{nombre:nombre}).
      pipe(map((resp:any)=>{
        
        swal('Hospital creado','El hospital: '+ resp.hospital.nombre+ ' se ha creado correctamente','success' )
        return true;
      }));

  }

  borrarHospital(idHospital:string, token:string){
    
    let url = URL_SERVICES + '/hospital/'+ idHospital;
    url+= '?token='+token ;

    return this.http.delete(url)
      .pipe(map(resp =>{
        swal('Hospital borrado', 'El Hospital seleccionado ha sido borrado correctamente', 'success');
        return true ;
      }));
  };

}
