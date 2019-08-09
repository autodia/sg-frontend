import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';

import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [ProjectComponent, ProjectListComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ProjectRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule
  ]
})
export class ProjectModule { }
