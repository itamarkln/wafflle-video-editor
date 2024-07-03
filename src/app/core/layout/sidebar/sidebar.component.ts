import { Component, OutputEmitterRef, Signal, WritableSignal, computed, effect, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AppStateService } from '@app/shared/services/app-state.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed: WritableSignal<boolean>;
  menuItems: WritableSignal<MenuItem[]>;

  logoPicSize: Signal<string>;

  isCollapsedChanged: OutputEmitterRef<boolean> = output<boolean>();

  constructor(private appState: AppStateService) {
    this.isCollapsed = signal(true);
    this.menuItems = signal<MenuItem[]>([
      { icon: 'dashboard', label: 'Video Editor', route: 'video-editor' }
    ]);

    this.logoPicSize = computed(() => this.appState.isSidebarOpen ? '100' : '50');
  }

  toggle() {
    this.appState.isSidebarOpen = !this.appState.isSidebarOpen;
  }
}
