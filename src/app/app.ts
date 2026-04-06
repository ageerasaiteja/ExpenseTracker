import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alerts } from "./components/alerts/alerts";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Alerts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
