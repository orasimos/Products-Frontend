import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Product } from '../products.interfaces';

@Component({
  selector: 'app-products-insert',
  templateUrl: './products-insert.component.html',
  styleUrls: ['./products-insert.component.css']
})
export class ProductsInsertComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductsService) {
    this.form = this.fb.group({
      product: ['', [Validators.required, Validators.minLength(3)]],
      cost: ['', [Validators.required, Validators.minLength(1)]],
      quantity: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
    })
  }

  onSubmit(): void {
    if(this.form.valid) {
      console.log(this.form.value);
      const product = this.form.value as Product;
      this.service.insertProduct(product).subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log('Form is not valid');
    }
    this.form.reset();
  }
}
