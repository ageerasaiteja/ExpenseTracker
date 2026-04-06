import { Component, Input } from '@angular/core';
import { AlertType } from '../../../datatypes/alertType';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  @Input({required: true}) alert!: AlertType
}
