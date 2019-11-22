import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../shared/project';
import { GetAllProjectService } from '../shared/get-all-projects.service';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppError } from 'src/app/common/errors/app-error';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {


  private projectsSub: Subscription
  projects: Project[] = []

  // filtered projects by project-name, initially none are filtered
  filteredProjects: Project[] = []

  constructor(
    private getAllProjectsService: GetAllProjectService,
    private router: Router) { }

  ngOnInit() {
    this.projectsSub = this.getAllProjectsService.watch()
      .valueChanges
      .pipe(
        // map(result => plainToClass(Project, result.data.projects))
        map(result => result.data.projects)
      ).subscribe(projects => {
        this.projects = plainToClass(Project, projects)
        this.filteredProjects = this.projects
      }, (err: AppError) => {
        console.log("Get projects error: ", err)
      }, () => {
        console.log("Get projects done...")
      })
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }

  filterProjects(filterValue) {
    this.filteredProjects = this.projects.filter(project => project.name.toLowerCase().includes(filterValue) || project.author.profile.display_name.toLowerCase().includes(filterValue));
  }

  edit(p: Project) {
    this.router.navigate(["/project"], { queryParams: { project: p._id } });
  }
}
