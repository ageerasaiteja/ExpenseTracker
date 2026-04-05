import { Injectable, inject } from '@angular/core';
import { UserService } from '../../services/userService';
import { AlertService } from "../../services/alertService";
import { AuthService } from '../../services/authService';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);
  alertService = inject(AlertService);

  userError: boolean = false
  passwordError: boolean = false
  userLogin = this.userService.getUserLogin()
  
  async submit(username: string, password: string){
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
}
