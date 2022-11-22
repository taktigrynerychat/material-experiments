import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AutofocusDirective } from './autofocus.directive';
import {MatTabsModule} from "@angular/material/tabs";
import {PortalModule} from "@angular/cdk/portal";
import { TabComponent } from './tab/tab.component';
import { TabTwoComponent } from './tab-two/tab-two.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { CustomErrorDirective } from './custom-error.directive';
import { CustomErrorCompComponent } from './custom-error-comp/custom-error-comp.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    TabComponent,
    TabTwoComponent,
    CustomErrorDirective,
    CustomErrorCompComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    PortalModule,
    OverlayModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
