import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alert } from "./components/alert/alert";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Alert],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
