import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProfileRoutingModule} from "./profile-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ProfileComponent,
    SideMenuComponent,
    PersonalDataComponent
  ],
  imports: [
    ProfileRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule
  ],
  exports: [
    ProfileComponent,
    SideMenuComponent,
    PersonalDataComponent
  ]
})
export class ProfileModule {

}
