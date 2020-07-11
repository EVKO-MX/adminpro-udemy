import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {FormsModule} from '@angular/forms'
import { PAGES_ROUTES } from './pages.routes';


// NG2 -CHARTS

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';


// TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaComponent } from '../components/grafica/grafica.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
    declarations:[
        // PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficaComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports:[
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        PipesModule
    ]
})
export class PagesModule {}





