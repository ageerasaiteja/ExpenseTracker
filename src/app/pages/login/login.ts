import { Component, inject, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService';
import { AlertService } from '../../services/alertService';
import { AuthService } from '../../services/authService';

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

  userService: UserService = inject(UserService);
  alertService: AlertService = inject(AlertService);
  authService: AuthService = inject(AuthService);

  userError: boolean = false
  passwordError: boolean = false
  userLogin = this.userService.getUserLogin()

  ngOnInit() {
    if (this.userService.getUserLogin()() == true && this.userService.getUserToken()() !== '') {
      this.alertService.warn('Already LoggedIn', 2000);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  }
  
  submit() {
    this.Submit(this.username, this.password);
  }
  
  async Submit(username: string, password: string){
    let [status, highlight, message] = await this.authService.validateInput(username, password)
    if(status == true){
      this.alertService.success(message, 1500)
      setTimeout(()=>{
        window.location.href = "/dashboard"
      }, 1700)
      return
    }
    this.alertService.error(message, 3000)
    if(highlight){
      if(message.startsWith("Username")){
        this.userError = true
      }else{
        this.passwordError = true
      }
    }
  }

  clearError(){
    this.passwordError = false
    this.userError = false
  }

  keydown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
      this.submit();
    }
  }

  toggleShowPassword(){
    this.showPassword.update((value) => !value)
  }
}
