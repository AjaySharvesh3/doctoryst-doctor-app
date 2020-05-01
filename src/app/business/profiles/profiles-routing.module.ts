import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessProfileComponent} from "./components/business-profile/business-profile.component";
import {HolderProfileComponent} from "./components/holder-profile/holder-profile.component";

const routes: Routes = [
  {
    path: '', component: BusinessProfileComponent
  },
  {
    path: 'business', component: BusinessProfileComponent
  },
  {
    path: 'holder',
    component: HolderProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {
}
