import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import EventTypes from "../event-types";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currentUser: User = new User;
  isSecurityVisible: boolean = false;
  isPersonalDataVisible: boolean = false;

  constructor() {
    const storageUserAsStr = localStorage.getItem('currentUser');
    if(storageUserAsStr) {
      let storageUser = JSON.parse(storageUserAsStr);
      this.currentUser = storageUser;
    }
  }

  handleData(data: string) {
    this.isSecurityVisible = data === EventTypes.SECURITY;
    this.isPersonalDataVisible = data === EventTypes.PERSONAL_DATA
  }

}
