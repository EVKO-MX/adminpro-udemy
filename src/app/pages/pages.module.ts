import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import {FormsModule, NgForm} from '@angular/forms'
import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';

// NG2 -CHARTS

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';


// TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaComponent } from '../components/grafica/grafica.component';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficaComponent,
        AccountSettingsComponent
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
        CommonModule
    
    ]
})
export class PagesModule {}