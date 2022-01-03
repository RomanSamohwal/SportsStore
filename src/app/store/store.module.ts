import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ModelModule} from "../model/model.module";
import {StoreComponent} from "./store.component";
import {CounterDirective} from "../directive/counter.directive";
import {CartSummaryComponent} from './cart-summary/cart-summary.component';
import {CartDetailComponent} from './cart-detail/cart-detail.component';
import {CheckoutComponent} from './checkout/checkout.component';
import { RouterModule } from "@angular/router";
import {RestService} from "../service/rest.service";
import {ConfigService} from "../service/config.service";

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
  declarations: [StoreComponent, CounterDirective, CartSummaryComponent,
    CartDetailComponent, CheckoutComponent],
  exports: [StoreComponent, CartDetailComponent, CheckoutComponent],
  providers: [RestService, ConfigService]
})
export class StoreModule {
}
