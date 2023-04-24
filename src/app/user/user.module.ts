import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';

import { UsersListComponent } from './users-list/users-list.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';


const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: 'insert', component: UserInsertComponent },
  { path: 'search', component: UserSearchComponent },
  { path: 'update', component: UserUpdateComponent},
  { path: 'delete', component: UserDeleteComponent }
];
 
@NgModule({
  declarations: [
    UsersListComponent,
    UserInsertComponent,
    UserSearchComponent,
    UserUpdateComponent,
    UserDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
