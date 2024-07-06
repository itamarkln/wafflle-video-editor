import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timeline-controls',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './timeline-controls.component.html',
  styleUrl: './timeline-controls.component.scss'
})
export class TimelineControlsComponent {
  @Input() currentTime!: number;
  @Input() isPlaying!: boolean;

  constructor() { }
}
