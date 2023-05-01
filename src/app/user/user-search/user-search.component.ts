import { Component } from '@angular/core';
import { UserService } from '../user.service';
// import { User, UserAPIList, UserAPIOne } from 'shared';
import { User, UserAPIOne } from 'projects/shared/src/public-api';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  loading = false;
  user = {} as User;
  subscription: Subscription | undefined;

  onSubmit(): void {
    this.loading = true;
    if(this.form.valid) {
      console.log(this.form.value.username);
      const username = this.form.value.username;
      this.userService.searchUser(username).subscribe({
        next: (apiData: UserAPIOne) => {
          const {status, data} = apiData;
          this.user = data;
          console.log(status, data);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
          console.log('API call completed');
        }
      });
    }
    this.form.reset();
  }
}
