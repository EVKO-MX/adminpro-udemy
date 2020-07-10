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
  menu:any[] =[];

  constructor(public http:HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivosService) {
      // console.log('Servicio del usuario listo');
    this.cargarStorage();
   }

   estaLogeado(){
    return(this.token.length > 5) ? true :false ;
   } ;

   cargarStorage(){
     if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token') ;
        this.usuario =JSON.parse( localStorage.getItem('usuario') );
        this.menu =JSON.parse( localStorage.getItem('menu') );


     } else {
       this.token='';
       this.usuario=null;
       this.menu = null ;
     }
   }

   guardarStorage(id:string,token:string, usuario:Usuario, menu:any){
      localStorage.setItem('id',id);
      localStorage.setItem('token',token);
      localStorage.setItem('usuario',JSON.stringify(usuario) );
      localStorage.setItem('menu',JSON.stringify(menu) );
      

      this.usuario = usuario ;
      this.token = token ;
      this.menu = menu ;
      
   };

   logOut(){
     this.usuario = null ;
     this.token ='';
     this.menu = [];

     localStorage.removeItem('token') ;
     localStorage.removeItem('usuario') ;
     localStorage.removeItem('menu') ;

    this.router.navigate(['/login']);
   }

   loginGoogle(token:string){

    let url = URL_SERVICES +'/login/google' ;

    return this.http.post(url, {token})
                    .pipe(map((resp:any) =>{
                      this.guardarStorage(resp.id,resp.token, resp.usuario,resp.menu);
                      
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
                        
                        this.guardarStorage(resp.id,resp.token, resp.usuario,resp.menu);
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
              
              if (usuario._id === this.usuario._id) {
                let usuarioDB = resp.usuario ;
                this.guardarStorage(usuarioDB._id, this.token,usuarioDB, this.menu)
                
              }


              swal('Usuario actualizado', usuario.nombre, 'success');

              return true ;
    }));
    


  }

  cambiarImagen(file:File, id:string){
    this._subirArchivoService.subirArchivo(file,'usuarios',id)
     .then((resp:any) =>{
        this.usuario.img = resp.usuario.img ;

        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id,this.token, this.usuario,this.menu);
     })
     .catch(err => console.log(err)
     )
  };


  cargarUsuarios(desde:number = 0){

    let url = URL_SERVICES + '/usuario?desde='+ desde ;

    return this.http.get(url);
  }

  buscarUsuarios(termino:string){
    
    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/'+ termino ;
    return this.http.get(url).pipe(map((resp:any) => resp.usuarios)) ;

  };

  borrarUsuario(id:string){
    let url = URL_SERVICES +'/usuario/'+id ;
    url += '?token='+ this.token ;

    return this.http.delete(url)
      .pipe( map( resp =>{
        swal('Usuario Borrado', 'El usuario a sido eliminado correctamente', 'success');

        return true;
      }));
  }
}
  