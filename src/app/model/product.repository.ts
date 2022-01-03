import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {RestService} from "../service/rest.service";

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestService) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      // @ts-ignore
      this.categories = data.map(p => p.category)
        .filter((c, index, array) => array.indexOf(c) == index).sort();
    });
  }

  getProducts(category: string | null): Product[] {
    return this.products
      .filter(p => category == null || category == p.category);
  }

  getProduct(id: number) {
    return this.products.find(p => p.id == id);
  }

  getCategories(): string[] {
    return this.categories;
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.dataSource.saveProduct(product)
        .subscribe(p => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product)
        .subscribe(p => {
          this.products.splice(this.products.findIndex(p => p.id == product.id), 1, product);
        });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(p => {
      this.products.splice(this.products.findIndex(p => p.id == id), 1);
    })
  }
}
