import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule, ReactiveFormsModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {

}
