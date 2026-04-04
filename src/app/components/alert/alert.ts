import { Component, inject } from '@angular/core';
import { AlertService } from '../../services/alertService';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  alertService = inject(AlertService)
}
