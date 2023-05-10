import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User, UserAPIOne } from 'projects/shared/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  
  update_form: FormGroup;
  search_form: FormGroup;
  loading = false;
  user = {} as User;
  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private service: UserService) {
    this.update_form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        area: ['', Validators.required],
        road: ['', Validators.required]
      }),
      phone: this.fb.array([this.initPhone()])
    })

    this.search_form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  initPhone(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  get phoneControls() {
    return (this.update_form.get('phone') as FormArray).controls;
  }
  
  addPhone(): void {
    const phones = this.update_form.get('phone') as FormArray;
    phones.push(this.initPhone());
  }

  removePhone(index: number): void {
    const phones = this.update_form.get('phone') as FormArray;
    phones.removeAt(index);
  }

  onSubmit(): void {
    if(this.update_form.valid) {
      console.log(this.update_form.value);
      const user = this.update_form.value as User;
      this.service.updateUser(user).subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log('Form is not valid');
    }
    this.update_form.reset();
    this.search_form.reset();
  }

  onSearch(): void {
    this.loading = true;
    if(this.search_form.valid) {
      console.log(this.search_form.value.username);
      const username = this.search_form.value.username;
      this.service.searchUser(username).subscribe({
        next: (apiData: UserAPIOne) => {
          const {status, data} = apiData;
          this.user = data;
          console.log(status, data);
          this.update_form.patchValue({
            username: this.user.username,
            password: this.user.password,
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email,
            address: this.user.address,
            phone: this.user.phone
          })
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

    // this.search_form.reset();
  }
}
