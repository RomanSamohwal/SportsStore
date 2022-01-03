import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModelModule} from "./model/model.module";
import {StoreModule} from "./store/store.module";
import {StoreComponent} from "./store/store.component";
import {CartDetailComponent} from './store/cart-detail/cart-detail.component';
import {CheckoutComponent} from './store/checkout/checkout.component';
import {RouterModule} from "@angular/router";
import {StoreFirstGuard} from "./store-first.guard";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ModelModule,
    StoreModule,
    RouterModule.forRoot([
      {
        path: "store", component: StoreComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: "cart", component: CartDetailComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: "checkout", component: CheckoutComponent,
        canActivate: [StoreFirstGuard]
      },
      {
        path: "admin",
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
        canActivate: [StoreFirstGuard]
      },
      {
        path: "**", redirectTo: "/store"
      }
    ])],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
