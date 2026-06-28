import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { FairsDashboardComponent } from './components/fairs-dashboard/fairs-dashboard.component';
import { AppRountingModule } from './app-rounting.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/products-dashboard/product/product.component';
import { ProductFormComponent } from './components/products-dashboard/product-form/product-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './components/get-confirm/get-confirm.component';
import { UserDetailsComponent } from './components/users-dashboard/user-details/user-details.component';
import { UserFormComponent } from './components/users-dashboard/user-form/user-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeDashboardComponent,
    UsersDashboardComponent,
    ProductsDashboardComponent,
    FairsDashboardComponent,
    NavbarComponent,
    ProductComponent,
    ProductFormComponent,
    GetConfirmComponent,
    UserDetailsComponent,
    UserFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
