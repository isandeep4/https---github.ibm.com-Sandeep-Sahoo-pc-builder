import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ProductService } from '../product.service';
import { State, Store, select } from '@ngrx/store';
import { AppState, Products } from 'src/store/app.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { loadAllItems, addProcessorToCart, addMbToCart, addRamToCart } from 'src/store/actions/app.action';
import { selectPcBuilderStatus } from 'src/store/selectors/app.selector';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  products: Products;
  selectedProcessor: string = 'Add Processor Component';
  selectedMotherboard: string;
  selectedRam: string;

  constructor(private router:Router, private cdr: ChangeDetectorRef, private http: HttpClient,
    private productService:ProductService, private store: Store<AppState>) {
  }
  ngOnInit(): void {
    this.store.pipe(select(selectPcBuilderStatus))
    .subscribe(
      data => {
        this.products = data;
      }        
      );   
  }
  onProcessorChange(val:any){
    console.log('selected pr', JSON.parse(val));
    this.store.dispatch(addProcessorToCart({
     processor: JSON.parse(val)
    }));
  }
  onMbChange(val:any){
    console.log('selected mb',val);
    this.store.dispatch(addMbToCart({
      motherboard: JSON.parse(val)
    }));
  }
  onRamChange(val:any){
    this.store.dispatch(addRamToCart({
      ram: JSON.parse(val)
    }));
  }
  
  
}



