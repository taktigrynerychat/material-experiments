import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";
import {TabComponent} from "./tab/tab.component";
import {TabTwoComponent} from "./tab-two/tab-two.component";

@Component({
  selector: 'dummy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'dummy';
  isOpen = false;
  selectedTabIndex!: number;
  activeCustomTab!: typeof this.tabs[0] | undefined;

  tabs = [
    {
      label: 'tab-1',
      portal: new ComponentPortal(TabComponent)
    },
    {
      label: 'tab-2',
      portal: new ComponentPortal(TabTwoComponent)
    },
  ]


  public selectTab(tab: typeof this.tabs[0]): void {
    this.activeCustomTab = tab;
    this.selectedTabIndex = 2;
    this.isOpen = false;
  }
}
