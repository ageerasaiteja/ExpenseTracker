import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  status = signal("none");
  message = signal("none")

  private cleanUp(time: number){
    setTimeout(() => {
      this.status.set("none")
      this.message.set("none")
    }, time);
  }
  error(message:string, time:number){
    this.status.set("error");
    this.message.set(message);
    this.cleanUp(time);
  }

  success(message:string, time:number){
    this.status.set("success");
    this.message.set(message);
    this.cleanUp(time);
  }

  warn(message:string, time:number){
    this.status.set("warn");
    this.message.set(message);
    this.cleanUp(time);
  }
}
