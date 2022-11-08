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

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    TabComponent,
    TabTwoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    PortalModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
