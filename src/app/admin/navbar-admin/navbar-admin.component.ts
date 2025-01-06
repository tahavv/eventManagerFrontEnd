import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.scss'
})
export class NavbarAdminComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isOpen = false;

  constructor(private router: Router, private authService: AuthService) {}
  onToggle() {
    this.isOpen = !this.isOpen;
    this.toggleSidebar.emit();
  }

  logout() {
    this.authService.logout();
  }
}
