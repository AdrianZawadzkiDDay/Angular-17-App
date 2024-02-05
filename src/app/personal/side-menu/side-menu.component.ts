import {Component, EventEmitter, Output} from '@angular/core';
 import {IconDefinition, faHouse, faLock, faBusinessTime} from "@fortawesome/free-solid-svg-icons";
import EventTypes from "../event-types";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public dashboardIcon: IconDefinition = faHouse;
  public personalDataIcon: IconDefinition = faBusinessTime;
  public securityIcon: IconDefinition = faLock;

  @Output() dataEvent = new EventEmitter<string>();

  clickSecurity() {
    this.dataEvent.emit(EventTypes.SECURITY);
  }

  clickPersonalData() {
    this.dataEvent.emit(EventTypes.PERSONAL_DATA);
  }
}
