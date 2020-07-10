import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,SidebarService,SharedService, UsuarioService,LoginGuardGuard } from "./service.index";
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivosService } from './subir-archivo/subir-archivos.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[SettingsService,
            SidebarService,
            SharedService,
            UsuarioService,
            LoginGuardGuard,
            SubirArchivosService,
            ModalUploadService,
            HospitalService,
            MedicoService]
})
export class ServiceModule { }
