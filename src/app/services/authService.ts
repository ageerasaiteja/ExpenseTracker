import { inject, Injectable } from '@angular/core';
import { UserService } from './userService';
import { AlertService } from './alertService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userService = inject(UserService);
  alertService = inject(AlertService);

  checkUsername(username: string): [boolean, string] {
    if (username.trim() == '') {
      return [false, 'Username cannot be empty'];
    }
    if (username.length > 20) {
      return [false, 'Username must be less than 20 characters long'];
    }
    const usernameRegex = RegExp('^[a-zA-Z0-9_]+$');
    if (!usernameRegex.test(username)) {
      return [false, 'Username must contain alphanumeric characters or underscores'];
    }
    return [true, ''];
  }

  checkPassword(password: string): [boolean, string] {
    if (password.trim() == '') {
      return [false, 'Password cannot be empty'];
    }
    if (password.length < 6) {
      return [false, 'Password must be at least 6 characters long'];
    }
    return [true, ''];
  }

  async validateInput(username: string, password: string): Promise<[boolean, boolean, string]> {
    const [usernameStatus, usernameMessage] = this.checkUsername(username);
    if (usernameStatus == false) {
      return [false, true, usernameMessage];
    }
    const [passwordStatus, passwordMessage] = this.checkPassword(password);
    if (passwordStatus == false) {
      return [false, true, passwordMessage];
    }
    const [status, message] = await this.login(username, password);
    if (status == true) {
      this.userService.setUserLogin(true);
      this.userService.setUsername(username);
      return [true, false, message];
    }
    return [false, true, message];
  }

  login(username: string, password: string): Promise<[boolean, string]> {
    const payload = {
      username: username,
      password: password,
    };
    return new Promise((resolve) => {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          resolve([data.status, data.message]);
          if (data.status == true) {
            localStorage.setItem('token', data.token);
            this.userService.setUserToken(data.token);
          }
        });
    });
  }

  loginToken(token: string): Promise<[boolean, string, string]> {
    const payload = { token: token };
    return new Promise((resolve) => {
      fetch('/api/login/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          resolve([data.status, data.message, data.username]);
        });
    });
  }

  logout() {
    this.userService.setUserLogin(false);
    this.userService.setUsername('');
    this.userService.setUserToken('');
    localStorage.removeItem('token');
    this.alertService.success('Logged Out Success', 1000);
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  }

  async initialize() {
    if (localStorage.getItem('token') != null) {
      const token = localStorage.getItem('token') as string;
      if (token == null) {
        return;
      }
      const [status, message, username] = await this.loginToken(token)
      if (status) {
        this.userService.setUserLogin(true);
        this.userService.setUsername(username);
        this.userService.setUserToken(token);
      } else {
        localStorage.removeItem('token');
        this.userService.setUserLogin(false);
        this.userService.setUsername('');
        this.alertService.warn(message, 2000);
      }
    }
  }
}
