import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {TopNavigationBarComponent} from './components/top-navigation-bar/top-navigation-bar.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
  declarations: [
    TopNavigationBarComponent,
    FooterComponent
  ],
  exports: [
    TopNavigationBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    LayoutRoutingModule,
    FontAwesomeModule
  ]
})
export class LayoutModule {
}
