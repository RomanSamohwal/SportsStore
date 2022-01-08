import {Component, OnInit} from '@angular/core';
import {ProductRepository} from 'src/app/model/product.repository';
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {

  constructor(private repository: ProductRepository) {
  }

  getProducts(): Product[] {
    return this.repository.getProducts(null);
  }

  deleteProduct(id: any) {
    this.repository.deleteProduct(id);
  }
}
