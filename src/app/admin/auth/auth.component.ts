import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public username!: string;
  public password!: string;
  public errorMessage!: string;

  constructor(private router: Router,
              private auth: AuthService) {
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      this.auth.authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl("/admin/main");
          }
          this.errorMessage = "Authentication Failed";
        })
    } else {
      this.errorMessage = "Form Data Invalid";
    }
  }

  ngOnInit(): void {
  }

}
