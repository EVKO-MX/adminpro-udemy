import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SubirArchivosService } from '../subir-archivo/subir-archivos.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario 
  token: string;

  constructor(public http:HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivosService) {
    console.log('Servicio del usuario listo');
    this.cargarStorage();
   }

   estaLogeado(){
    return(this.token.length > 5) ? true :false ;
   } ;

   cargarStorage(){
     if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token') ;
        this.usuario =JSON.parse( localStorage.getItem('usuario') );
     } else {
       this.token='';
       this.usuario=null;
     }
   }

   guardarStorage(id:string,token:string, usuario:Usuario){
      localStorage.setItem('id',id);
      localStorage.setItem('token',token);
      localStorage.setItem('usuario',JSON.stringify(usuario) );
      

      this.usuario = usuario ;
      this.token = token ;
      
   };

   logOut(){
     this.usuario = null ;
     this.token ='';

     localStorage.removeItem('token') ;
     localStorage.removeItem('usuario') ;

    this.router.navigate(['/login']);
   }

   loginGoogle(token:string){

    let url = URL_SERVICES +'/login/google' ;

    return this.http.post(url, {token})
                    .pipe(map((resp:any) =>{
                      this.guardarStorage(resp.id,resp.token, resp.usuario);
                      return true ;
                    }));
   }

   login(usuario:Usuario, recordar:boolean = false){

      if (recordar) {
        localStorage.setItem('email',usuario.email);
      }else{
        localStorage.removeItem('email') ;
      }
      let url = URL_SERVICES + '/login' ;

      return this.http.post(url, usuario)
                      .pipe(map((resp:any) =>{
                        this.guardarStorage(resp.id,resp.token, resp.usuario);
                          return true ;
                        })) ;
   }

  crearUsuario( usuario:Usuario){

    let url = URL_SERVICES + '/usuario' ;
    
    return this.http.post(url, usuario).pipe(map( (any) =>{
      swal('Usuario creado', usuario.email, 'success') ;

      return usuario ;
    }));
  } ;

  actualizarUsuario(usuario:Usuario){
  
    let url = URL_SERVICES +'/usuario/' +usuario._id ;
    url += '?token='+ this.token ;



    return this.http.put(url,usuario)
    .pipe(map((resp:any)=>{
              // this.usuario = resp.usuario ;
              let usuarioDB = resp.usuario ;

              this.guardarStorage(usuarioDB._id, this.token,usuarioDB)
              swal('Usuario actualizado', usuario.nombre, 'success');

              return true ;
    }));
    


  }

  cambiarImagen(file:File, id:string){
    this._subirArchivoService.subirArchivo(file,'usuarios',id)
     .then((resp:any) =>{
        this.usuario.img = resp.usuario.img ;

        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id,this.token, this.usuario);
     })
     .catch(err => console.log(err)
     )
  };

}
  