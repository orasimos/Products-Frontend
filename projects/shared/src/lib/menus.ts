import { MenuItem } from "./interfaces";

export const usersMenu: MenuItem[] = [
    { text: 'List all Users', link: 'user/list' },
    { text: 'Search a User', link: 'user/search' },
    { text: 'Insert a User', link: 'user/insert' },
    { text: 'Update a User', link: 'user/update' },
    { text: 'Delete a User', link: 'user/delete' }
  ];

  export const productsMenu: MenuItem[] = [
    { text: 'List all Products', link: 'products/list' },
    { text: 'Search a Product', link: 'not implemented yet'},
    { text: 'Insert a Product', link: 'products/insert' },
    { text: 'Delete a Product', link: 'not yet implemented' },
    { text: 'Update a Product', link: 'not yet implemented' }
  ];