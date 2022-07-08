import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {first} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {

  }

  login() {
    this.authenticationService.login(this.form.value.username, this.form.value.password,)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          if (data.roles[0] == "ROLE_USER") {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['/admin']);
          }
        },
        error => {
          alert("Tài khoản của bạn sai mật khẩu!");
        });
  }
}