import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProfileRoutingModule} from "./profile-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {CommonModule} from "@angular/common";
import {SecurityComponent} from "./security/security.component";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BrowserModule} from "@angular/platform-browser";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    ProfileComponent,
    SideMenuComponent,
    PersonalDataComponent,
    SecurityComponent
  ],
  imports: [
    ProfileRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    ToastrModule, // toastr
    BrowserModule, BrowserAnimationsModule, // angular material
    MatButtonModule, MatTooltipModule, MatIconModule, // buttons
    MatProgressSpinnerModule, // spinner
    MatFormFieldModule, MatInputModule,  // form field
  ],
  exports: [
    ProfileComponent,
    SideMenuComponent,
    PersonalDataComponent,
    SecurityComponent
  ]
})
export class ProfileModule {

}
