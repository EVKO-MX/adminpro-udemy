import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios:Usuario[]=[];
  medicos:Medico[]=[];
  hospitales:Hospital[]=[];

  constructor(
    public activatedRouter:ActivatedRoute,
    public http:HttpClient,
    public router:Router
    ) {

      activatedRouter.params.subscribe( params =>{

        let termino = params['termino'];
        
        this.buscar(termino);
        
      })
     }

  ngOnInit(): void {
  }

  buscar(termino:string){
    
    let url = URL_SERVICES + '/busqueda/todo/' +termino ;

    return this.http.get(url)
      .subscribe( (resp:any) =>{

        console.log(resp);
        this.hospitales = resp.hospitales ;
        this.medicos = resp.medicos ;
        this.usuarios = resp.usuarios ;
        
      })
  }

  navegarUsuarios(){
    this.router.navigate(['/usuarios']);
  }
  navegarMedicos(id:string){
    this.router.navigate(['/medico',id]);
  }
  navegarHospitales(){
    this.router.navigate(['/hospitales']);
  }




}
