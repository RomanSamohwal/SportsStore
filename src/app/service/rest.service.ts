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

  auth_token!: string | null;
  authorization: { [key: string]: string } = {"Authorization": "Bearer<" + this.auth_token?.toString() + ">"}

  constructor(private config: ConfigService) {
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.config.post({
      patch: '/login',
      body: {name: user, password: pass}}).pipe(map((response: any) => {
      this.auth_token = response.success ? response.token : null
      return response.success;
    }))
  }

  getProducts(): Observable<Product[]> {
    return this.config.get<Product[]>({
      path: '/products',
      params: new HttpParams(),
      authorization: this.authorization
    })
  }

  saveProduct(product: Product): Observable<Product> {
    return this.config.post<Product>({patch: '/products', body: product, authorization: this.authorization})
  }

  updateProduct(product: Product): Observable<Product> {
    return this.config.put<Product>({
      patch: `/products/${product.id}`,
      body: product,
      authorization: this.authorization
    })
  }

  deleteProduct(id: number): Observable<Product> {
    return this.config.delete<Product>({path: `/products/${id}`})
  }

  getOrders(): Observable<Order[]> {
    return this.config.get<Order[]>({
      path: '/orders',
      params: new HttpParams(),
      authorization: this.authorization
    })
  }

  deleteOrder(id: number): Observable<Order> {
    return this.config.delete<Order>({path: `/orders/${id}`})
  }

  updateOrder(order: Order): Observable<Order> {
    return this.config.put<Order>({
      patch: `/order/${order.id}`,
      body: order,
      authorization: this.authorization
    })
  }

  saveOrder(order: Order): Observable<Order> {
    return this.config.post({patch: '/orders', body: order, authorization: this.authorization});
  }
}
