import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AdminComponent} from "./admin.component";
import {AuthComponent} from "./auth/auth.component";
import {RouterModule} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ConfigService} from "../service/config.service";
import {RestService} from "../service/rest.service";
import { AuthGuard } from './auth/auth.guard';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { OrderTableComponent } from './order-table/order-table.component';

let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  { path: "main", component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: "products/:mode/:id", component: ProductEditorComponent },
      { path: "products/:mode", component: ProductEditorComponent },
      { path: "products", component: ProductTableComponent },
      { path: "orders", component: OrderTableComponent },
      { path: "**", redirectTo: "products" }
    ]
  },
  { path: "**", redirectTo: "auth" }
]);

@NgModule({
  declarations: [AdminComponent, AuthComponent, ProductTableComponent, ProductEditorComponent, OrderTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [AuthService, ConfigService, RestService, AuthGuard]
})
export class AdminModule { }
