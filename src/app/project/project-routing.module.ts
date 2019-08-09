import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path: 'project-list',
    component: ProjectListComponent
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
