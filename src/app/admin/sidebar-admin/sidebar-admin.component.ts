import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss'
})
export class SidebarAdminComponent {
  @Input() isOpen = false;
  activeDropdown = '';

  menuItems:any = [
    { title: 'Dashboard', icon: 'home', path: '/admin/dashboard' },
    { title: 'User Management', icon: 'users', path: '/admin/users' },
    {
      title: 'Events',
      icon: 'calendar',
      submenu: [
        { title: 'All Events', path: '/admin/events' },
        { title: 'Calendar', path: '/admin/events/calendar' },
        { title: 'Create Event', path: '/admin/events/create' },
        { title: 'Categories', path: '/admin/events/categories' }
      ]
    }
  ];

  toggleDropdown(title: string) {
    this.activeDropdown = this.activeDropdown === title ? '' : title;
  }
}
