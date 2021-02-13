import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

const MATERIAL_MODULES = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatIconModule
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MATERIAL_MODULES
];

@NgModule({
  exports: [
    ...MODULES
  ],
  imports: [
    ...MODULES
  ]
})
export class SharedModule {
}
