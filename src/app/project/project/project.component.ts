import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { User } from 'src/app/common/model/user';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../shared/project';
import { plainToClass } from 'class-transformer';
import { AppError } from 'src/app/common/errors/app-error';
import { CreateProjectService } from '../shared/create-project.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { GetProjectService } from '../shared/get-project.service';
import { GetAllProjectNamesService } from '../shared/get-all-project-names.service';
import { GetAllUsersService } from '../shared/get-all-users.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild('contactInput', { static: false }) contactInput: ElementRef;

  loaded = true

  contactCtrl = new FormControl();

  users = []

  project: Project

  filteredUsers: Observable<string[]>;

  private userSub: Subscription
  private paramSub: Subscription


  constructor(
    private authService: AuthService,
    private createProjectService: CreateProjectService,
    private getProjectsService: GetProjectService,
    private getAllUsersService: GetAllUsersService,
    private getAllProjectNamesService: GetAllProjectNamesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.filteredUsers = this.contactCtrl.valueChanges.pipe(
      startWith(null),
      map(userName => this.filterOnValueChange(userName).slice(0, 8))) // slice to avoid having too many reuslts

    this.paramSub = this.route.queryParamMap.subscribe(params => {
      if (params.has('project')) {
        const project_id = params.get('project')

        this.getProjectsService.fetch({
          id: project_id
        }).pipe(map(result => result.data.project)
        ).subscribe(project => {
          this.project = project
        }, (err: AppError) => {
          console.log("Get project error: ", err)
        })
      } else {
        this.project = new Project()
      }
    })

    this.getUsers()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  getUsers() {
    this.userSub = this.getAllUsersService.watch()
      .valueChanges
      .pipe(
        map(result => plainToClass(User, result.data.users))
      ).subscribe(users => {
        this.users = users
      }, (err: AppError) => {
        console.log("Error get users: ", err)
        this.loaded = true
      }, () => {
        console.log("Done getting users")
        this.loaded = true
      })
  }

  private resetInputs() {
    this.contactInput.nativeElement.value = '';
    this.contactCtrl.setValue(null);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.value
    let user = this.users.find(u => u.username == value)

    // user is guarenteed to be found as its selected from autocomplete
    this.project.contacts.push(user)
    this.resetInputs()
  }

  //
  // Compute a new autocomplete list each time control value changes
  //
  private filterOnValueChange(userName: string | null): string[] {
    let result: string[] = [];
    //
    // Remove the users we have already selected from all users to
    // get a starting point for the autocomplete list.
    //
    let usersNotSelected = this.users.filter(user => this.project.contacts.indexOf(user) < 0);
    if (userName) {
      result = this.filterUser(usersNotSelected, userName);
    } else {
      result = usersNotSelected.map(user => user.username);
    }
    return result;
  }

  private filterUser(users: User[], userName: string): string[] {
    let filteredUsers: User[] = [];
    const filterValue = userName.toLowerCase();
    let matches = users.filter(user => user.username.toLowerCase().includes(filterValue));
    if (matches.length) {
      //
      // either the user name matched some autocomplete options 
      // or the name didn't match but we're allowing 
      // non-autocomplete user names to be entered
      //
      filteredUsers = matches;
    } else {
      //
      // the user name didn't match the autocomplete list 
      // and we're only allowing users to be selected from the list
      // so we show the whole list
      // 
      filteredUsers = users;
    }
    //
    // Convert filtered list of user objects to list of engineer 
    // name strings and return it
    //
    return filteredUsers.map(user => user.username);
  }

  removeContact(user: User): void {
    const index = this.project.contacts.indexOf(user);

    if (index >= 0) {
      this.project.contacts.splice(index, 1);
      this.resetInputs()
    }
  }

  async submit() {
    let projects = await this.getAllProjectNamesService
      .fetch()
      .pipe(
        map(result => result.data.projects)
      ).toPromise().then(projects => {
        return projects
      }, (err: AppError) => {
        console.log("Get project names error: ", err)
      })

    let isUnique = !(projects as Project[]).some(p => p.name === this.project.name)
    let hasContacts = this.project.contacts.length > 0

    if (isUnique && hasContacts) {
      // set author
      this.project.author = this.authService.User

      console.log("Submit activate: ", this.project)

      this.createProjectService.mutate({
        projectInput: {
          created: this.project.created.toString(),
          author: this.project.author._id,
          name: this.project.name,
          description: this.project.description,
          contacts: this.project.contacts.map(c => c._id)
        }
      }).subscribe(({ data, loading }) => {
        console.log(data)
      }, (err: AppError) => {
        console.log("Create project error: ", err)
      }, () => {
        console.log("Done creating project")
      });
    }
    // post / update project
  }
}
