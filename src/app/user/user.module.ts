import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';
import { AppService } from '../app.service';

import { UsersListComponent } from './users-list/users-list.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { tap } from 'rxjs';

const userGuard = () => {
  const router = inject(Router);
  const service = inject(AppService);
  return service.isLoggedIn$.pipe(
    tap((isLoggedIn) => {
      if(!isLoggedIn) router.navigate(['/login']);
    })
  );
}

const routes: Routes = [
  { path: 'list', component: UsersListComponent, canActivate: [userGuard] },
  { path: 'insert', component: UserInsertComponent, canActivate: [userGuard] },
  { path: 'search', component: UserSearchComponent, canActivate: [userGuard] },
  { path: 'update', component: UserUpdateComponent, canActivate: [userGuard]},
  { path: 'delete', component: UserDeleteComponent, canActivate: [userGuard] },
  { path: '', component: WelcomeComponent}
];
 
@NgModule({
  declarations: [
    UsersListComponent,
    UserInsertComponent,
    UserSearchComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    WelcomeComponent
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
