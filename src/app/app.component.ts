import { Component } from '@angular/core';
import { MenuItem } from './app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Products Frontend';

  usersMenu: MenuItem[] = [
    { text: 'List all Users', link: 'user/list' },
    { text: 'Search a User', link: 'user/search' },
    { text: 'Insert a User', link: 'user/insert' },
    { text: 'Update a User', link: 'user/update' },
    { text: 'Delete a User', link: 'user/delete' }
  ];
  productsMenu: MenuItem[] = [
    { text: 'List all Products', link: 'products/list' },
    { text: 'Search a Product', link: 'not implemented yet'},
    { text: 'Insert a Product', link: 'products/insert' },
    { text: 'Delete a Product', link: 'not yet implemented' },
    { text: 'Update a Product', link: 'not yet implemented' }
  ];
}
