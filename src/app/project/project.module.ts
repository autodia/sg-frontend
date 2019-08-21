import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';
import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectService } from './shared/create-project.service';
import { AuthService } from '../common/services/auth.service';
import { GetProjectService } from './shared/get-project.service';
import { GetAllProjectService } from './shared/get-all-projects.service';
import { GetAllProjectNamesService } from './shared/get-all-project-names.service';
import { GetAllUsersService } from './shared/get-all-users.service';

@NgModule({
  declarations: [ProjectComponent, ProjectListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [
    CreateProjectService,
    AuthService,
    GetProjectService,
    GetAllProjectService,
    GetAllUsersService,
    GetAllProjectNamesService
  ]
})
export class ProjectModule { }
