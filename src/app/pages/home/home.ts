import { Component, inject, Input } from '@angular/core';
import { Header } from "../../components/header/header";
import { UserService } from '../../services/userService';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [Header, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userService: UserService = inject(UserService)
  userLogin = this.userService.getUserLogin()
}
