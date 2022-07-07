import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {first} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.authenticationService.login('linhcau', '123456')
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          this.httpClient.get(environment.apiUrl+'/users').subscribe((data)=> {
            console.log(data)
          }, error => {
            console.log(error)
          })
        },
        error => {
          alert("Tài khoản của bạn sai mật khẩu!");
        });
  }

}
