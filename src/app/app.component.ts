import { Component, Signal, computed } from '@angular/core';
import { SIDENAV_CLOSED_WIDTH, SIDENAV_OPENED_WIDTH } from './core/constants/constants.data';
import { AppStateService } from './core/services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Waffle-video-editor';
  sidebarWidth: Signal<string>;
  contentWidth: Signal<string>;

  constructor(private appState: AppStateService) {
    this.sidebarWidth = computed(() => this.appState.isSidebarOpen ? SIDENAV_OPENED_WIDTH : SIDENAV_CLOSED_WIDTH);
    this.contentWidth = computed(() => `calc(100vw - ${this.sidebarWidth()})`);
  }
}
