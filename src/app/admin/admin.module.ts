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

let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  { path: "main", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "auth" }
]);

@NgModule({
  declarations: [AdminComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [AuthService, ConfigService, RestService, AuthGuard]
})
export class AdminModule { }
