import { Component, OnInit } from '@angular/core';
import { SubirArchivosService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

declare var swal:any ;


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenSubir:File ;

  imagenTemp:ArrayBuffer;


  constructor(
    public _subirArchivoService: SubirArchivosService,
    public _modalUploadService:ModalUploadService
  ) {
    
   }

  ngOnInit(): void {
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp =>{
        
        console.log(resp);
        
        this._modalUploadService.notificacion.emit(resp);
        
        this.cerrarModal();

      })
      .catch(err =>{
        console.log(err, 'Error en la carga..');
        
      })
  }

  seleccionImage(archivo:File){
    if (!archivo) {
      this.imagenSubir = null ;
      return
    }

    if (archivo.type.indexOf('image')<0) {
      swal('Solo imagenes','El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null ;

      return
    }

    this.imagenSubir = archivo ;
    
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    
    

    reader.onloadend = ()=> this.imagenTemp = reader.result;
    
     
  };

  
  
  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }
}
