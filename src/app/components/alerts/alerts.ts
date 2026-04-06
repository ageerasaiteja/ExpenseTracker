import { Component, inject } from '@angular/core';
import { Alert } from './alert/alert';
import { AlertService } from '../../services/alertService';

@Component({
  selector: 'app-alerts',
  imports: [Alert],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  alertService = inject(AlertService)
  alerts = this.alertService.getAlerts()
}
