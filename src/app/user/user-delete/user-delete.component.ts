import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {

  form: FormGroup;
  loading = false;
  deleted = false;
  username = '';

  constructor(private fb: FormBuilder, private service: UserService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      console.log(this.form.value);
      this.username = this.form.value.username;
      this.service.deleteUser(this.username).subscribe((response) => {
        console.log(response);
        if (response.status) {
          this.loading = false;
          this.deleted = true;
        }
      });
    } else {
      console.log('Username not valid');
    }
    this.form.reset();
  }
}
