import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLogin = signal(false);
  private username = signal("");
  private token = signal("");

  getUsername(){
    return this.username
  }
  setUsername(username: string){
    this.username.set(username)
  }

  getUserLogin() {
    return this.userLogin;
  }
  setUserLogin(userLogin: boolean) {
    this.userLogin.set(userLogin);
  }
  
  getUserToken() {
    return this.token
  }
  setUserToken(token: string) {
    this.token.set(token);
  }
}
