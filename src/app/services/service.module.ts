import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,SidebarService,SharedService, UsuarioService,LoginGuardGuard } from "./service.index";
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivosService } from './subir-archivo/subir-archivos.service';


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
            SubirArchivosService]
})
export class ServiceModule { }
