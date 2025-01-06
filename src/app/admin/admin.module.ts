import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { EventsComponent } from './events/events.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import {RouterLink, RouterModule} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    RoomsComponent,
    EventsComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DashboardComponent,
  ],
  exports: [
    RoomsComponent,
    EventsComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    UsersModule,
  ]
})
export class AdminModule { }
