import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {TopNavigationBarComponent} from './components/top-navigation-bar/top-navigation-bar.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { StoreSideMenuComponent } from './components/store-side-menu/store-side-menu.component';

@NgModule({
  declarations: [
    TopNavigationBarComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    StoreSideMenuComponent,
  ],
  exports: [
    TopNavigationBarComponent,
    FooterComponent,
    HomeComponent,
    StoreSideMenuComponent
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    LayoutRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule {
}
