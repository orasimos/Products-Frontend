import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
// import { User, UserAPIList } from 'shared';
import { User, UserAPIList } from 'projects/shared/src/public-api';
import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService, private appService: AppService) {}

  loading = false;
  userList: User[] = [];
  subscription: Subscription | undefined;

  usernameSortType: 'asc' | 'desc' = 'asc';
  firstnameSortType: 'asc' | 'desc' = 'asc';
  lastnameSortType: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    console.log('Starting "findAll" API call');
    // this.loading = true;
    this.appService.setIsLoading(true);
    this.userService.findAll().subscribe({
      next: (apiData: UserAPIList) => {
        const {status, data} = apiData;
        this.userList = data;
        console.log(status, data);
      },
      error: (error) => {
        // this.loading = false;
        this.appService.setIsLoading(false);
        console.log(error);
      },
      complete: () => {
        // this.loading = false;
        this.appService.setIsLoading(false);
        console.log('API call completed');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();   //  '?' means if not undefined
  }

  toggleSort(key: string) {
    switch (key) {
      case 'username':
        this.usernameSortType = this.usernameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.usernameSortType]);
        break;
      case 'name':
        this.firstnameSortType = this.firstnameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.firstnameSortType]);
        break;
      case 'surname':
        this.lastnameSortType = this.lastnameSortType === 'asc' ? 'desc' : 'asc';
        this.userList = orderBy(this.userList, [key], [this.lastnameSortType]);
        break;
      default:
        break;
    }
  }
}
