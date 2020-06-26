import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {
  
  subscription:Subscription ;


  constructor() { 
  
   this.subscription=  this.regresaObservables()
    .subscribe(numero =>console.log('Subs', numero),
                  err => console.log('Error en el Obs', err),
                  ()=> console.log('El observador termino!')
                  );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();

    
  }

  regresaObservables():Observable<number>{

    return new Observable(observer =>{

      let contador =0 ;
      
      let intervalo = setInterval( ()=>{
        
        contador ++;

        const salida ={
          valor:contador
        }

        observer.next(salida);

        // if (contador ===3) {
        //   clearInterval(intervalo);
        //   observer.complete();
          
        // }
        
        // if (contador === 2) {
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(
      map(resp =>resp.valor),
      filter( (valor, index)=>{
        if ((valor % 2)===1) {
          //impar
          return true ;
        }else{
          // par
          return false ;
        }
      })
    )
  }

}
