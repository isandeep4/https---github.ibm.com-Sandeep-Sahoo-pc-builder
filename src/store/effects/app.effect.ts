import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { of } from 'rxjs';
import { didAllItemsLoaded, loadAllItems } from '../actions/app.action';
import { Products } from '../app.interface';


@Injectable()
export class PcBuilderEffects {

  // loadAllItems$ = createEffect(()=>
  //   this.actions$.pipe(
  //     ofType(loadAllItems),
  //     switchMap((action)=>{
  //       this.productService.getAll()
  //     })
  //   )
  // )

  loadAllItems$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadAllItems),
      switchMap((action) =>{
        return this.productService.getAll()
        .pipe(
          map((products: Products)=>{
            return didAllItemsLoaded({
                statusResponse: {
                  processorList: products.processorList,
                  motherboardList: products.motherboardList,
                  ramList: products.ramList,
                },
                apiResponse: true,
            })
          }),
          catchError(error=>{
            return of(didAllItemsLoaded({
                statusResponse: {
                  processorList: [],
                  motherboardList: [],
                  ramList: [],
                },
                apiResponse:false
            }))
          })
        )
      })
    )
   )

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
