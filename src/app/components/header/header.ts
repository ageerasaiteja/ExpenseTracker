import { Component, inject, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserService } from '../../services/userService';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userService:UserService = inject(UserService);
  authService:AuthService = inject(AuthService);
}
