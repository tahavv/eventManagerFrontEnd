import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {UserService} from "../users/users.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    usersCount:number = 0;
    totalEvents = 156;
    upcomingEvents = 23;

  displayTotalEvents = 0;
  displayUsersCount = 0;
  displayUpcomingEvents = 0;
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
      this.fetchUsers()
      this.animateValue('displayTotalEvents', 0, this.totalEvents, 1000);
      this.animateValue('displayUpcomingEvents', 0, this.upcomingEvents, 1000);
    }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.usersCount = data.length;
        this.animateValue('displayUsersCount', 0, this.usersCount, 1000);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }


  private animateValue(
    property: 'displayTotalEvents' | 'displayUsersCount' | 'displayUpcomingEvents',
    start: number,
    end: number,
    duration: number
  ) {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const fraction = Math.min(progress / duration, 1);
      const currentValue = Math.floor(start + (end - start) * fraction);
      (this as any)[property] = currentValue;

      // Continue until time is up
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        (this as any)[property] = end;
      }
    };
    window.requestAnimationFrame(step);
  }
}
