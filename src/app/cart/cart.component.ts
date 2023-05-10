import { Component, OnInit } from '@angular/core';
import { selectPcBuilderCartStatus } from 'src/store/selectors/app.selector';
import { Router } from '@angular/router';
import { State, Store, select } from '@ngrx/store';
import { AppState, Products, Processor, Motherboard, Ram } from 'src/store/app.interface';
import { MatTableDataSource } from '@angular/material/table';
import { count } from 'rxjs';

interface ProductType {
  productName: string,
  price: string,
  count: number,
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  selectedProducts: Products;
  selectedProcessorPrice: string;
  selectedMotherboardPrice: string;
  selectedRamPrice: string;
  componentData: [];
  displayedColumns: string[] = ['Product', 'ChangeItem', 'Price'];
  cartItems: ProductType[] = [];
  dataSourceEmpty = [];
  dataSource = new MatTableDataSource(this.cartItems);
  constructor(private router:Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectPcBuilderCartStatus))
    .subscribe(
      data => {
        this.cartItems.push(data?.processorList[0]);
        this.cartItems.push(data?.motherboardList[0]);
        this.cartItems.push(data?.ramList[0]);
        this.selectedProcessorPrice = data?.processorList[0]?.price;
        this.selectedMotherboardPrice = data?.motherboardList[0]?.price;
        this.selectedRamPrice = data?.ramList[0]?.price;
      }        
      );
  }

  pr_bt_clicks = 1;
  mb_bt_clicks = 1;
  rm_bt_clicks = 1;
  totalPrice = 0;

  onAddClick(selected: any) {
    const clickedItemIndex = this.cartItems.findIndex(item => item.productName === selected.productName)
    const currentItem = { ...this.cartItems[clickedItemIndex] };
    currentItem.count += 1;
    if(clickedItemIndex === 0){
      currentItem.price = (Number(this.selectedProcessorPrice) * currentItem.count).toString();
    } else if(clickedItemIndex === 1){
      currentItem.price = (Number(this.selectedMotherboardPrice) * currentItem.count).toString();
    } else {
      currentItem.price = (Number(this.selectedRamPrice) * currentItem.count).toString();
    }
    this.cartItems[clickedItemIndex] = currentItem;
    this.dataSource = new MatTableDataSource(this.cartItems);
    //this.cartItems[clickedItemIndex] = {...this.cartItems[clickedItemIndex], count: }
    // if(id === 'pr_bt'){
    //   this.pr_bt_clicks += 1;
    //   document.getElementById("pr_bt_clicks")!.innerHTML = this.pr_bt_clicks.toString();
    // } else if(id === 'mb_bt'){
    //   this.mb_bt_clicks += 1;
    //   document.getElementById("mb_bt_clicks")!.innerHTML = this.mb_bt_clicks.toString();
    // } else {
    //   this.rm_bt_clicks += 1;
    //   document.getElementById("rm_bt_clicks")!.innerHTML = this.rm_bt_clicks.toString();
    // }
    
  };
  
  onRemoveClick(selected: any){
    const clickedItemIndex = this.cartItems.findIndex(item => item.productName === selected.productName)
    const currentItem = { ...this.cartItems[clickedItemIndex] };
    if(currentItem.count > 0){
      currentItem.count -= 1;
    if(clickedItemIndex === 0){
      currentItem.price = (Number(this.selectedProcessorPrice) * currentItem.count).toString();
    } else if(clickedItemIndex === 1){
      currentItem.price = (Number(this.selectedMotherboardPrice) * currentItem.count).toString();
    } else {
      currentItem.price = (Number(this.selectedRamPrice) * currentItem.count).toString();
    }
    this.cartItems[clickedItemIndex] = currentItem;
    this.dataSource = new MatTableDataSource(this.cartItems);
    }
    
    // if(id === 'pr_bt' && this.pr_bt_clicks > 1){
    //   this.pr_bt_clicks -= 1;
    //   document.getElementById("pr_bt_clicks")!.innerHTML = this.pr_bt_clicks.toString();
    // } else if(id === 'mb_bt' && this.mb_bt_clicks > 1){
    //   this.mb_bt_clicks -= 1;
    //   document.getElementById("mb_bt_clicks")!.innerHTML = this.mb_bt_clicks.toString();
    // } else if(id === 'rm_bt' && this.rm_bt_clicks > 1) {
    //   this.rm_bt_clicks -= 1;
    //   document.getElementById("rm_bt_clicks")!.innerHTML = this.rm_bt_clicks.toString();
    // }
  }
  calculateComponentPrice(individualPrice: any, bt_clicks:any){
    if(individualPrice){
      return Number(individualPrice)*bt_clicks;
    } else {
      return;
    }
  }
  calculateTotal(){
    this.totalPrice = this.cartItems.map(item => Number(item.price)).reduce((prev, next) => prev + next);
    return this.totalPrice;
  }
}
