import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {Product} from "../model/product.model";
import {map, Observable} from "rxjs";
import {Order} from '../model/order.model';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private config: ConfigService) {
  }

  setAuthorization(auth_token: string): void {
    localStorage.setItem('auth-token', JSON.stringify({"Authorization": "Bearer<" + auth_token + ">"}))
  }

  getAuthorization() {
    let item = localStorage.getItem('auth-token')
    if (item) return  JSON.parse(item)
  }

  clearStorage(){
    localStorage.clear()
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.config.post({
      patch: '/login',
      body: {name: user, password: pass}
    }).pipe(map((response: any) => {
      this.setAuthorization(response.token)
      return response.success;
    }))
  }

  getProducts(): Observable<Product[]> {
    return this.config.get<Product[]>({
      path: '/products',
      params: new HttpParams(),
      authorization: this.getAuthorization()
    })
  }

  saveProduct(product: Product): Observable<Product> {
    return this.config.post<Product>({patch: '/products', body: product, authorization: this.getAuthorization()})
  }

  updateProduct(product: Product): Observable<Product> {
    return this.config.put<Product>({
      patch: `/products/${product.id}`,
      body: product,
      authorization: this.getAuthorization()
    })
  }

  deleteProduct(id: number): Observable<Product> {
    return this.config.delete<Product>({path: `/products/${id}`, authorization: this.getAuthorization()})
  }

  getOrders(): Observable<Order[]> {
    return this.config.get<Order[]>({
      path: '/orders',
      params: new HttpParams(),
      authorization: this.getAuthorization()
    })
  }

  deleteOrder(id: number): Observable<Order> {

    return this.config.delete<Order>({path: `/orders/${id}`, authorization: this.getAuthorization()})
  }

  updateOrder(order: Order): Observable<Order> {
    return this.config.put<Order>({
      patch: `/order/${order.id}`,
      body: order,
      authorization: this.getAuthorization()
    })
  }

  saveOrder(order: Order): Observable<Order> {
    return this.config.post({patch: '/orders', body: order, authorization: this.getAuthorization()});
  }
}
