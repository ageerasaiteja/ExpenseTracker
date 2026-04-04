import { Component, inject } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login-service';

@Component({
  selector: 'app-login',
  imports: [Header, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  username: string = '';
  password: string = '';
  loginService = inject(LoginService)

  submit(){
    this.loginService.submit(this.username, this.password)
  }
}
