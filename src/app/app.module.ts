import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UsercartComponent } from './components/usercart/usercart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    component: UsercartComponent,
  },
  {
    path: '', 
    redirectTo: '/products', 
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    UsercartComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
