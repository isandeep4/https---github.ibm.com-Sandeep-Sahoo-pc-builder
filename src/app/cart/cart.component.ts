import { Component, OnInit } from '@angular/core';
import { selectPcBuilderCartStatus } from 'src/store/selectors/app.selector';
import { Router } from '@angular/router';
import { State, Store, select } from '@ngrx/store';
import { AppState, Products, Processor, Motherboard, Ram } from 'src/store/app.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  selectedProducts: Products;
  selectedProcessor: Processor;
  selectedMotherboard: Motherboard;
  selectedRam: Ram;
  constructor(private router:Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectPcBuilderCartStatus))
    .subscribe(
      data => {
        this.selectedProcessor = data?.processorList[0];
        this.selectedMotherboard = data?.motherboardList[0];
        this.selectedRam = data?.ramList[0];
      }        
      );
  }
}
