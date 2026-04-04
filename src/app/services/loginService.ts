import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

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
          if(data.status == true){
            localStorage.setItem("token",data.token)
          }
        });
    });
  }
}
