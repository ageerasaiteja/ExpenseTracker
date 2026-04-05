import { Component, inject, effect, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login-service';
import { UserService } from '../../services/userService';
import { AlertService } from '../../services/alertService';

@Component({
  selector: 'app-login',
  imports: [Header, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  showPassword = signal(false);

  loginService = inject(LoginService);
  userService = inject(UserService);
  alertService = inject(AlertService);

  submit() {
    this.loginService.submit(this.username, this.password);
  }

  keydown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      this.submit();
    }
  }

  ngOnInit() {
    if (this.userService.getUserLogin()() == true && this.userService.getUserToken()() !== '') {
      this.alertService.warn('Already LoggedIn', 2000);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  }

  toggleShowPassword(){
    this.showPassword.update((value) => !value)
  }
}
