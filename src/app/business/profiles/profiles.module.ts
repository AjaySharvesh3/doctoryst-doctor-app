import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { HolderProfileComponent } from './components/holder-profile/holder-profile.component';
import {ProfilesRoutingModule} from "./profiles-routing.module";



@NgModule({
  declarations: [BusinessProfileComponent, HolderProfileComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule { }
