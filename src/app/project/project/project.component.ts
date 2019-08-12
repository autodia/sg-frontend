import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Project } from 'src/app/common/model/project';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { User } from 'src/app/common/model/user';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild('contactInput', { static: false }) contactInput: ElementRef;

  allowContactFreeText = false

  contactCtrl = new FormControl();

  users: User[] = [
    { id: 1, exp: 1, name: "Bjarne" }, { id: 2, exp: 2, name: "Karl" }, { id: 3, exp: 3, name: "Susan" }, { id: 4, exp: 4, name: "Lord Valde" },
    { id: 5, exp: 1, name: "Emil" }, { id: 6, exp: 2, name: "Karl-Emil" }, { id: 7, exp: 3, name: "Susanne" }, { id: 8, exp: 4, name: "Casper" },
    { id: 9, exp: 1, name: "Xavier" }, { id: 10, exp: 2, name: "Åge" }, { id: 11, exp: 3, name: "Kaj" }, { id: 12, exp: 4, name: "Áñnâ" }
  ]

  projects = [
    new Project({
      id: 1, name: "Project 1 2 3 4", author: this.users[0],
      description: "This is a a description of a project that is very long or maybe short I don't know. bla bla bla bla bla bla bla bla bla bla bla.This is a a description of a project that is very long or maybe short I don't know. bla bla bla bla bla bla bla bla bla bla bla.This is a a description of a project that is very long or maybe short I don't know. bla bla bla bla bla bla bla bla bla bla bla.",
      contacts: [this.users[0], this.users[1], this.users[2], this.users[3]]
    }),
    new Project({ id: 2, name: "P123", author: this.users[3], description: "Desc1", contacts: [this.users[2]] })
  ]

  project: Project

  filteredUsers: Observable<string[]>;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.filteredUsers = this.contactCtrl.valueChanges.pipe(
      startWith(null),
      map(userName => this.filterOnValueChange(userName).slice(0, 8))) // slice to avoid having too many reuslts

    this.route.queryParamMap.subscribe(params => {
      if (params.has('project')) {
        this.project = this.projects.find(p => p.id === +params.get('project'))
      } else {
        this.project = new Project()
      }
    })

    // GET ALL USERS
  }

  addContact(event: MatChipInputEvent): void {
    if (!this.allowContactFreeText) {
      // only allowed to select from the filtered autocomplete list
      console.log('adding contacts with free text is not allowed');
      return;
    }

    const value = event.value;

    // Add our user
    if ((value || '').trim()) {
      let user = this.users.find(u => u.name === value)
      this.project.contacts.push(user)
    }

    this.resetInputs()
  }

  private resetInputs() {
    this.contactInput.nativeElement.value = '';
    this.contactCtrl.setValue(null);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    let value = event.option.value
    let user = this.users.find(u => u.name == value)

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
      result = usersNotSelected.map(user => user.name);
    }
    return result;
  }

  private filterUser(users: User[], userName: string): string[] {
    let filteredUsers: User[] = [];
    const filterValue = userName.toLowerCase();
    let matches = users.filter(user => user.name.toLowerCase().includes(filterValue));
    if (matches.length || this.allowContactFreeText) {
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
    return filteredUsers.map(user => user.name);
  }

  removeContact(user: User): void {
    const index = this.project.contacts.indexOf(user);

    if (index >= 0) {
      this.project.contacts.splice(index, 1);
      this.resetInputs()
    }
  }

  submit(formData: NgForm) {
    // check that project name is unique

    // check contacts are added
    if (this.project.contacts.length) {
      console.log("Submit activate: ", this.project)
    }

    // post / update project
  }
}
