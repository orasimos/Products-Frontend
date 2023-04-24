import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'shared';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: UserService) {
    this.form = this.fb.group({
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
  }

  initPhone(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      number: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  get phoneControls() {
    return (this.form.get('phone') as FormArray).controls;
  }
  
  addPhone(): void {
    const phones = this.form.get('phone') as FormArray;
    phones.push(this.initPhone());
  }

  removePhone(index: number): void {
    const phones = this.form.get('phone') as FormArray;
    phones.removeAt(index);
  }

  onSubmit(): void {
    if(this.form.valid) {
      console.log(this.form.value);
      const user = this.form.value as User;
      this.service.updateUser(user).subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
