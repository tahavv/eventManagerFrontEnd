import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {VerifyOtpComponent} from "./auth/verify-otp/verify-otp.component";
import {HomeComponent} from "./core/pages/home/home.component";
import {AuthGuard} from "./core/pages/guards/auth.guard";
import {RoleGuard} from "./core/pages/guards/role.guard";
import {RoomsComponent} from "./admin/rooms/rooms.component";
import {EventsComponent} from "./admin/events/events.component";
import {AdminDashboardComponent} from "./core/pages/admin-dashboard/admin-dashboard.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {UsersListComponent} from "./admin/users/users-list/users-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MANAGER'] },
    children: [
      {path: 'dashboard', component: DashboardComponent},
      { path: 'users', component: UsersListComponent, data: { roles: ['ADMIN'] } },
      { path: 'rooms', component: RoomsComponent }, // ADMIN or MANAGER
      { path: 'events', component: EventsComponent }, // ADMIN or MANAGER
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
