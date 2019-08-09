import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/common/model/project';
import { User } from 'src/app/common/model/user';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  users = [
    new User({ id: 1, exp: 1, name: "Karla Konradsen" }),
    new User({ id: 2, exp: 1, name: "Kong Kristian den 4" }),
    new User({ id: 3, exp: 1, name: "Emil fra Lønneberg" }),
    new User({ id: 4, exp: 1, name: "Kaj Printz Madsen" })
  ]

  projects: Project[] = []

  // filtered projects by project-name, initially none are filtered
  filteredProjects: Project[] = []

  constructor() { }

  ngOnInit() {
    this.projects = [
      new Project({
        id: 1, name: "Project 1 2 3 4", author: this.users[0],
        description: "This is a a description of a project that is very long or maybe short I don't know",
        contacts: [this.users[0], this.users[1], this.users[2], this.users[3]]
      }),
      new Project({ id: 2, name: "P123", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 3, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 4, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 5, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 6, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 7, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 9, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 10, name: "P12", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 11, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 12, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 13, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] }),
      new Project({ id: 14, name: "P1", author: this.users[3], description: "Desc1", contacts: [this.users[2]] })
    ]

    this.filteredProjects = this.projects
  }

  filterProjects(filterValue) {
    this.filteredProjects = this.projects.filter(project => project.name.toLowerCase().includes(filterValue) || project.author.name.toLowerCase().includes(filterValue));
  }
}
