import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from './products.service';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsInsertComponent } from './products-insert/products-insert.component';

const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'insert', component: ProductsInsertComponent}
]

@NgModule({
  declarations: [
    ProductsInsertComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
