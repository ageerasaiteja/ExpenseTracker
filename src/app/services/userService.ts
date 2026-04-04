import { inject, Injectable } from '@angular/core';
import { LoginService } from './loginService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLogin: boolean = false;
  private username: string = "";
  private loginService = inject(LoginService)

  getUsername(): string{
    return this.username
  }
  setUsername(username: string){
    this.username = username
  }

  getUserLogin(): boolean {
    return this.userLogin;
  }
  setUserLogin(userLogin: boolean) {
    this.userLogin = userLogin;
  }

  checkUsername(username: string): [boolean, string] {
    if (username.trim() == "") {
      return [false, "Username cannot be empty"]
    }
    const usernameRegex = RegExp("^[a-zA-Z0-9_]{3,20}$")
    if (!usernameRegex.test(username)) {
      return [false, "Username must contain alphanumeric characters or underscores"]
    }
    return [true, ""]
  }

  checkPassword(password: string): [boolean, string]{
    if (password.trim() == "") {
      return [false, "Password cannot be empty"]
    }
    if (password.length < 6) {
      return [false, "Password must be at least 6 characters long"]
    }
    return [true, ""]
  }

  async login(username: string, password: string): Promise<[boolean, boolean, string]>{
    const [usernameStatus, usernameMessage] = this.checkUsername(username)
    if (usernameStatus == false) {
      return [false, true, usernameMessage]
    }
    const [passwordStatus, passwordMessage] = this.checkPassword(password)
    if (passwordStatus == false) {
      return [false, true, passwordMessage]
    }
    const [status, message] = await this.loginService.login(username, password)
    if (status == true) {
      this.setUserLogin(true)
      this.setUsername(username)
      return [true, false, message]
    }
    return [false, true, message]

  }
}
