import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string;
  password: string;

  constructor(private router: Router,
    private alertMessageService: AlertMessagesService,
    private loginService: LoginService
    ){}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth => {
        if(auth){
          this.router.navigate(['/']);
        }
      }
    )
  }

  login(){
    this.loginService.login(this.email, this.password)
    .then(res => {
      this.router.navigate(['/']);
    })
    .catch( error => {
      this.alertMessageService.show(error.message, {cssClass:'alert alert-warning', timeOut: 4000});
    })
  }

}
