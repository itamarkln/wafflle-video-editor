import { Component, Signal, computed } from '@angular/core';
import { SIDENAV_CLOSED_WIDTH, SIDENAV_OPENED_WIDTH } from './core/constants/constants.data';
import { AppStateService } from './shared/services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Waffle-video-editor';

  sidebarWidth: Signal<string>;

  constructor(private appState: AppStateService) {
    this.sidebarWidth = computed(() => this.appState.isSidebarOpen ? SIDENAV_OPENED_WIDTH : SIDENAV_CLOSED_WIDTH);
  }
}
