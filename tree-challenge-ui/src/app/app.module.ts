import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeComponent } from './components/tree/tree.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './components/home/home.component';
import { TreeIconComponent } from './tree-icon/tree-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEditComponent } from './components/dialogs/add-edit/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectInstructionsComponent } from './components/dialogs/collect-instructions/collect-instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    HomeComponent,
    TreeIconComponent,
    AddEditComponent,
    CollectInstructionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
