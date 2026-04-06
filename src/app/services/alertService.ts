import { Injectable, signal } from '@angular/core';
import { AlertType } from '../datatypes/alertType';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts = signal<AlertType[]>([]);

  private addAlert(alert: AlertType, time: number) {
    const currentAlerts = this.alerts();
    if (currentAlerts) {
      this.alerts.set([...currentAlerts, alert]);
      setTimeout(() => {
        const updatedAlerts = this.alerts().filter((a) => a !== alert);
        this.alerts.set(updatedAlerts);
      }, time);
    } else {
      this.alerts.set([alert]);
    }
  }

  getAlerts() {
    return this.alerts;
  }
  
  error(message:string, time:number){
    this.addAlert({type:"error", message:message}, time);
  }

  success(message:string, time:number){
    this.addAlert({type:"success", message:message}, time)
  }

  warn(message:string, time:number){
    this.addAlert({type:"warn", message:message}, time)
  }
}
