import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal:any ;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] =[];
  desde: number = 0;
  cargando:boolean = true;
  totalRegistros: number = 0;
  ruta:string ;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService:ModalUploadService )
               {
                this._modalUploadService.notificacion
                  .subscribe( resp => this.cargarHospitales());

               }

  ngOnInit(): void {
    
    this.cargarHospitales();
    
  }

  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('hospitales',id);
  }

  actualizarHospital(hospital:Hospital){
    let hospitalId = hospital._id;
    let tokenUsuario = localStorage.getItem('token') ;

    swal({
      text: 'Escribe el nombre del nuevo para el hospital seleccionado',
      content: "input",
      button: {
        text: "crear",
        closeModal: false,
      },
    })
    .then(nombre =>{
      
      if (!nombre) {
        return;

      }

      this._hospitalService.actualizarHospital(nombre,hospitalId,tokenUsuario)
        .subscribe((hospital:any)=>{
          
          this.cargarHospitales();
        });
    })
    

  }
  
  buscarHospital(termino:string){
    
    if (termino.length <= 0) {
      this.cargarHospitales();
      return ;
    }

    this._hospitalService.buscarHospitales(termino)
      .subscribe((hospitales:any)=>{
        
        this.hospitales = hospitales ;
        
      });
  };


  cargarHospitales(){
    this.cargando = true ;

    this._hospitalService.cargarHospitales()
      .subscribe((resp:any)=>{
        console.log(resp);
      
      this.totalRegistros = resp[0].total ;
      this.hospitales = resp[0].hospitales ;
      this.cargando =false ;
    });
  }

  crearHospital(){
    
    let idUsuario = localStorage.getItem('id') ;
    let tokenUsuario = localStorage.getItem('token') ;

    swal({
      text: 'Escribe el nombre del nuevo hospital',
      content: "input",
      button: {
        text: "crear",
        closeModal: false,
      },
    })
    .then(nombre =>{
       
      if (!nombre) {
        return ;
      }

      this._hospitalService.crearHospital(nombre,idUsuario,tokenUsuario)
        .subscribe( (resp:any)=>{
          this.cargarHospitales()

          
        });

    });
  };

  borrarHospital(hospital:Hospital){

    let tokenUsuario = localStorage.getItem('token') ;


    swal({
      title: "¿Estas seguro?",
      text: "Esta a punto de borrar el hospital "+ hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) =>{
      
      
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id,tokenUsuario)
        .subscribe( (resp:any)=>{
          this.cargarHospitales()
          
        })
      }
    });
    
    
    
    
  };

  cambiarDesde(valor:number){
    let desde = this.desde +valor ;

    
    if (desde >= this.totalRegistros) {
      return
    }

    if (desde < 0) {
      return
    }
    
    this.desde+= valor ;
    
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe((resp:any) =>{
        this.hospitales = resp.hospitales ;
        this.cargando =false ;
      });
    
  } ;

  

}
