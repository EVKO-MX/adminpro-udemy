import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: [
  ]
})
export class GraficaComponent implements OnInit {
  @Input() grafica:any;
  
  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

}
