import { Component, inject, Input } from '@angular/core';
import { Header } from "../../components/header/header";
import { UserService } from '../../services/userService';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-home',
  imports: [Header, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userService: UserService = inject(UserService)
  authService: AuthService = inject(AuthService)
}
