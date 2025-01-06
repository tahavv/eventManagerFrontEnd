import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userRole: string | null = null;
  isSidebarOpen = true;

  constructor(private authService: AuthService) {
    //this.userRole = this.authService.getUserRole(); // e.g. 'ADMIN', 'MANAGER'
  }

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goToProfile() {}

  logout() {
    this.authService.logout();
  }
}
