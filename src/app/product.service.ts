import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, flatMap,filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Products } from 'src/store/app.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private url = '../assets/data.json';
  getAll() {
    return this.http.get(this.url).pipe(map(res =>res as Products))
   }
  // getAll() {
  //   return axios.get("../assets/data.json")
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log('error found',err));
  //  }
//    getProductDetails(id:number):Observable<Product>{{ 
//     return this.http.get<Product[]>(this.url)
//     .pipe(
//       flatMap(products => products),
//       first(product => product.id === id)
//     );
//  }
// }
}

