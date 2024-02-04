import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
// import { SideMenuComponent } from '../side-menu/side-menu.component';
// import {SecurityComponent} from "../security/security.component";
// import {NewTenderComponent} from "../new-tender/new-tender.component";
import {CommonModule} from "@angular/common";
// import EventTypes from "../event-types";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currentUser: User = new User;
  isSecurityVisible: boolean = false;
  isNewTenderVisible: boolean = false;

  constructor() {
    const storageUserAsStr = localStorage.getItem('currentUser');
    if(storageUserAsStr) {
      let storageUser = JSON.parse(storageUserAsStr);
      this.currentUser = storageUser;
    }
  }

  handleData(data: string) {
    // this.isSecurityVisible = data === EventTypes.SECURITY;
    // this.isNewTenderVisible = data === EventTypes.NEW_TENDER
  }


}
