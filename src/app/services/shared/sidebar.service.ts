import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:any =[
    {
      titulo:'Principal',
      icono:'mdi mdi-gauge',
      subMenu:[
        {titulo:'Dashboard', url:'/dashboard'},
        {titulo:'ProgressBar', url:'/progress'},
        {titulo:'Graficas', url:'/graficas1'},
        {titulo:'promesas', url:'/promesas'},
        {titulo:'rxjs', url:'/rxjs'}
      ]
    },
    {
      titulo:'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      subMenu:[
        {titulo:'Usuarios' , url:'/usuarios'},
        {titulo:'Hospitales' , url:'/hospitales'},
        {titulo:'Medicos' , url:'/medicos'},
      ]
    }
  ];

  constructor() { }
}
